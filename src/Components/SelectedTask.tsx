import { useEffect, useState } from "react";
import type { task } from "./PruebasTaskData";
import TaskCard from "./TaskCard";

type ApplicationStatus = "pendiente" | "rechazado" | "contratado";

type Application = {
  taskId: number;
  worker: string;
  status: ApplicationStatus;
};

type SelectedTaskProps = {
  currentUser: string;
  applications: Application[];
  onBack?: () => void;
  onApply?: (taskId: number) => void;
  onHireApplicant?: (taskId: number, worker: string) => void;
  onRejectApplicant?: (taskId: number, worker: string) => void;
  onDeleteTask?: (taskId: number) => void;
  onEditTask?: (task: task) => void;
  onOpenProfile?: () => void;
  onOpenTask?: (task: task) => void;
  Task: task;
  Tasks: task[];
};

function SelectedTask({
  currentUser,
  applications,
  onBack,
  onApply,
  onHireApplicant,
  onRejectApplicant,
  onDeleteTask,
  onEditTask,
  onOpenProfile,
  onOpenTask,
  Task,
  Tasks,
}: SelectedTaskProps) {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(Task.title);
  const [editDescription, setEditDescription] = useState(Task.description);
  const [editLocation, setEditLocation] = useState(Task.location);
  const [editCategory, setEditCategory] = useState(Task.category);
  const [editAgreement, setEditAgreement] = useState(Task.agreement);

  useEffect(() => {
    if (!editMode) {
      setEditTitle(Task.title);
      setEditDescription(Task.description);
      setEditLocation(Task.location);
      setEditCategory(Task.category);
      setEditAgreement(Task.agreement);
    }
  }, [Task, editMode]);

  const isOwner = Task.employer === currentUser;
  const userApplication = applications.find(
    (app) => app.taskId === Task.id && app.worker === currentUser,
  );
  const hasHiredApplicant = applications.some(
    (app) => app.taskId === Task.id && app.status === "contratado",
  );
  const taskApplicants = applications.filter((app) => app.taskId === Task.id);

  const primaryButtonLabel = isOwner
    ? editMode
      ? "Guardando..."
      : "Editar tarea"
    : userApplication
      ? userApplication.status === "pendiente"
        ? "Aplicación pendiente"
        : userApplication.status === "contratado"
          ? "Contratado"
          : "Aplicación rechazada"
      : "Aplicar";

  const isPrimaryDisabled = isOwner
    ? editMode
      ? false
      : false
    : Boolean(userApplication) || hasHiredApplicant;

  const handleSave = () => {
    const updatedTask = {
      ...Task,
      title: editTitle,
      description: editDescription,
      location: editLocation,
      category: editCategory,
      agreement: editAgreement,
    };
    onEditTask?.(updatedTask);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditTitle(Task.title);
    setEditDescription(Task.description);
    setEditLocation(Task.location);
    setEditCategory(Task.category);
    setEditAgreement(Task.agreement);
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
      <div className="text-center py-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Detalle del trabajo
        </h1>
      </div>

      <div className="bg-[#f59e0b] rounded-2xl border border-yellow-400/40 shadow-lg flex flex-col">
        <div className="flex justify-between items-center m-1 gap-2">
          <button
            type="button"
            onClick={onBack}
            className="bg-[#111e38] hover:bg-[#1a2e54] text-white p-2 rounded-xl transition-colors flex items-center justify-center shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {isOwner && (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="bg-white text-[#1d61a1] font-semibold px-4 py-2 rounded-xl shadow-sm hover:bg-gray-100 transition-colors"
              >
                Editar tarea
              </button>
            )}
            {isOwner && (
              <button
                type="button"
                onClick={() => onDeleteTask?.(Task.id)}
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-xl shadow-sm hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>

        <div className="bg-[#1d61a1] text-white rounded-b-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-inner relative">
          <div className="w-full md:w-72 h-48 md:h-64 bg-[#d1d5db] rounded-3xl shrink-0 overflow-hidden shadow-md">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop"
              alt="Detalle del trabajo solicitado"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                {Task.title}
              </h2>
              <p className="text-xs md:text-sm font-semibold text-gray-900 bg-white/20 w-fit px-3 py-1 rounded-md">
                <span className="font-bold">Trabajo solicitado por:</span>{" "}
                <span
                  onClick={onOpenProfile}
                  className="cursor-pointer hover:text-yellow-400 transition-colors"
                >
                  {Task.employer}
                </span>
              </p>

              <div className="text-sm space-y-1.5 mt-2">
                {editMode ? (
                  <form
                    className="space-y-4"
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleSave();
                    }}
                  >
                    <div className="grid gap-4">
                      <label className="flex flex-col text-sm text-gray-200">
                        Título
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(event) => setEditTitle(event.target.value)}
                          className="mt-2 w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                        />
                      </label>

                      <label className="flex flex-col text-sm text-gray-200">
                        Descripción
                        <textarea
                          value={editDescription}
                          onChange={(event) =>
                            setEditDescription(event.target.value)
                          }
                          rows={4}
                          className="mt-2 w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                        />
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex flex-col text-sm text-gray-200">
                          Ubicación
                          <input
                            type="text"
                            value={editLocation}
                            onChange={(event) =>
                              setEditLocation(event.target.value)
                            }
                            className="mt-2 rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                          />
                        </label>
                        <label className="flex flex-col text-sm text-gray-200">
                          Categoría
                          <input
                            type="text"
                            value={editCategory}
                            onChange={(event) =>
                              setEditCategory(event.target.value)
                            }
                            className="mt-2 rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                          />
                        </label>
                      </div>

                      <label className="flex flex-col text-sm text-gray-200">
                        Contrato
                        <input
                          type="text"
                          value={editAgreement}
                          onChange={(event) =>
                            setEditAgreement(event.target.value)
                          }
                          className="mt-2 w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                        />
                      </label>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-end mt-2">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-white text-[#1d61a1] font-semibold px-5 py-2 rounded-xl shadow-sm hover:bg-gray-100 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-[#111e38] hover:bg-[#0f1f3c] text-white font-semibold px-5 py-2 rounded-xl shadow-sm transition-colors"
                      >
                        Guardar cambios
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="leading-relaxed text-gray-100 font-light text-justify">
                      <strong className="text-gray-900 font-bold">
                        Descripcion:
                      </strong>{" "}
                      {Task.description}
                    </p>
                    <p className="text-gray-100">
                      <strong className="text-gray-900 font-bold">
                        Ubicacion:
                      </strong>{" "}
                      {Task.location}
                    </p>
                    <p className="text-gray-100">
                      <strong className="text-gray-900 font-bold">
                        Categoria:
                      </strong>{" "}
                      {Task.category}
                    </p>
                    <p className="text-gray-100">
                      <strong className="text-gray-900 font-bold">
                        Contrato:
                      </strong>{" "}
                      {Task.agreement}
                    </p>
                  </>
                )}
              </div>
            </div>

            {!editMode && !isOwner && (
              <div className="flex justify-end mt-4 gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => onApply?.(Task.id)}
                  disabled={isPrimaryDisabled}
                  className={`bg-[#f59e0b] ${isPrimaryDisabled ? "opacity-60 cursor-not-allowed" : "hover:bg-[#e08e06]"} text-gray-900 font-black text-base px-8 py-2.5 rounded-xl shadow-md transition-colors tracking-wide`}
                >
                  {primaryButtonLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOwner && (
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Aplicantes</h3>
            <p className="text-sm text-gray-600">
              Revisa quién aplicó a este trabajo y contrata solo a uno.
            </p>
          </div>

          {taskApplicants.length > 0 ? (
            <div className="space-y-4">
              {taskApplicants.map((applicant) => (
                <div
                  key={`${applicant.taskId}-${applicant.worker}`}
                  className="border border-gray-200 rounded-3xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {applicant.worker}
                    </p>
                    <p className="text-sm text-gray-500">
                      Estado:{" "}
                      {applicant.status === "pendiente"
                        ? "Pendiente"
                        : applicant.status === "contratado"
                          ? "Contratado"
                          : "Rechazado"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {applicant.status === "pendiente" && !hasHiredApplicant ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            onHireApplicant?.(Task.id, applicant.worker)
                          }
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl transition-colors"
                        >
                          Contratar
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onRejectApplicant?.(Task.id, applicant.worker)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl transition-colors"
                        >
                          Rechazar
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">
                        Acciones no disponibles
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-[#f8fafc] p-6 text-gray-700">
              Aún no hay aplicantes para este trabajo.
            </div>
          )}

          {hasHiredApplicant && (
            <div className="mt-4 rounded-3xl bg-green-50 border border-green-200 p-4 text-green-800">
              Ya se contrató a un candidato para esta solicitud. No es posible
              contratar más.
            </div>
          )}
        </section>
      )}

      <div className="w-full flex flex-col gap-4 mt-4">
        <div className="text-center py-2">
          <h3 className="text-lg font-bold text-gray-800">Otras solicitudes</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {Tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onOpenTask={() => onOpenTask?.(task)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default SelectedTask;
