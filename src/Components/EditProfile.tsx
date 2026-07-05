import { useState, type ChangeEvent } from "react";
import type { User } from "../types";

interface EditProfileProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

interface EditProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  profession: string;
  availability: boolean;
  aboutMe: string;
  degrees: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Acepta 8 dígitos, con o sin guión en medio (ej. 88888888 o 8888-8888).
const PHONE_REGEX = /^\d{4}-?\d{4}$/;

function EditProfile({ user, onSave, onCancel }: EditProfileProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(user.profilePicture || "https://picsum.photos/200");
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<EditProfileFormData>({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
    profession: user.workInfo?.profession || "",
    availability: user.workInfo?.availability || false,
    aboutMe: user.workInfo?.generalInfo?.aboutMe || "",
    degrees: user.workInfo?.generalInfo?.degrees || "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (name.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError("Escribe un correo electrónico válido.");
      return;
    }

    if (phone !== "" && !PHONE_REGEX.test(phone)) {
      setError("El teléfono debe tener 8 dígitos (ej. 8888-8888).");
      return;
    }

    setError(null);

    // Sin backend: se reconstruye el objeto User completo en memoria
    // y se lo pasamos al padre (App.tsx) para que actualice su estado.
    const updatedUser: User = {
      ...user,
      name,
      email,
      phone,
      address: formData.address,
      profilePicture: preview,
      workInfo: {
        profession: formData.profession,
        availability: formData.availability,
        rating: user.workInfo?.rating ?? 0,
        reviews: user.workInfo?.reviews ?? 0,
        generalInfo: {
          aboutMe: formData.aboutMe,
          degrees: formData.degrees,
        },
        portfolio: user.workInfo?.portfolio ?? [],
        reviewsProfile: user.workInfo?.reviewsProfile ?? [],
      },
    };

    console.log("Imagen seleccionada (no se sube a ningún lado):", selectedImage);
    onSave(updatedUser);
  };

  return (
    <>
      <section className="bg-[#1d61a1] text-white pt-8 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center gap-6 pb-8">
          <img
            src={preview}
            alt="Perfil"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">Editar Perfil</h1>
            <p className="text-blue-200">
              Actualiza la información de tu perfil profesional.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-10 space-y-12">
          {error && (
            <div
              role="alert"
              className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3"
            >
              {error}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Información Personal</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block font-semibold text-gray-700 mb-4">
                  Fotografía de perfil
                </label>

                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
                  />

                  <div>
                    <input
                      id="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    <label
                      htmlFor="profileImage"
                      className="cursor-pointer bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg inline-block"
                    >
                      Cambiar fotografía
                    </label>

                    <p className="text-sm text-gray-500 mt-3">JPG, PNG o WEBP</p>
                  </div>
                </div>
              </div>

              {[
                ["name", "Nombre"],
                ["email", "Correo"],
                ["phone", "Teléfono"],
                ["address", "Dirección"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="font-semibold text-gray-700">{label}</label>
                  <input
                    name={name}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-lg p-3"
                  />
                  {name === "phone" && (
                    <p className="text-xs text-gray-500 mt-1">Formato: 8888-8888</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Información Profesional
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold text-gray-700">Profesión</label>
                <input
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="mt-2 w-full border rounded-lg p-3"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 font-semibold">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleChange}
                  />
                  Disponible
                </label>
              </div>

              {[
                ["aboutMe", "Sobre mí", 5],
                ["degrees", "Títulos", 4],
              ].map(([name, label, rows]) => (
                <div className="md:col-span-2" key={name}>
                  <label className="font-semibold text-gray-700">{label}</label>
                  <textarea
                    rows={rows as number}
                    name={name as string}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-lg p-3"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t pt-8">
            <button
              className="px-8 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditProfile;