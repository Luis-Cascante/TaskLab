import { useState, useEffect, useCallback } from "react"
import 'swiper/swiper-bundle.css'

import Login from "./Components/Login"
import Register from "./Components/Register"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import Chat from "./Components/Chat"
import ListTask from "./Components/ListTask"
import MainHub from "./Components/MainHub"
import PerfilUser from "./Components/PerfilUser"
import EditProfile from "./Components/EditProfile"
import AddPortfolioItem from "./Components/AddPortfolioItem"
import PublicarSolicitud from "./Components/PublicarSolicitud"
import SelectedTask from "./Components/SelectedTask"
import Trabajadores from "./Components/Trabajadores"

import workers from "./Components/PruebasWorkerData"
import type { worker } from "./Components/PruebasWorkerData"

import { workerToUser } from "./utils/workerToUser"
import { useAuth } from "./context/AuthContext"
import { taskService } from "./services/taskService"
import { userService } from "./services/userService"
import type {
  User,
  MainView,
  NewPortfolioItemData,
  BackendTask,
  BackendApplicationWithApplicant,
  ApplicationStatus,
} from "./types"

function toUiStatus(backendStatus: string): ApplicationStatus {
  switch (backendStatus) {
    case "accepted": return "contratado"
    case "rejected": return "rechazado"
    default:         return "pendiente"
  }
}

interface UiApplication {
  taskId:         string
  applicantId:    string
  applicantName:  string
  applicantImage: string
  status:         ApplicationStatus
  applicationId:  string
}

