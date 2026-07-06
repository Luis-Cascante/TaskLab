import { useState } from "react"
import type { BackendTask } from "../../types"
import type { Application } from "../../types"
import TaskCard from "../TaskCard"

interface TrabajosUserProps {
  pestañaActiva: string
  publishedTasks: BackendTask[]
  applications: Application[] 
  appliedTasks: Array<{ task: BackendTask; status: Application["status"] }>
  onAddTask: () => void
  onEditTask: (task: BackendTask) => void
  onHire: (taskId: string, applicationId: string) => void
  onReject: (taskId: string, applicationId: string) => void
}

function PublishedTaskCard({
  task,
  applicants,
  onEditTask,
  onHire,
  onReject,
}: {
  task: BackendTask
  applicants: Application[]
  onEditTask: (task: BackendTask) => void
  onHire: (applicationId: string) => void
  onReject: (applicationId: string) => void
}) {
  const [showApplicants, setShowApplicants] = useState(false)

  const hiredApplicant = applicants.find((a) => a.status === "contratado")
  const pendingApplicants = applicants.filter((a) => a.status === "pendiente")
  const hasApplicants = applicants.length > 0

  return (
    <div className="flex flex-col gap-0">
      <TaskCard task={task} onOpenTask={() => onEditTask(task)} />

      {hasApplicants && (
        <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl px-4 pb-4 pt-3 shadow-sm">

          {hiredApplicant ? (
            <div className="flex items-center gap-3 py-2">
              <img
                src={hiredApplicant.applicantImage || "https://picsum.photos/40"}
                alt={hiredApplicant.applicantName}
                className="w-9 h-9 rounded-full object-cover border-2 border-green-400"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{hiredApplicant.applicantName}</p>
                <p className="text-xs text-green-600 font-medium">✓ Contratado</p>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setShowApplicants((prev) => !prev)}
                className="flex items-center gap-2 text-sm font-semibold text-[#1d61a1] hover:text-[#154675] transition-colors"
              >
                <span>
                  {pendingApplicants.length} aplicante{pendingApplicants.length !== 1 ? "s" : ""} pendiente{pendingApplicants.length !== 1 ? "s" : ""}
                </span>
                <span className="text-xs">{showApplicants ? "▲" : "▼"}</span>
              </button>

              {showApplicants && (
                <ul className="mt-3 flex flex-col gap-2">
                  {pendingApplicants.map((applicant) => (
                    <li
                      key={applicant.applicationId}
                      className="flex items-center gap-3 py-2 border-t border-gray-100"
                    >
                      <img
                        src={applicant.applicantImage || "https://picsum.photos/40"}
                        alt={applicant.applicantName}
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                      <p className="flex-1 text-sm font-medium text-gray-800">
                        {applicant.applicantName}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          onHire(applicant.applicationId)
                          setShowApplicants(false)
                        }}
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        title="Contratar"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        Contratar
                      </button>

                      <button
                        type="button"
                        onClick={() => onReject(applicant.applicationId)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        title="Rechazar"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Rechazar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

function TrabajosUser({
  pestañaActiva,
  publishedTasks,
  applications,
  appliedTasks,
  onAddTask,
  onEditTask,
  onHire,
  onReject,
}: TrabajosUserProps) {
  if (pestañaActiva !== "Trabajos") return null

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-12 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Tus trabajos publicados</h2>
            <p className="text-sm text-gray-600">
              Administra tus solicitudes como empleador y agrega más si lo deseas.
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
          <div className="flex flex-col gap-4">
            {publishedTasks.map((task) => {
              const taskApplicants = applications.filter((a) => a.taskId === task.id)
              return (
                <PublishedTaskCard
                  key={task.id}
                  task={task}
                  applicants={taskApplicants}
                  onEditTask={onEditTask}
                  onHire={(applicationId) => onHire(task.id, applicationId)}
                  onReject={(applicationId) => onReject(task.id, applicationId)}
                />
              )
            })}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-6 shadow-sm text-gray-700">
            No tienes trabajos publicados todavía. Crea tu primera solicitud con el botón de arriba.
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-12 py-6">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800">Trabajos a los que has aplicado</h2>
          <p className="text-sm text-gray-600">
            Aquí ves el estado de cada aplicación: pendiente, rechazado o contratado.
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
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-sm text-gray-500">
                      {task.location} · {task.category.name} · {task.agreement.name}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold w-fit ${
                      status === "pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : status === "contratado"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {status === "pendiente"
                      ? "⏳ Pendiente"
                      : status === "contratado"
                        ? "✓ Contratado"
                        : "✗ Rechazado"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-3">
                  {(task.description ?? "").slice(0, 160)}
                  {(task.description?.length ?? 0) > 160 ? "..." : ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-6 shadow-sm text-gray-700">
            Aún no has aplicado a ningún trabajo. Navega por la lista y aplica a las ofertas que te interesen.
          </div>
        )}
      </section>
    </>
  )
}

export default TrabajosUser