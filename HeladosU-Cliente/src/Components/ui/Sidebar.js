import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineClipboardCheck, HiOutlineMenuAlt2, HiOutlineMenu } from "react-icons/hi";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`md:w-2/6 xl:w-1/5 ${sidebarOpen ? 'bg-gradient-to-r from-cyan-200 to-green-200 shadow-pink-700/70 shadow-lg shadow-black' : 'bg-white'} min-h-screen overflow-y-hidden flex flex-col`}>
      {sidebarOpen && (
        <>
          <div className="mt-auto flex justify-center items-center">
            <img src="logoUs.png" alt="Logo" className="w-90 h-90" />
          </div>

          <div className="p-4 flex-grow">
            <p className="text-black text-lg font-bold">
              Realizá tus pedidos aquí:
            </p>
            <nav className="mt-10">
              <NavLink
                className="p-1 flex items-center text-black block hover:bg-gradient-to-r from-violet-10 to-pink-10 hover:text-black rounded-xl text-lg font-bold"
                activeclassname="text-black"
                exact={true}
                to="/mis-ordenes"
                onClick={toggleSidebar}
              >
                <span className=" top-3 right-7 mt-3">
  <span className="animate-ping inline-block h-3 w-3">
    <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>

  </span>
</span>
                <HiOutlineClipboardCheck className="mr-2" />
                Mis pedidos
              </NavLink>
              <NavLink
                className="p-1 flex items-center text-black block hover:bg-gradient-to-r from-violet-10 to-pink-10 hover:text-black rounded-xl text-lg font-bold"
                activeclassname="text-black"
                exact={true}
                to="/menu"
                onClick={toggleSidebar}
              >
                <span className=" top-3 right-7 mt-3">
  <span className="animate-ping inline-block h-3 w-3">
    <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
   
  </span>
</span>
                <HiOutlineMenuAlt2 className="mr-2" />
                Menú
              </NavLink>
            </nav>
          </div>

          

          <div className="uppercase text-white text-4xl tracking-wide text-center font-bold bg-teal-500 rounded-xl animate-pulse">
            HELADOS FRESCOS!
          </div>
        </>
      )}


      {!sidebarOpen && (
        <button
          className="bg-teal-400 text-white p-2 rounded-md fixed top-1 left-1 z-5"
          onClick={toggleSidebar}
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
      )}

      {/* Estilo para el contenido principal */}
      <style>
        {`
          .main-content {
            position: relative;
            z-index: ${sidebarOpen ? '1' : '2'}; /* Ajusta el índice z según sea necesario */
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;






