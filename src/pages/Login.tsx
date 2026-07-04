import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext"; // ajusta la ruta según tu proyecto

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    identification_number: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const loggedInUser = await login(formData); // ✅ usa el Context, guarda token + user correctamente
      navigate({ to: `/perfil-user/${loggedInUser.id}` });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Cédula o contraseña incorrectos";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            ¡Bienvenido a tasklab!
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                placeholder="Escribe tu cedula aquí"
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

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors mt-4 disabled:opacity-50"
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-amber-400/50"></div>
            <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase tracking-tighter">
              ¿No tienes cuenta?
            </span>
            <div className="flex-grow border-t border-amber-400/50"></div>
          </div>

          <div className="text-center text-sm text-gray-700 font-medium">
            crear una cuenta{" "}
            <a href="/register" className="text-amber-500 hover:underline">
              aquí
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;