import { useState } from "react"

import GeneralInfo from "../Components/PerfilComponentes/GeneralInfo";
import Portafolio from "../Components/PerfilComponentes/Portafolio";
import ReviewProfile from "../Components/PerfilComponentes/ReviewsPerfil";
import Contacto from "../Components/PerfilComponentes/Contacto";

import { user } from "../Interfaces/user";

import { useNavigate } from '@tanstack/react-router'

function PerfilUser() {
  const hasProfessionalProfile = () => {
    if (user.workInfo?.generalInfo.aboutMe === "") {
      return false;
      
    }
    return true;
  };

  const [pestañaActiva, setPestañaActiva] = useState('Contacto');

  const disponibilidad = user.workInfo?.availability ? 'bg-green-400' : 'bg-red-400';
  const disponibilidadText = user.workInfo?.availability ? 'text-green-300' : 'text-red-300';
  const pestañaActivaClass = 'text-[#3b82f6] border-b-2 border-[#3b82f6]';
  const pestañaInactivaClass = 'text-gray-500 hover:text-gray-800 transition-colors cursor-pointer';
  const stars = '⭐'.repeat(user.workInfo?.rating || 5);

    const isOwner = user.id === "1" ;// Cambiar por userLogged.id cuando se implemente la autenticación


  const navigate = useNavigate()

  return (
    <>

      {hasProfessionalProfile() === false ? (

        <>
          {/* Banner Superior */}
          <section className="bg-[#1d61a1] text-white pt-8 px-4 md:px-12">
            <div className="max-w-7xl mx-auto flex justify-between items-center pb-8">
              <div className="flex items-center gap-4">
                <img
                  src={user.profilePicture || "https://picsum.photos/200"}
                  alt="Perfil"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover bg-gray-300"
                />

                <div>
                  <h1 className="text-2xl font-bold tracking-wide">
                    {user.name}
                  </h1>
                  {isOwner && (
                    <p className="text-blue-200 text-sm">
                      Completa tu perfil para comenzar a ofrecer tus servicios.
                    </p>
                  )}

                  <p className="text-blue-200 text-sm">
                    Miembro de TaskLab desde: {user.created_at}
                  </p>

                </div>
              </div>


              {!isOwner &&(
                
                <div className="flex gap-4 w-full md:w-auto">
                  <button className="flex-1 md:flex-none bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-2 px-6 rounded-lg text-sm shadow-md transition-all">
                    Enviar mensaje
                  </button>
                </div>
              )}
            </div>
          </section>

          {isOwner ? (
            
              <section className="bg-white py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">

                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Aún no has creado tu perfil profesional
                  </h2>

                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Completa tu información para que otros usuarios puedan conocer tus
                    servicios y contratarte.
                  </p>

                  <button className="bg-[#1d61a1] hover:bg-[#1a558f] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all"
                    onClick={() => {
                      setPestañaActiva('Editar Perfil');
                      navigate({ to: '/edit-profile' });
                    }}>
                    Crear perfil profesional
                  </button>

                </div>

              </section>
          
          ) : (
          
          <>
            <div className="max-w-7xl mx-auto py-8">
              <Contacto address={user.address} phone={user.phone} email={user.email} pestañaActiva={pestañaActiva} isOwner={isOwner} />
            </div>
          </>

          )}


        </>

      ) : (
        <>
          {/* Sección del Banner Superior (Fondo azul con datos del trabajador, botones y navegación interna) */}
          <section className="bg-[#1d61a1] text-white pt-8 px-4 md:px-12 relative">
            {/* Contenedor flexible para alinear los datos y los botones a los extremos */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 max-w-7xl mx-auto">

              {/* Datos del Trabajador (Imagen + Textos a la par) */}
              <div className="flex items-center gap-4">
                <img
                  src={user.profilePicture}
                  alt="perfil"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover bg-gray-300"
                />
                <div>
                  <p className="text-2xl font-bold tracking-wide">{user.name}</p>
                  <p className="text-sm text-blue-200 font-medium">{user.workInfo!.profession}</p>
                  <p className="text-sm flex items-center gap-1 my-1 text-amber-400 font-semibold">
                    {stars} <span className="text-white ml-1">{user.workInfo!.rating}</span> <span className="text-blue-200 font-normal text-xs">({user.workInfo!.reviews} recomendaciones)</span>
                  </p>
                  <p className="text-xs text-blue-100">{user.address}</p>
                  <p className={`text-xs flex items-center gap-1.5 mt-1 font-medium ${disponibilidadText}`}>
                    <span className={`w-2.5 h-2.5 rounded-full block animate-pulse ${disponibilidad}`}></span> {user.workInfo!.availability ? 'Disponible' : 'No disponible'}
                  </p>
                </div>
              </div>

              {/* Botones de Acción laterales */}
              <div className="flex gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-2 px-6 rounded-lg text-sm shadow-md transition-all">
                  Enviar mensaje
                </button>
                <button className="flex-1 md:flex-none bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-2 px-8 rounded-lg text-sm shadow-md transition-all"
                  onClick={() => setPestañaActiva('Contacto')}>
                  Contacto
                </button>
              </div>

            </div>

            {/* Menú de pestañas de navegación (Blanco pegado al borde inferior) */}
            <div className="bg-white text-gray-500 font-semibold text-sm -mx-4 md:-mx-12 px-4 md:px-12">
              <div className="mx-auto border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl">
                <ul className="flex gap-8 max-w-7xl list-none justify-center md:justify-start">
                  <li className={pestañaActiva === 'Informacion General' ? `py-4 ${pestañaActivaClass}` : `py-4 ${pestañaInactivaClass}`} onClick={() => setPestañaActiva('Informacion General')}>
                    Informacion General
                  </li>
                  <li className={pestañaActiva === 'Portafolio' ? `py-4 ${pestañaActivaClass}` : `py-4 ${pestañaInactivaClass}`} onClick={() => setPestañaActiva('Portafolio')}>
                    Portafolio
                  </li>
                  <li className={pestañaActiva === 'Opiniones' ? `py-4 ${pestañaActivaClass}` : `py-4 ${pestañaInactivaClass}`} onClick={() => setPestañaActiva('Opiniones')}>
                    Opiniones
                  </li>
                </ul>

                {isOwner && (
                  <button className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-2 px-6 rounded-lg text-sm shadow-md transition-all"
                    onClick={() => navigate({ to: '/edit-profile' })}>
                    Editar Perfil
                  </button>
                )}
              </div>

              <div className="max-w-7xl mx-auto py-8">
                <GeneralInfo generalInfo={user.workInfo!.generalInfo} pestañaActiva={pestañaActiva} />
                <Portafolio portfolioItems={user.workInfo!.portfolio} pestañaActiva={pestañaActiva} />
                <ReviewProfile reviewsProfile={user.workInfo!.reviewsProfile} pestañaActiva={pestañaActiva} />
                <Contacto address={user.address} phone={user.phone} email={user.email} pestañaActiva={pestañaActiva} isOwner={isOwner} />
              </div>

            </div>

          </section>
        </>
      )
      }





    </>

  )
}

export default PerfilUser