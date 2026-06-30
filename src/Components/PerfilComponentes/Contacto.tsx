

interface ContactoProps {
  email: string;
  phone: string;
  address: string;
  pestañaActiva: string;
  isOwner: boolean;
}

function Contacto({ email, phone, address, pestañaActiva, isOwner }: ContactoProps) {
  if (pestañaActiva !== 'Contacto') return null;

  return (
    <section className="bg-white py-8">
  <div className="max-w-7xl mx-auto">

    <div className="bg-gray-50 p-8 rounded-xl shadow-sm grid md:grid-cols-2 gap-10">

      {/* Columna izquierda */}
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

      {/* Columna derecha */}
      <div className="flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
          alt="Imagen de contacto"
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
        
      </div>

    </div>

  </div>
</section>
  );
}

export default Contacto;