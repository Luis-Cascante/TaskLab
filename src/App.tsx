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

function App() {
  const [tasksList, setTasksList] = useState(tasks)
  const [workersList, setWorkersList] = useState(workers)

  const [activeView, setActiveView] = useState<MainView>("register")

  if (activeView === "publish" ) {
    return <PublicarSolicitud onCancel={() => setActiveView("jobs")} />
  }

  if (activeView === "login" ) {
    return <Login 
    onChangeRegister={() => setActiveView("register")} 
    onLoginSuccess={() => setActiveView("home")} />
  }

  if (activeView === "register" ) {
    return <Register 
    onChangeLogin={() => setActiveView("login")} 
    onRegisterSuccess={() => setActiveView("home")} />
  }

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <MainHub 
        onPublish={() => setActiveView("publish")} 
        onListTasks={() => setActiveView("jobs")} 
        onOpenTask={() => setActiveView("detail")} 
        Tasks={tasksList}
        />
      case "detail":
        return <SelectedTask 
        onBack={() => setActiveView("jobs")} 
        onContact={() => setActiveView("chat")} 
        onOpenProfile={() => setActiveView("profile")} 
        onOpenTask={() => setActiveView("detail")}  
        Task={tasksList[0]} 
        Tasks={tasksList}
        />
      case "workers":
        return <Trabajadores 
        onOpenProfile={() => setActiveView("profile")}
        Workers={workersList} />
      case "profile":
        return <PerfilUser />
      case "chat":
        return <Chat />
      case "jobs":
      default:
        return <ListTask 
        onOpenTask={() => setActiveView("detail")} 
        onPublish={() => setActiveView("publish")} 
        Tasks={tasksList}
        />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col justify-between">
      <Header activeView={activeView} onNavigate={setActiveView} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}

export default App
