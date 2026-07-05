import { useState } from "react";
import type { task } from "./PruebasTaskData";
import GeneralInfo from "./PerfilComponentes/GeneralInfo";
import Portafolio from "./PerfilComponentes/Portafolio";
import ReviewsPerfil from "./PerfilComponentes/ReviewsPerfil";
import TaskCard from "./TaskCard";

type ProfileTab = "general" | "portafolio" | "opiniones";

type PerfilUserProps = {
  currentUser: string;
  publishedTasks: task[];
  appliedTasks: Array<{
    task: task;
    status: "pendiente" | "rechazado" | "contratado";
  }>;
  onOpenTask?: (task: task) => void;
  onAddTask?: () => void;
};

function PerfilUser({
  currentUser,
  publishedTasks,
  appliedTasks,
  onOpenTask,
  onAddTask,
}: PerfilUserProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("general");

  return (
    <div>
      <section className="bg-[#1d61a1] text-white pt-8 px-4 md:px-12 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img
              src=""
              alt="perfil"
              className="w-24 h-24 rounded-full border-4 border-white object-cover bg-gray-300"
            />
            <div>
              <p className="text-2xl font-bold tracking-wide">{currentUser}</p>
              <p className="text-sm text-blue-200 font-medium">
                Especialista en servicios
              </p>
              <p className="text-sm flex items-center gap-1 my-1 text-amber-400 font-semibold">
                ⭐⭐⭐⭐⭐ <span className="text-white ml-1">4,5</span>{" "}
                <span className="text-blue-200 font-normal text-xs">
                  (17 recomendaciones)
                </span>
              </p>
              <p className="text-xs text-blue-100">San José, Costa Rica</p>
              <p className="text-xs flex items-center gap-1.5 mt-1 font-medium text-green-300">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 block animate-pulse"></span>{" "}
                Disponible
              </p>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-2 px-6 rounded-lg text-sm shadow-md transition-all">
              Enviar mensaje
            </button>
            <button className="flex-1 md:flex-none bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-2 px-8 rounded-lg text-sm shadow-md transition-all">
              Contactar
            </button>
          </div>
        </div>

        <div className="bg-white text-gray-500 font-semibold text-sm -mx-4 md:-mx-12 px-4 md:px-12 border-b border-gray-200">
          <ul className="flex gap-8 max-w-7xl mx-auto list-none justify-center md:justify-start">
            <li>
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={
                  activeTab === "general"
                    ? "py-4 text-[#3b82f6] border-b-2 border-[#3b82f6] cursor-pointer"
                    : "py-4 hover:text-gray-800 transition-colors cursor-pointer"
                }
              >
                Informacion General
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveTab("portafolio")}
                className={
                  activeTab === "portafolio"
                    ? "py-4 text-[#3b82f6] border-b-2 border-[#3b82f6] cursor-pointer"
                    : "py-4 hover:text-gray-800 transition-colors cursor-pointer"
                }
              >
                Portafolio
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveTab("opiniones")}
                className={
                  activeTab === "opiniones"
                    ? "py-4 text-[#3b82f6] border-b-2 border-[#3b82f6] cursor-pointer"
                    : "py-4 hover:text-gray-800 transition-colors cursor-pointer"
                }
              >
                Opiniones
              </button>
            </li>
          </ul>
        </div>
      </section>

      {activeTab === "general" ? <GeneralInfo /> : null}
      {activeTab === "portafolio" ? <Portafolio /> : null}
      {activeTab === "opiniones" ? <ReviewsPerfil /> : null}

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Tus trabajos publicados
            </h2>
            <p className="text-sm text-gray-600">
              Administra tus solicitudes como empleador y agrega más si lo
              deseas.
            </p>
          </div>
          <button
            type="button"
            onClick={onAddTask}
            className="bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2 px-5 rounded-xl shadow-md transition-colors text-sm"
          >
            + Agregar trabajo
          </button>
        </div>

        {publishedTasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {publishedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onOpenTask={() => onOpenTask?.(task)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-6 shadow-sm text-gray-700">
            No tienes trabajos publicados todavía. Crea tu primera solicitud en
            el perfil.
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-6">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Trabajos a los que has aplicado
          </h2>
          <p className="text-sm text-gray-600">
            Aquí ves el estado de cada aplicación: pendiente, rechazado o
            contratado.
          </p>
        </div>

        {appliedTasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {appliedTasks.map(({ task, status }) => (
              <div
                key={task.id}
                className="border border-gray-200 rounded-3xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {task.location} · {task.category} · {task.agreement}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      status === "pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : status === "contratado"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {status === "pendiente"
                      ? "Pendiente"
                      : status === "contratado"
                        ? "Contratado"
                        : "Rechazado"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  {task.description.slice(0, 160)}
                  {task.description.length > 160 ? "..." : ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-6 shadow-sm text-gray-700">
            Aún no has aplicado a ningún trabajo. Navega por la lista y aplica a
            las ofertas que te interesen.
          </div>
        )}
      </section>
    </div>
  );
}

export default PerfilUser;
