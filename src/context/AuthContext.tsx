import { createContext, useContext, useState, type ReactNode } from "react"
import type { User, AuthResult, RegisterFormValues } from "../types"
import { mockUser } from "../data/mockUser"

interface AuthContextType {
  loggedInUser: User
  registeredUsers: User[]
  login: (cedula: string, password: string) => AuthResult
  register: (data: RegisterFormValues) => AuthResult
  logout: () => void
  // Actualiza al usuario logueado y su entrada en registeredUsers a la vez.
  updateLoggedInUser: (updater: (prev: User) => User) => void
  // Actualiza cualquier cuenta registrada por id (propia o de un tercero),
  // usado por ejemplo para agregar una reseña al perfil de otra persona.
  updateUserById: (id: string, updater: (prev: User) => User) => void
  // Busca cualquier cuenta registrada (incluida la propia) por id.
  findUserById: (id: string) => User | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Usuario logueado: arranca con los datos de ejemplo de mockUser.
  const [loggedInUser, setLoggedInUser] = useState<User>(mockUser)

  // Todas las "cuentas" válidas para iniciar sesión, en memoria.
  // mockUser funciona como cuenta de prueba: cédula "123456789", contraseña "123456".
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([mockUser])

  const updateLoggedInUser = (updater: (prev: User) => User) => {
    setLoggedInUser((prev) => {
      const updated = updater(prev)
      setRegisteredUsers((list) => list.map((u) => (u.id === updated.id ? updated : u)))
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

  const login = (cedula: string, password: string): AuthResult => {
    const account = registeredUsers.find((u) => u.identificationNumber === cedula)

    if (!account) {
      return { ok: false, error: "No existe ninguna cuenta registrada con esa cédula." }
    }

    if (account.password !== password) {
      return { ok: false, error: "La contraseña es incorrecta." }
    }

    setLoggedInUser(account)
    return { ok: true }
  }

  const register = (data: RegisterFormValues): AuthResult => {
    const correoEnUso = registeredUsers.some(
      (u) => u.email.toLowerCase() === data.correo.toLowerCase()
    )
    if (correoEnUso) {
      return { ok: false, error: "Ya existe una cuenta con ese correo electrónico." }
    }

    const cedulaEnUso = registeredUsers.some((u) => u.identificationNumber === data.cedula)
    if (cedulaEnUso) {
      return { ok: false, error: "Ya existe una cuenta registrada con esa cédula." }
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.nombre,
      email: data.correo,
      identificationNumber: data.cedula,
      address: "",
      phone: "",
      password: data.password,
      profilePicture: `https://picsum.photos/seed/${encodeURIComponent(data.nombre)}/600/600`,
      created_at: new Date().toLocaleDateString("es-CR", { day: "numeric", month: "long", year: "numeric" }),
      updated_at: new Date().toLocaleDateString("es-CR", { day: "numeric", month: "long", year: "numeric" }),
      // Sin workInfo: el usuario nuevo todavía no ha creado su perfil profesional.
    }

    setRegisteredUsers((prev) => [...prev, newUser])
    setLoggedInUser(newUser)
    return { ok: true }
  }

  const logout = () => {
    // En memoria no existe un estado "sin sesión": App.tsx simplemente deja
    // de mostrar las vistas protegidas al cambiar a la pantalla de login.
    // Este método se mantiene para conservar el mismo contrato que un
    // AuthContext real (login/register/logout), y por si más adelante se
    // quiere limpiar algo puntual al cerrar sesión.
  }

  const value: AuthContextType = {
    loggedInUser,
    registeredUsers,
    login,
    register,
    logout,
    updateLoggedInUser,
    updateUserById,
    findUserById,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>.")
  }
  return context
}