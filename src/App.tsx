import { useState } from "react"
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

import tasks from "./Components/PruebasTaskData"
import type { task } from "./Components/PruebasTaskData"
import workers from "./Components/PruebasWorkerData"
import type { worker } from "./Components/PruebasWorkerData"

import { workerToUser } from "./utils/workerToUser"
import { useAuth } from "./context/AuthContext"
import type { User, ReviewProfile, MainView, NewPortfolioItemData } from "./types"

function App() {
  const auth = useAuth()

  const [tasksList, setTasksList] = useState(tasks)
  const [workersList] = useState(workers)
  const [selectedTask, setSelectedTask] = useState(tasks[0])

  const [activeView, setActiveView] = useState<MainView>("register")

  // Perfiles "de terceros" que NO son cuentas reales: se derivan una sola
  // vez de la lista de workers. Son mutables porque cualquiera puede
  // dejarles una reseña. Las cuentas reales (tú y quien se registre) viven
  // en AuthContext, no aquí.
  const [usersList, setUsersList] = useState<User[]>(() => workersList.map(workerToUser))

  // Qué perfil se está viendo actualmente en la pestaña "profile".
  const [selectedProfileId, setSelectedProfileId] = useState<string>(auth.loggedInUser.id)

  // Busca primero entre las cuentas reales (tú u otro usuario registrado)
  // y, si no aparece ahí, entre los workers de prueba.
  const selectedUser: User =
    auth.findUserById(selectedProfileId) ??
    usersList.find((u) => u.id === selectedProfileId) ??
    auth.loggedInUser

  const isOwnerProfile = selectedUser.id === auth.loggedInUser.id

  const handleLogin = (cedula: string, password: string) => {
    const result = auth.login(cedula, password)
    if (result.ok) {
      setActiveView("home")
    }
    return result
  }

  const handleRegister = (data: Parameters<typeof auth.register>[0]) => {
    const result = auth.register(data)
    if (result.ok) {
      setActiveView("home")
    }
    return result
  }

  const handleOpenTask = (task: typeof tasks[number]) => {
    setSelectedTask(task)
    setActiveView("detail")
  }

  const handlePublishTask = (newTask: Omit<task, "id">) => {
    setTasksList((currentTasks) => {
      const nextId = currentTasks.length > 0
        ? Math.max(...currentTasks.map((task) => task.id)) + 1
        : 1
      return [...currentTasks, { ...newTask, id: nextId }]
    })
    setActiveView("jobs")
  }

  // Al elegir "Perfil" desde el Header, siempre volvemos al perfil propio.
  // Al abrir el perfil de un trabajador desde Trabajadores, se selecciona ese worker.
  const handleNavigate = (view: MainView) => {
    if (view === "profile") {
      setSelectedProfileId(auth.loggedInUser.id)
    }
    setActiveView(view)
  }

  const handleOpenWorkerProfile = (worker: worker) => {
    setSelectedProfileId(`worker-${worker.id}`)
    setActiveView("profile")
  }

  // Abre el perfil de quien publicó la tarea, si se conoce su id real
  // (solo lo tienen las tareas publicadas por ti durante esta sesión).
  // Si no se conoce, vuelve al comportamiento anterior: tu propio perfil.
  const handleOpenTaskEmployerProfile = (employerId?: string) => {
    setSelectedProfileId(employerId ?? auth.loggedInUser.id)
    setActiveView("profile")
  }

  const handleLogout = () => {
    auth.logout()
    setActiveView("login")
  }

  const handleSaveProfile = (updatedUser: User) => {
    auth.updateLoggedInUser(() => updatedUser)
    setActiveView("profile")
  }

  // Agrega un trabajo nuevo al portafolio del usuario logueado.
  // La fecha y la calificación NO las escribe el usuario: se generan aquí.
  const handleAddPortfolioItem = (item: NewPortfolioItemData) => {
    auth.updateLoggedInUser((prev) =>
      prev.workInfo
        ? {
            ...prev,
            workInfo: {
              ...prev.workInfo,
              portfolio: [
                ...prev.workInfo.portfolio,
                {
                  ...item,
                  date: new Date().toISOString().slice(0, 10),
                  // Sin calificar todavía: no hay ninguna reseña de cliente
                  // asociada a este trabajo recién agregado.
                  rating: 0,
                },
              ],
            },
          }
        : prev
    )
    setActiveView("profile")
  }

  // Agrega la reseña al perfil que se está viendo, sea quien sea: tú mismo,
  // otra cuenta registrada, o uno de los workers de prueba.
  const handleAddReview = (reviewText: string, rating: number) => {
    const newReview: ReviewProfile = {
      id: String(Date.now()),
      idUser: auth.loggedInUser.id,
      image: auth.loggedInUser.profilePicture,
      name: auth.loggedInUser.name,
      rating,
      review: reviewText,
    }

    const addReviewToWorkInfo = (user: User): User =>
      user.workInfo
        ? {
            ...user,
            workInfo: {
              ...user.workInfo,
              reviews: user.workInfo.reviews + 1,
              reviewsProfile: [...user.workInfo.reviewsProfile, newReview],
            },
          }
        : user

    const isRegisteredAccount = !!auth.findUserById(selectedProfileId)

    if (isRegisteredAccount) {
      auth.updateUserById(selectedProfileId, addReviewToWorkInfo)
    } else {
      setUsersList((prev) =>
        prev.map((u) => (u.id === selectedProfileId ? addReviewToWorkInfo(u) : u))
      )
    }
  }

  if (activeView === "publish") {
    return <PublicarSolicitud
    onCancel={() => setActiveView("jobs")}
    onSubmit={handlePublishTask}
    currentUserId={auth.loggedInUser.id}
    currentUserName={auth.loggedInUser.name} />
  }

  if (activeView === "login") {
    return <Login
    onChangeRegister={() => setActiveView("register")}
    onLogin={handleLogin} />
  }

  if (activeView === "register") {
    return <Register
    onChangeLogin={() => setActiveView("login")}
    onRegister={handleRegister} />
  }

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <MainHub
        onPublish={() => setActiveView("publish")}
        onListTasks={() => setActiveView("jobs")}
        onOpenTask={handleOpenTask}
        Tasks={tasksList}
        />
      case "detail":
        return <SelectedTask
        onBack={() => setActiveView("jobs")}
        onContact={() => setActiveView("chat")}
        onOpenProfile={handleOpenTaskEmployerProfile}
        onOpenTask={handleOpenTask}
        Task={selectedTask}
        Tasks={tasksList}
        />
      case "workers":
        return <Trabajadores
        onOpenProfile={handleOpenWorkerProfile}
        Workers={workersList} />
      case "profile":
        return <PerfilUser
        user={selectedUser}
        isOwner={isOwnerProfile}
        onEditProfile={() => setActiveView("edit-profile")}
        onAddReview={handleAddReview}
        onAddPortfolioItem={() => setActiveView("add-portfolio-item")}
        />
      case "edit-profile":
        return <EditProfile
        user={auth.loggedInUser}
        onSave={handleSaveProfile}
        onCancel={() => setActiveView("profile")}
        />
      case "add-portfolio-item":
        return <AddPortfolioItem
        onCancel={() => setActiveView("profile")}
        onSubmit={handleAddPortfolioItem}
        />
      case "chat":
        return <Chat />
      case "jobs":
      default:
        return <ListTask
        onOpenTask={handleOpenTask}
        onPublish={() => setActiveView("publish")}
        Tasks={tasksList}
        />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col justify-between">
      <Header activeView={activeView} onNavigate={handleNavigate} onLogout={handleLogout} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}

export default App