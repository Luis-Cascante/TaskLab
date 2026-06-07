{/* Header: variable 1 */}
  <header className="bg-[#f0f2f5] text-[#1e293b] py-4 px-8 flex justify-between items-center font-medium shadow-sm">
    <h2 className="text-xl font-bold tracking-wider text-[#1e3a8a]">LOGO</h2>
    <li className="flex gap-6 list-none cursor-pointer">
      <ul className="hover:text-[#2563eb] transition-colors">Empleos</ul>
      <ul className="hover:text-[#2563eb] transition-colors">Trabajadores</ul>
      <ul className="hover:text-[#2563eb] transition-colors">Usuarios</ul>
      <ul className="hover:text-[#2563eb] transition-colors">Chats</ul>
    </li>
  </header>

{/* Header: variable 1 */}
  <header className="bg-[#f0f2f5] text-[#1e293b] py-4 px-8 flex justify-between items-center font-medium shadow-sm border-b border-gray-200">
    {/* Isotipo/Logo izquierdo idéntico a la app */}
    <div className="flex items-center gap-2">
      <span className="text-[#111e38] text-2xl font-black tracking-tighter border-b-2 border-[#3b82f6]">
        T
      </span>
      <h2 className="text-xl font-bold tracking-wider text-[#111e38] hidden sm:inline">Tasklab</h2>
    </div>

    <nav>
      <ul className="flex gap-6 cursor-pointer text-sm font-bold text-gray-600 list-none">
        <li className="text-[#2563eb] border-b-2 border-[#2563eb] pb-1">Empleos</li>
        <li className="hover:text-[#2563eb] transition-colors">Trabajadores</li>
        <li className="hover:text-[#2563eb] transition-colors">Usuario</li>
        <li className="hover:text-[#2563eb] transition-colors">Chats</li>
      </ul>
    </nav>
  </header>