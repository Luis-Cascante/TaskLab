import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import TaskCardV2 from "../Components/TaskCardV2"
import { useState } from 'react';
import type { task } from "./PruebasTaskData"

type MainHubProps = {
  onPublish?: () => void
  onListTasks?: () => void
  onOpenTask?: () => void
  Tasks : task[]
}

function MainHub({ onPublish, onListTasks, onOpenTask, Tasks }: MainHubProps) {

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <div>
      <section className="bg-[#111e38] text-[#E4E4E4] text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Bienvenido a <span className="text-[#f59e0b]">TaskLab</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-[#cbd5e1] max-w-2xl mx-auto">
          Una plataforma construida por y para el pueblo
        </h2>
      </section>

      <section className="bg-[#E4E4E4] text-[#1e293b] mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-2 items-start">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="flex items-center text-center max-w-md mx-auto">
            <img src="src/assets/img/hands.png" alt="solicitud" className="w-12 h-16 mb-4 object-contain" />
            <h3 className="text-4xl font-bold text-[#f59e0b] mb-3">¿Necesitas un mano?</h3>
          </div>
          <h4 className="text-base text-[#64748b] leading-relaxed mb-6 min-h-[48px]">
            Publica tu solicitud de trabajo y recibe ayuda rápida y confiable
          </h4>
          <button 
          onClick={onPublish}
          className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all w-full sm:w-auto">
            Publicar solicitud →
          </button>
        </div>

        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <div className="flex items-center text-center max-w-md mx-auto">
            <img src="src/assets/img/pala.png" alt="pala" className="w-10 h-16 mb-4 object-contain" />
            <h3 className="text-4xl font-bold text-[#f59e0b] mb-3">¿Buscando trabajo?</h3>
          </div>
          <h4 className="text-base text-[#64748b] leading-relaxed mb-6 min-h-[48px]">
            Explora las mejores oportunidades de trabajo publicadas cerca de ti
          </h4>
          <button 
          onClick={onListTasks}
          className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all w-full sm:w-auto">
            Ver trabajos →
          </button>
        </div>
      </section>

      <section className="bg-[#111e38] text-white text-center py-16 px-4">
        <h2 className="text-3xl font-bold mb-10">Mira estas solicitudes</h2>
  
        <div className="
          flex 
          overflow-x-auto 
          scroll-smooth 
          snap-x 
          snap-mandatory 
          gap-6 
          max-w-6xl 
          mx-auto 
          p-4
          bg-transparent 
          rounded-xl 
          /*scrollbar-none*/
        ">
          <Swiper
            className="flex gap-3 overflow-x-auto w-full pb-2"
            slidesPerView={3}
            loop={false}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
          >
            {Tasks.map((task) => (
              <SwiperSlide key={task.id} className="snap-start">
                <TaskCardV2 task={task} onOpenTask={onOpenTask}/>
              </SwiperSlide>
            ))}
              
            </Swiper>

        </div>
      </section>
    </div>
  )
}

export default MainHub