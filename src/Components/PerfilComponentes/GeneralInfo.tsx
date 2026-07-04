interface GeneralInfoProps {
  aboutMe: string | undefined;
  degrees: string | undefined;
  profilePicture: string  | undefined;
  name: string  | undefined;
  pestañaActiva: string;
}

function GeneralInfo({ aboutMe, degrees, profilePicture, name, pestañaActiva }: GeneralInfoProps) {
  if (pestañaActiva !== 'Informacion General') {
    return null;
  }

  return (
    <section className="bg-white text-gray-800 py-8">
      <div className="grid md:grid-cols-3 gap-8">

        {/* Información */}
        <div className="md:col-span-2 space-y-6">

          <div>
            <h3 className="text-xl font-bold mb-2">Sobre mí</h3>
            <p className="text-gray-600 leading-relaxed">
              {aboutMe}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Títulos</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>{degrees}</li>
            </ul>
          </div>

        </div>

        {/* Imagen lateral */}
        <div>
          <img
            src={profilePicture}
            alt={name}
            className="w-full h-100 object-cover rounded-xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}

export default GeneralInfo;