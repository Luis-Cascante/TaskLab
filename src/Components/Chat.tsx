function Chat() {
  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-[#111e38] text-white px-5 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Chats</h1>
            <p className="text-sm text-blue-100">Conversaciones activas del proyecto</p>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">Andrey</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-[70vh]">
          <aside className="border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50">
            <div className="p-4 border-b border-gray-200">
              <input
                type="text"
                placeholder="Buscar conversación"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
              />
            </div>

            <div className="space-y-2 p-3">
              {[
                { name: "María López", preview: "¿Sigue disponible el trabajo?" },
                { name: "Carlos Vega", preview: "Te envié la ubicación" },
                { name: "Soporte TaskLab", preview: "Tu solicitud fue publicada" },
              ].map((conversation, index) => (
                <button
                  key={conversation.name}
                  type="button"
                  className={index === 0 ? "w-full text-left rounded-xl bg-[#1d61a1] text-white p-3" : "w-full text-left rounded-xl bg-white border border-gray-200 p-3 hover:border-[#1d61a1] transition-colors"}
                >
                  <p className="font-semibold text-sm">{conversation.name}</p>
                  <p className={index === 0 ? "text-xs text-blue-100 mt-1" : "text-xs text-gray-500 mt-1"}>{conversation.preview}</p>
                </button>
              ))}
            </div>
          </aside>

          <section className="flex flex-col bg-white">
            <div className="border-b border-gray-200 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1d61a1] text-white flex items-center justify-center font-bold">M</div>
              <div>
                <h2 className="font-bold text-gray-900">María López</h2>
                <p className="text-xs text-green-600">En línea</p>
              </div>
            </div>

            <div className="flex-1 p-4 md:p-6 space-y-3 bg-gradient-to-b from-white to-gray-50">
              <div className="max-w-xl rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-sm text-gray-700">
                Hola, vi tu solicitud y me interesa ayudarte.
              </div>
              <div className="max-w-xl ml-auto rounded-2xl rounded-tr-sm bg-[#1d61a1] px-4 py-3 text-sm text-white">
                Perfecto, te comparto más detalles.
              </div>
              <div className="max-w-xl rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3 text-sm text-gray-700">
                ¿Podemos coordinar por la tarde?
              </div>
            </div>

            <form className="border-t border-gray-200 p-4 bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Escribe un mensaje"
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                />
                <button type="submit" className="rounded-xl bg-[#f59e0b] px-5 py-3 text-sm font-bold text-gray-900 hover:bg-[#e08e06] transition-colors">
                  Enviar
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Chat