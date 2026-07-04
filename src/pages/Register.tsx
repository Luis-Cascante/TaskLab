import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "../services/auth"; // ajusta la ruta según tu proyecto

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    identification_number: "",
    address: "",
    phone: "",
    password: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setAcceptedTerms(checked);
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo"
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(formData);
      navigate({ to: "/login" });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "No se pudo crear la cuenta";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
        <section className="hidden md:flex md:w-1/2 bg-[#111e38] items-center justify-center p-12">
          <img
            src="/assets/login.png"
            alt="Logo TaskLab"
            className="w-2/3 h-auto object-contain opacity-80"
          />
        </section>

        <section className="flex-1 bg-[#e5e7eb] flex flex-col items-center justify-center px-8 py-12 md:px-24">
          <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold text-center text-black mb-10">
              ¡Empieza ahora en tasklab!
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-gray-600 ml-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Escribe tu nombre completo aquí"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-gray-600 ml-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Escribe tu correo electrónico aquí"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="identification_number" className="text-sm text-gray-600 ml-1">
                  Cedula
                </label>
                <input
                  type="text"
                  id="identification_number"
                  name="identification_number"
                  value={formData.identification_number}
                  onChange={handleChange}
                  placeholder="Incluya los ceros de su cedula"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="address" className="text-sm text-gray-600 ml-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Escribe tu dirección aquí"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm text-gray-600 ml-1">
                  Número de teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Escribe tu número de teléfono aquí"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                />
              </div>

              <div className="flex flex-col gap-1 relative">
                <label htmlFor="password" className="text-sm text-gray-600 ml-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 cursor-pointer select-none"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-4">
                <input
                  type="checkbox"
                  id="terminos"
                  name="terminos"
                  checked={acceptedTerms}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
                <label htmlFor="terminos" className="text-sm text-gray-600">
                  Acepto los{" "}
                  <a href="/terminos" className="text-amber-500 hover:underline">
                    términos y condiciones
                  </a>
                </label>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors mt-4 disabled:opacity-50"
              >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>

            <div className="relative flex py-8 items-center">
              <div className="flex-grow border-t border-amber-400/50"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase tracking-tighter">
                ¿Ya tienes una cuenta?
              </span>
              <div className="flex-grow border-t border-amber-400/50"></div>
            </div>

            <div className="text-center text-sm text-gray-700 font-medium">
              Inicia sesión{" "}
              <a href="/login" className="text-amber-500 hover:underline">
                aquí
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;