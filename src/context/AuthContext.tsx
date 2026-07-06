import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { TOKEN_KEY, USER_KEY } from '../services/authStorage'

import type { User, AuthResult, RegisterFormValues } from '../types'
import { authService } from '../services/authService'

interface AuthContextType {
  loggedInUser:      User
  isAuthenticated:   boolean
  registeredUsers:   User[]
  login:             (cedula: string, password: string) => Promise<AuthResult>
  register:          (data: RegisterFormValues) => Promise<AuthResult>
  logout:            () => void
  updateLoggedInUser:(updater: (prev: User) => User) => void
  updateUserById:    (id: string, updater: (prev: User) => User) => void
  findUserById:      (id: string) => User | undefined
}

function saveSession(token: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

function loadSavedUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

const ANONYMOUS_USER: User = {
  id:                   '',
  name:                 '',
  email:                '',
  identificationNumber: '',
  address:              '',
  phone:                '',
  password:             '',
  profilePicture:       '',
  created_at:           '',
  updated_at:           '',
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [loggedInUser, setLoggedInUser] = useState<User>(
    () => loadSavedUser() ?? ANONYMOUS_USER
  )
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem(TOKEN_KEY)
  )

  const [registeredUsers, setRegisteredUsers] = useState<User[]>(
    () => {
      const saved = loadSavedUser()
      return saved ? [saved] : []
    }
  )

  useEffect(() => {
    if (isAuthenticated && loggedInUser.id) {
      const token = localStorage.getItem(TOKEN_KEY) ?? ''
      saveSession(token, loggedInUser)
    }
  }, [loggedInUser, isAuthenticated])

  const login = async (cedula: string, password: string): Promise<AuthResult> => {
    const outcome = await authService.login(cedula, password)

    if (!outcome.ok) return { ok: false, error: outcome.error }

    saveSession(outcome.token, outcome.user)
    setLoggedInUser(outcome.user)
    setIsAuthenticated(true)
    setRegisteredUsers((prev) => {
      const exists = prev.some((u) => u.id === outcome.user.id)
      return exists ? prev.map((u) => (u.id === outcome.user.id ? outcome.user : u)) : [...prev, outcome.user]
    })

    return { ok: true }
  }

  const register = async (data: RegisterFormValues): Promise<AuthResult> => {
    const outcome = await authService.register(
      data.nombre,
      data.correo,
      data.cedula,
      data.password
    )

    if (!outcome.ok) return { ok: false, error: outcome.error }

    saveSession(outcome.token, outcome.user)
    setLoggedInUser(outcome.user)
    setIsAuthenticated(true)
    setRegisteredUsers((prev) => [...prev, outcome.user])

    return { ok: true }
  }

  const logout = () => {
    clearSession()
    setLoggedInUser(ANONYMOUS_USER)
    setIsAuthenticated(false)
    setRegisteredUsers([])
  }

  const updateLoggedInUser = (updater: (prev: User) => User) => {
    setLoggedInUser((prev) => {
      const updated = updater(prev)
      setRegisteredUsers((list) =>
        list.map((u) => (u.id === updated.id ? updated : u))
      )
      return updated
    })
  }

  const updateUserById = (id: string, updater: (prev: User) => User) => {
    if (id === loggedInUser.id) {
      updateLoggedInUser(updater)
      return
    }
    setRegisteredUsers((list) => list.map((u) => (u.id === id ? updater(u) : u)))
  }

  const findUserById = (id: string): User | undefined => {
    if (id === loggedInUser.id) return loggedInUser
    return registeredUsers.find((u) => u.id === id)
  }

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        isAuthenticated,
        registeredUsers,
        login,
        register,
        logout,
        updateLoggedInUser,
        updateUserById,
        findUserById,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>.')
  }
  return context
}