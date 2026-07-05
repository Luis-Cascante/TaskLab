interface ContactoProps {
  email: string;
  phone: string;
  address: string;
  image: string;
  pestañaActiva: string;
  isOwner: boolean;
}

function Contacto({ email, phone, address, image, pestañaActiva }: ContactoProps) {
  if (pestañaActiva !== "Contacto") return null;

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Información de Contacto
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500">Correo Electrónico</p>
                <p className="text-lg font-medium text-gray-800">{email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="text-lg font-medium text-gray-800">{phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Ubicación</p>
                <p className="text-lg font-medium text-gray-800">{address}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <img
              src={image || "https://picsum.photos/600/400"}
              alt="Foto de perfil"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;