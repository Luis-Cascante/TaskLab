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
import PublicarSolicitud from "./Components/PublicarSolicitud"
import SelectedTask from "./Components/SelectedTask"
import Trabajadores from "./Components/Trabajadores"

import tasks from "./Components/PruebasTaskData"
import workers from "./Components/PruebasWorkerData"

type MainView = "home" | "jobs" | "detail" | "workers" | "profile" | "chat" | "publish" | "login" | "register"

type ApplicationStatus = "pendiente" | "rechazado" | "contratado"

type Application = {
  taskId: number
  worker: string
  status: ApplicationStatus
}

function App() {
  const currentUser = "Pepe Juan"
  const [tasksList, setTasksList] = useState(tasks)
  const [workersList] = useState(workers)
  const [selectedTask, setSelectedTask] = useState(tasks[0])
  const [applications, setApplications] = useState<Application[]>([
    { taskId: 1, worker: currentUser, status: "pendiente" },
  ])

  const [activeView, setActiveView] = useState<MainView>("register")

  const handleOpenTask = (task: typeof tasks[number]) => {
    setSelectedTask(task)
    setActiveView("detail")
  }

  const handleAddTask = () => {
    setActiveView("publish")
  }

  const handleEditTask = (taskToEdit: typeof tasks[number]) => {
    const title = window.prompt("Editar título", taskToEdit.title)
    if (!title?.trim()) return

    const description = window.prompt("Editar descripción", taskToEdit.description) ?? taskToEdit.description
    const location = window.prompt("Editar ubicación", taskToEdit.location) ?? taskToEdit.location
    const category = window.prompt("Editar categoría", taskToEdit.category) ?? taskToEdit.category
    const agreement = window.prompt("Editar tipo de contrato", taskToEdit.agreement) ?? taskToEdit.agreement

    setTasksList((prev) =>
      prev.map((task) =>
        task.id === taskToEdit.id
          ? {
              ...task,
              title: title.trim(),
              description: description.trim() || taskToEdit.description,
              location: location.trim() || taskToEdit.location,
              category: category.trim() || taskToEdit.category,
              agreement: agreement.trim() || taskToEdit.agreement,
            }
          : task,
      ),
    )

    setSelectedTask((current) =>
      current.id === taskToEdit.id
        ? {
            ...current,
            title: title.trim(),
            description: description.trim() || current.description,
            location: location.trim() || current.location,
            category: category.trim() || current.category,
            agreement: agreement.trim() || current.agreement,
          }
        : current,
    )
  }

  const handleDeleteTask = (taskId: number) => {
    setTasksList((prev) => prev.filter((task) => task.id !== taskId))
    setApplications((prev) => prev.filter((app) => app.taskId !== taskId))
    setActiveView("profile")
  }

  const handleApply = (taskId: number) => {
    const task = tasksList.find((task) => task.id === taskId)
    if (!task) return
    if (task.employer === currentUser) return
    if (applications.some((app) => app.taskId === taskId && app.worker === currentUser)) return

    setApplications((prev) => [...prev, { taskId, worker: currentUser, status: "pendiente" }])
  }

  const handleHireApplicant = (taskId: number, worker: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.taskId !== taskId) return app
        if (app.worker === worker) return { ...app, status: "contratado" }
        if (app.status === "pendiente") return { ...app, status: "rechazado" }
        return app
      }),
    )
  }

  const handleRejectApplicant = (taskId: number, worker: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.taskId === taskId && app.worker === worker ? { ...app, status: "rechazado" } : app,
      ),
    )
  }

  const publishedTasks = tasksList.filter((task) => task.employer === currentUser)
  const appliedTasks = applications
    .map((app) => {
      const task = tasksList.find((task) => task.id === app.taskId)
      return task ? { task, status: app.status } : null
    })
    .filter(Boolean) as { task: typeof tasks[number]; status: ApplicationStatus }[]

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return (
          <MainHub
            onPublish={() => setActiveView("publish")}
            onListTasks={() => setActiveView("jobs")}
            onOpenTask={handleOpenTask}
            Tasks={tasksList}
          />
        )
      case "detail":
        return (
          <SelectedTask
            currentUser={currentUser}
            applications={applications}
            onBack={() => setActiveView("jobs")}
            onApply={handleApply}
            onHireApplicant={handleHireApplicant}
            onRejectApplicant={handleRejectApplicant}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onOpenProfile={() => setActiveView("profile")}
            onOpenTask={handleOpenTask}
            Task={selectedTask}
            Tasks={tasksList}
          />
        )
      case "workers":
        return <Trabajadores onOpenProfile={() => setActiveView("profile")} Workers={workersList} />
      case "profile":
        return (
          <PerfilUser
            currentUser={currentUser}
            publishedTasks={publishedTasks}
            appliedTasks={appliedTasks}
            onOpenTask={handleOpenTask}
            onAddTask={handleAddTask}
          />
        )
      case "chat":
        return <Chat />
      case "publish":
        return <PublicarSolicitud onCancel={() => setActiveView("jobs")} />
      case "login":
        return <Login onChangeRegister={() => setActiveView("register")} onLoginSuccess={() => setActiveView("home")} />
      case "register":
        return <Register onChangeLogin={() => setActiveView("login")} onRegisterSuccess={() => setActiveView("home")} />
      case "jobs":
      default:
        return <ListTask onOpenTask={handleOpenTask} onPublish={() => setActiveView("publish")} Tasks={tasksList} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col justify-between">
      <Header activeView={activeView} onNavigate={setActiveView} />
      <main className="flex-1">{renderContent()}</main>
      <Footer />
    </div>
  )
}

export default App
