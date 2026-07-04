import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

import { userService } from '../services/users';
import Layout from "../Components/Layout"

import { useNavigate, useParams } from '@tanstack/react-router'



function EditProfile() {

  const { userId } = useParams({ from: '/edit-profile/$userId' });
  const { user, loading, error } = useUser(userId);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profession: "",
    availability: false,
    aboutMe: "",
    degrees: "",
    profilePicture: "",
    newPassword: "",
    confirmPassword: ""
  });
  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      profession: user.work_info?.profession || "",
      availability: user.work_info?.availability || false,
      aboutMe: user.work_info?.about_me || "",
      degrees: user.work_info?.degrees || "",
      profilePicture: user.profile_picture || "",
      newPassword: "",
      confirmPassword: ""
    });

    setPreview(user.profile_picture || "https://via.placeholder.com/150");
  }, [user]);

  const [preview, setPreview] = useState(
    formData.profilePicture || "https://picsum.photos/200"
  );


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setSubmitError("Solo se permiten imágenes JPG, PNG o WEBP");
      return;
    }

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setSubmitError(`La imagen no debe superar los ${maxSizeMB}MB`);
      return;
    }

    setSubmitError(null);
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Validar contraseñas antes de enviar
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setSubmitError("Las contraseñas no coinciden");
        return false;
      }
      if (!passwordRegex.test(formData.newPassword)) {
        setSubmitError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo");
        return false;
      }
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        profession: formData.profession,
        availability: formData.availability,
        about_me: formData.aboutMe,
        degrees: formData.degrees,
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      await userService.updateUser(userId, updateData, selectedImage);

      return true;
    } catch (err: any) {
      setSubmitError(err.response?.data?.message || "Error al actualizar el perfil");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1d61a1] flex items-center justify-center">
        <p className="text-white text-2xl font-semibold animate-pulse">
          Cargando información del usuario...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1d61a1] flex items-center justify-center" >
        <p className="text-red-600 text-xl font-semibold">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <Layout>

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

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Información Personal
              </h2>

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

                      <p className="text-sm text-gray-500 mt-3">
                        JPG, PNG o WEBP
                      </p>
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
                  ["degrees", "Títulos", 4]
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

                <div className="md:col-span-2 pt-8">
                  <div className="md:col-span-2 border-t pt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Cambiar Contraseña
                    </h2>
                    <p className="text-gray-600 mb-4">
                      La contraseña debe tener al menos 6 caracteres y contener una combinación de letras, números y símbolos.
                    </p>
                  </div>

                  <label className="font-semibold text-gray-700 ">Nueva contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-lg p-3 mb-4"
                  />

                  <label className="font-semibold text-gray-700">Confirmar nueva contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-lg p-3"
                  />
                </div>

              </div>
            </div>
            {submitError && (
              <p className="text-red-500 text-sm mb-4">{submitError}</p>
            )}



            <div className="flex justify-end gap-4 border-t pt-8">
              <button className="px-8 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
                onClick={() => navigate({ to: `/perfil-user/${userId}` })}
              >
                Cancelar
              </button>

              <button
                onClick={async () => {
                  const success = await handleSubmit();
                  if (success) {
                    navigate({ to: `/perfil-user/${userId}` });
                  }
                }}
                disabled={submitting}
                className="px-8 py-3 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold disabled:opacity-50"
              >
                {submitting ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>

          </div >

        </section >
      </Layout>
    </>
  );
}

export default EditProfile;
