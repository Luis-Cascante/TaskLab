import { useState } from "react"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import Chat from "./Components/Chat"
import ListTask from "./Components/ListTask"
import MainHub from "./Components/MainHub"
import PerfilUser from "./Components/PerfilUser"
import PublicarSolicitud from "./Components/PublicarSolicitud"
import SelectedTask from "./Components/SelectedTask"
import Trabajadores from "./Components/Trabajadores"

type MainView = "home" | "jobs" | "detail" | "workers" | "profile" | "chat" | "publish"

function App() {
  const [activeView, setActiveView] = useState<MainView>("jobs")

  if (activeView === "publish") {
    return <PublicarSolicitud onCancel={() => setActiveView("jobs")} />
  }

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return <MainHub />
      case "detail":
        return <SelectedTask onBack={() => setActiveView("jobs")} onContact={() => setActiveView("chat")} />
      case "workers":
        return <Trabajadores />
      case "profile":
        return <PerfilUser />
      case "chat":
        return <Chat />
      case "jobs":
      default:
        return <ListTask onOpenTask={() => setActiveView("detail")} onPublish={() => setActiveView("publish")} />
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
