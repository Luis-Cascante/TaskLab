import type { MainView } from "../types"

type HeaderProps = {
  activeView: MainView
  onNavigate: (view: MainView) => void
  onLogout: () => void
}

const navigationItems = [
  { key: "jobs", label: "Empleos" },
  { key: "workers", label: "Trabajadores" },
  { key: "profile", label: "Usuario" },
  { key: "chat", label: "Chats" },
] as const

function Header({ activeView, onNavigate, onLogout }: HeaderProps) {
  return (
    <header className="bg-[#f0f2f5] text-[#1e293b] py-4 px-8 flex justify-between items-center font-medium shadow-sm border-b border-gray-200">
      <button type="button" onClick={() => onNavigate("home")} className="flex items-center gap-2 text-left">
        <img src="src/assets/img/Logo_TaskLab.png" alt="TaskLab" className="w-6 h-auto object-contain" />
        <h2 className="text-xl font-bold tracking-wider text-[#111e38] hidden sm:inline">TaskLab</h2>
      </button>

      <div className="flex items-center gap-6">
        <nav>
          <ul className="flex gap-6 cursor-pointer text-sm font-bold text-gray-600 list-none">
            {navigationItems.map((item) => {
              const isActive = item.key === activeView || (item.key === "jobs" && activeView === "detail")

              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.key)}
                    className={isActive ? "text-[#2563eb] border-b-2 border-[#2563eb] pb-1" : "hover:text-[#2563eb] transition-colors"}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-red-600 transition-colors pl-6 border-l border-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  )
}

export default Header