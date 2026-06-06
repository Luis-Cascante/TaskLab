import React from "react"

function App() {

  return (
      <>
  {/* Header: Barra superior con fondo gris claro y elementos alineados en los extremos */}
  <header className="bg-[#f0f2f5] text-[#1e293b] py-4 px-8 flex justify-between items-center font-medium shadow-sm">
    <h2 className="text-xl font-bold tracking-wider text-[#1e3a8a]">LOGO</h2>
    <li className="flex gap-6 list-none cursor-pointer">
      <ul className="hover:text-[#2563eb] transition-colors">Empleos</ul>
      <ul className="hover:text-[#2563eb] transition-colors">Trabajadores</ul>
      <ul className="hover:text-[#2563eb] transition-colors">Usuarios</ul>
      <ul className="hover:text-[#2563eb] transition-colors">Chats</ul>
    </li>
  </header>

  

  {/* Footer: Bloque inferior gris claro */}
  <footer className="bg-[#e2e8f0] text-[#475569] text-center py-12 border-t border-gray-300">
    <p className="text-xl font-semibold tracking-wide lowercase">hacer el footer</p>
  </footer>
</>
  )
}

export default App
