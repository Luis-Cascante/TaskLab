function Footer() {
    return (
        <footer className="border-t border-gray-300 bg-[#e2e8f0] text-[#475569]">
            <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
                <div className="grid gap-6 lg:grid-cols-12">
                    <section className="lg:col-span-7">
                        <div className="space-y-3 text-center md:text-left">
                            <p className="max-w-xl text-sm leading-relaxed text-[#64748b]">
                                Plataforma para conectar personas con trabajos, solicitudes y oportunidades de forma simple y clara.
                            </p>
                        </div>
                    </section>

                    <section className="lg:col-span-5">
                        <div className="space-y-3 text-center md:text-left">
                            <p className="text-sm font-bold uppercase tracking-wider text-[#111e38]">Contacto</p>
                            <div className="space-y-2 text-sm text-[#475569]">
                                <p className="flex items-center justify-center gap-2 md:justify-start">
                                    <span className="h-2 w-2 rounded-full bg-[#1d61a1]" />
                                    Correo: contacto@tasklab.com
                                </p>
                                <p className="flex items-center justify-center gap-2 md:justify-start">
                                    <span className="h-2 w-2 rounded-full bg-[#1d61a1]" />
                                    Teléfono: +506 0000 0000
                                </p>
                                <p className="flex items-center justify-center gap-2 md:justify-start">
                                    <span className="h-2 w-2 rounded-full bg-[#1d61a1]" />
                                    Ubicación: Costa Rica
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </footer>
    )
}

export default Footer