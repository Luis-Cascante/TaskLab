type HeaderProps = {
  activeView: "home" | "jobs" | "detail" | "workers" | "profile" | "chat" | "publish"
  onNavigate: (view: "home" | "jobs" | "detail" | "workers" | "profile" | "chat" | "publish") => void
}

const navigationItems = [
  { key: "jobs", label: "Empleos" },
  { key: "workers", label: "Trabajadores" },
  { key: "profile", label: "Usuario" },
  { key: "chat", label: "Chats" },
] as const

function Header({ activeView, onNavigate }: HeaderProps) {
  return (
    <header className="bg-[#f0f2f5] text-[#1e293b] py-4 px-8 flex justify-between items-center font-medium shadow-sm border-b border-gray-200">
      <button type="button" onClick={() => onNavigate("home")} className="flex items-center gap-2 text-left">
        <span className="text-[#111e38] text-2xl font-black tracking-tighter border-b-2 border-[#3b82f6]">
          T
        </span>
        <h2 className="text-xl font-bold tracking-wider text-[#111e38] hidden sm:inline">Tasklab</h2>
      </button>

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
    </header>
  )
}

export default Header