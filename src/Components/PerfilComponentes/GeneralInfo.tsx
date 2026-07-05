import type { GeneralInfo as GeneralInfoType } from "../../types";

interface GeneralInfoProps {
  generalInfo: GeneralInfoType;
  profilePicture: string;
  name: string;
  pestañaActiva: string;
}

function GeneralInfo({ generalInfo, profilePicture, name, pestañaActiva }: GeneralInfoProps) {
  if (pestañaActiva !== "Informacion General") {
    return null;
  }

  return (
    <section className="bg-white text-gray-800 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Sobre mí</h3>
            <p className="text-gray-600 leading-relaxed">{generalInfo.aboutMe}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Títulos</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>{generalInfo.degrees}</li>
            </ul>
          </div>
        </div>

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