function App() {
  const auth = useAuth()

  const [tasksList,       setTasksList]       = useState<BackendTask[]>([])
  const [isLoadingTasks,  setIsLoadingTasks]  = useState(true)
  const [taskError,       setTaskError]       = useState<string | null>(null)

  const [workersList]                         = useState(workers)
  const [selectedTask,    setSelectedTask]    = useState<BackendTask | null>(null)
  const [taskBeingEdited, setTaskBeingEdited] = useState<BackendTask | null>(null)

  const [myApplications,     setMyApplications]     = useState<UiApplication[]>([])
  const [applicationsByTask, setApplicationsByTask] = useState<Record<string, UiApplication[]>>({})

  const [activeView,        setActiveView]        = useState<MainView>("register")
  const [usersList,         setUsersList]         = useState<User[]>(() => workersList.map(workerToUser))
  const [selectedProfileId, setSelectedProfileId] = useState<string>(auth.loggedInUser.id)

  const [profileDetail,    setProfileDetail]    = useState<User | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [profileError,     setProfileError]     = useState<string | null>(null)

  const isMockWorkerId = (id: string) => id.startsWith("worker-")

  const findAnyUserById = (id: string): User | undefined =>
    auth.findUserById(id) ?? usersList.find((u) => u.id === id)

  const selectedUser: User =
  selectedProfileId === auth.loggedInUser.id
    ? auth.loggedInUser
    : profileDetail ??
      usersList.find((u) => u.id === selectedProfileId) ??
      auth.loggedInUser

  const isOwnerProfile      = selectedUser.id === auth.loggedInUser.id
  const myPublishedTasks    = tasksList.filter((t) => t.employer_id === auth.loggedInUser.id)
  const myAppliedTaskIds    = myApplications.map((a) => a.taskId)

  const myAppliedTasks = myApplications
    .map((a) => ({
      task:   tasksList.find((t) => t.id === a.taskId),
      status: a.status,
    }))
    .filter((entry): entry is { task: BackendTask; status: ApplicationStatus } => !!entry.task)

  const allApplicationsForMyTasks: UiApplication[] = Object.values(applicationsByTask).flat()

  const loadTasks = useCallback(async () => {
    setIsLoadingTasks(true)
    setTaskError(null)
    const result = await taskService.getAll()
    if (result.ok) {
      setTasksList(result.tasks)
    } else {
      setTaskError(result.error)
    }
    setIsLoadingTasks(false)
  }, [])

  const loadMyApplications = useCallback(async () => {
    const result = await taskService.getMyApplications()
    if (result.ok) {
      const mapped: UiApplication[] = result.applications.map((a) => ({
        taskId:         a.task_id,
        applicantId:    auth.loggedInUser.id,
        applicantName:  auth.loggedInUser.name,
        applicantImage: auth.loggedInUser.profilePicture,
        status:         toUiStatus(a.status),
        applicationId:  a.id,
      }))
      setMyApplications(mapped)
    }
  }, [auth.loggedInUser.id, auth.loggedInUser.name, auth.loggedInUser.profilePicture])

  const refetchProfile = useCallback(async (id: string) => {
  const fallback = findAnyUserById(id) ?? auth.loggedInUser
  const result = await userService.getUserById(id, fallback)
  if (result.ok) setProfileDetail(result.data)
  }, [usersList, auth])

  const loadApplicationsForMyTasks = useCallback(async (tasks: BackendTask[]) => {
    const entries = await Promise.all(
      tasks.map(async (task) => {
        const result = await taskService.getTaskApplications(task.id)
        if (!result.ok) return [task.id, []] as const
        const mapped: UiApplication[] = result.applications.map((a: BackendApplicationWithApplicant) => ({
          taskId:         task.id,
          applicantId:    a.applicant.id,
          applicantName:  a.applicant.name,
          applicantImage: a.applicant.profile?.avatar ?? "",
          status:         toUiStatus(a.status),
          applicationId:  a.id,
        }))
        return [task.id, mapped] as const
      })
    )
    setApplicationsByTask(Object.fromEntries(entries))
  }, [])

  useEffect(() => {
    if (auth.isAuthenticated) {
      loadTasks()
      loadMyApplications()
    }
  }, [auth.isAuthenticated, loadTasks, loadMyApplications])

  useEffect(() => {
    if (myPublishedTasks.length > 0) {
      loadApplicationsForMyTasks(myPublishedTasks)
    }
  }, [tasksList, auth.loggedInUser.id])

useEffect(() => {
  // Tu propio perfil no necesita fetch — ya vive en auth.loggedInUser
  if (selectedProfileId === auth.loggedInUser.id) {
    setProfileDetail(null)
    setProfileError(null)
    return
  }

  // Perfiles mock de prueba (Trabajadores.tsx) siguen resolviéndose de usersList
  if (isMockWorkerId(selectedProfileId)) {
    setProfileDetail(null)
    setProfileError(null)
    return
  }

  let cancelled = false
  setIsLoadingProfile(true)
  setProfileError(null)

  const fallback = findAnyUserById(selectedProfileId) ?? auth.loggedInUser
  userService.getUserById(selectedProfileId, fallback).then((result) => {
    if (cancelled) return
    if (result.ok) {
      setProfileDetail(result.data)
    } else {
      setProfileError(result.error)
      setProfileDetail(null)
    }
    setIsLoadingProfile(false)
  })

  return () => { cancelled = true }
}, [selectedProfileId])

  const handleLogin = async (cedula: string, password: string) => {
    const result = await auth.login(cedula, password)
    if (result.ok) setActiveView("home")
    return result
  }

  const handleRegister = async (data: Parameters<typeof auth.register>[0]) => {
    const result = await auth.register(data)
    if (result.ok) setActiveView("home")
    return result
  }

  const handleLogout = () => {
    auth.logout()
    setTasksList([])
    setMyApplications([])
    setApplicationsByTask({})
    setActiveView("login")
  }

  const handleOpenTask = (task: BackendTask) => {
    setSelectedTask(task)
    setActiveView("detail")
  }

  const handlePublishTask = async (newTaskFormData: FormData) => {
    const result = await taskService.create(newTaskFormData)
    if (result.ok) {
      setTasksList((prev) => [result.task, ...prev])
      setActiveView("jobs")
    }
    return result
  }

  const goToPublish = (taskToEdit: BackendTask | null = null) => {
    setTaskBeingEdited(taskToEdit)
    setActiveView("publish")
  }

  const handleUpdateTask = async (taskId: string, formData: FormData) => {
    const result = await taskService.update(taskId, formData)
    if (result.ok) {
      setTasksList((prev) => prev.map((t) => (t.id === taskId ? result.task : t)))
      setTaskBeingEdited(null)
      setActiveView("profile")
    }
    return result
  }

  const handleDeleteTask = async (taskId: string) => {
    const result = await taskService.delete(taskId)
    if (result.ok) {
      setTasksList((prev) => prev.filter((t) => t.id !== taskId))
      setApplicationsByTask((prev) => {
        const { [taskId]: _removed, ...rest } = prev
        return rest
      })
      setTaskBeingEdited(null)
      setActiveView("profile")
    }
    return result
  }

  const handleApply = async (taskId: string) => {
    const result = await taskService.apply(taskId)
    if (result.ok) {
      setMyApplications((prev) => [
        ...prev,
        {
          taskId,
          applicantId:    auth.loggedInUser.id,
          applicantName:  auth.loggedInUser.name,
          applicantImage: auth.loggedInUser.profilePicture,
          status:         "pendiente",
          applicationId:  result.application.id,
        },
      ])
      setSelectedProfileId(auth.loggedInUser.id)
      setActiveView("profile")
    }
  }

  const handleHireApplicant = async (taskId: string, applicationId: string) => {
    const result = await taskService.updateApplicationStatus(taskId, applicationId, "accepted")
    if (result.ok) {
      setApplicationsByTask((prev) => ({
        ...prev,
        [taskId]: (prev[taskId] ?? []).map((a) => ({
          ...a,
          status: a.applicationId === applicationId ? "contratado" : "rechazado",
        })),
      }))
    }
  }

  const handleRejectApplicant = async (taskId: string, applicationId: string) => {
    const result = await taskService.updateApplicationStatus(taskId, applicationId, "rejected")
    if (result.ok) {
      setApplicationsByTask((prev) => ({
        ...prev,
        [taskId]: (prev[taskId] ?? []).map((a) =>
          a.applicationId === applicationId ? { ...a, status: "rechazado" } : a
        ),
      }))
    }
  }

  const handleNavigate = (view: MainView) => {
    if (view === "profile") setSelectedProfileId(auth.loggedInUser.id)
    setActiveView(view)
  }

  const handleOpenWorkerProfile = (worker: worker) => {
    setSelectedProfileId(`worker-${worker.id}`)
    setActiveView("profile")
  }

  const handleOpenTaskEmployerProfile = (employerId?: string) => {
    setSelectedProfileId(employerId ?? auth.loggedInUser.id)
    setActiveView("profile")
  }

  const handleSaveProfile = async (updatedUser: User) => {
  auth.updateLoggedInUser(() => updatedUser)  // ✅ envuelto en arrow function
  setUsersList((prev) =>                      // ✅ nombre correcto
    prev.map((w) => (w.id === updatedUser.id ? updatedUser : w))
  )
  setActiveView("profile")
}

  const handleAddPortfolioItem = (item: NewPortfolioItemData) => {
    auth.updateLoggedInUser((prev) =>
      prev.workInfo
        ? {
            ...prev,
            workInfo: {
              ...prev.workInfo,
              portfolio: [
                ...prev.workInfo.portfolio,
                { ...item, date: new Date().toISOString().slice(0, 10), rating: 0 },
              ],
            },
          }
        : prev
    )
    setActiveView("profile")
  }

  const handleAddReview = async (reviewText: string, rating: number) => {
  const result = await userService.addReview(selectedProfileId, rating, reviewText)
  if (!result.ok) {
    console.error("Error al agregar reseña:", result.error)
    return
  }

  if (isMockWorkerId(selectedProfileId)) {
    const newReview = result.data
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === selectedProfileId && u.workInfo
          ? {
              ...u,
              workInfo: {
                ...u.workInfo,
                reviews: u.workInfo.reviews + 1,
                reviewsProfile: [...u.workInfo.reviewsProfile, newReview],
              },
            }
          : u
      )
    )
    return
  }

  await refetchProfile(selectedProfileId)
}

  const handleDeleteReview = async (reviewId: string) => {
  const result = await userService.deleteReview(selectedProfileId, reviewId)
  if (!result.ok) {
    console.error("Error al eliminar reseña:", result.error)
    return
  }

  if (isMockWorkerId(selectedProfileId)) {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === selectedProfileId && u.workInfo
          ? {
              ...u,
              workInfo: {
                ...u.workInfo,
                reviews: Math.max(0, u.workInfo.reviews - 1),
                reviewsProfile: u.workInfo.reviewsProfile.filter((r) => r.id !== reviewId),
              },
            }
          : u
      )
    )
    return
  }

  await refetchProfile(selectedProfileId)
}

  if (activeView === "publish") {
    return (
      <PublicarSolicitud
        onCancel={() => setActiveView(taskBeingEdited ? "profile" : "jobs")}
        onSubmit={handlePublishTask}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
        taskToEdit={taskBeingEdited ?? undefined}
        currentUserId={auth.loggedInUser.id}
        currentUserName={auth.loggedInUser.name}
      />
    )
  }

  if (activeView === "login") {
    return <Login onChangeRegister={() => setActiveView("register")} onLogin={handleLogin} />
  }

  if (activeView === "register") {
    return <Register onChangeLogin={() => setActiveView("login")} onRegister={handleRegister} />
  }

  const renderContent = () => {
    if (isLoadingTasks) {
      return <div className="text-center py-16 text-gray-500">Cargando trabajos...</div>
    }
    if (taskError) {
      return (
        <div className="text-center py-16 text-red-600">
          {taskError}{" "}
          <button onClick={loadTasks} className="underline">Reintentar</button>
        </div>
      )
    }

    switch (activeView) {
      case "home":
        return (
          <MainHub
            onPublish={() => goToPublish(null)}
            onListTasks={() => setActiveView("jobs")}
            onOpenTask={handleOpenTask}
            Tasks={tasksList}
          />
        )

      case "detail":
        return selectedTask ? (
          <SelectedTask
            onBack={() => setActiveView("jobs")}
            onContact={() => setActiveView("chat")}
            onOpenProfile={handleOpenTaskEmployerProfile}
            onOpenTask={handleOpenTask}
            onApply={handleApply}
            currentUserId={auth.loggedInUser.id}
            appliedTaskIds={myAppliedTaskIds}
            Task={selectedTask}
            Tasks={tasksList}
          />
        ) : null

      case "workers":
        return <Trabajadores onOpenProfile={handleOpenWorkerProfile} Workers={workersList} />

      case "profile":
        if (isLoadingProfile) {
    return <div className="text-center py-16 text-gray-500">Cargando perfil...</div>
  }
  if (profileError) {
    return <div className="text-center py-16 text-red-600">{profileError}</div>
  }
        return (
          <PerfilUser
            user={selectedUser}
            isOwner={isOwnerProfile}
            onEditProfile={() => setActiveView("edit-profile")}
            onAddReview={handleAddReview}
            onDeleteReview={handleDeleteReview}
            onAddPortfolioItem={() => setActiveView("add-portfolio-item")}
            publishedTasks={myPublishedTasks}
            appliedTasks={myAppliedTasks}
            onAddTask={() => goToPublish(null)}
            onEditTask={(task) => goToPublish(task)}
            applications={allApplicationsForMyTasks}
            findUserById={findAnyUserById}
            onHireApplicant={handleHireApplicant}
            onRejectApplicant={handleRejectApplicant}
            currentUserId={auth.loggedInUser.id}
          />
        )

      case "edit-profile":
  // Protección de TypeScript contra valores nulos en el contexto Auth
  if (!auth || !auth.loggedInUser) {
    return <div className="p-8 text-center text-gray-500">Cargando sesión de usuario...</div>
  }

  return (
    <EditProfile
      user={auth.loggedInUser}
      onSave={handleSaveProfile}
      onCancel={() => setActiveView("profile")}
    />
  )

      case "add-portfolio-item":
        return (
          <AddPortfolioItem
            onCancel={() => setActiveView("profile")}
            onSubmit={handleAddPortfolioItem}
          />
        )

      case "chat":
        return <Chat />

      case "jobs":
      default:
        return (
          <ListTask
            onOpenTask={handleOpenTask}
            onPublish={() => goToPublish(null)}
            Tasks={tasksList}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col justify-between">
      <Header activeView={activeView} onNavigate={handleNavigate} onLogout={handleLogout} />
      <main className="flex-1">{renderContent()}</main>
      <Footer />
    </div>
  )
}

export default App