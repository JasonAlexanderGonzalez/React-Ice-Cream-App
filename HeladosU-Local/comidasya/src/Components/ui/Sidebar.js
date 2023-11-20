import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiCheck } from 'react-icons/bi';


import {
  HiOutlineClipboardCheck,
  HiOutlineMenuAlt2,
  HiOutlineClock,
  HiOutlineMenu,
} from "react-icons/hi";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="md:w-2/6 xl:w-1/5 ">
      {sidebarOpen && (
        <div className="fixed top-0 left-0  bg-blue-100 w-64 h-screen flex flex-col shadow-lg shadow-black">
          <div className="p-6">
            <p className="uppercase text-white text-4xl tracking-wide text-center font-bold bg-blue-500 rounded-xl animate-pulse">
              ¡HELADOS FRESCOS!
            </p>
            <p className="mt-3 text-black text-lg font-bold">
              Elige entre las siguientes opciones:
            </p>
            <nav className="mt-10">
              <NavLink
                className="p-1 flex items-center text-black block hover:bg-blue-300 hover:text-black rounded-xl text-lg font-bold"
                activeclassname="text-black"
                exact={true}
                to="/"
                onClick={toggleSidebar}
              >
                <HiOutlineClipboardCheck className="mr-2" />
                Ordenes
              </NavLink>
              <NavLink
                className="p-1 flex items-center text-black block hover:bg-blue-300 hover:text-black rounded-xl text-lg font-bold"
                activeclasscame="text-black"
                exact={true}
                to="/menu"
                onClick={toggleSidebar}
              >
                <HiOutlineMenuAlt2 className="mr-2" />
                Menú
              </NavLink>

              <NavLink
                className="p-1 flex items-center text-black block hover:bg-blue-300 hover:text-black rounded-xl text-lg font-bold"
                activeclassname="text-white"
                exact="true"
                to="/preparacion"
              >
                <HiOutlineClock className="mr-2" />
                En preparación
              </NavLink>

              <NavLink
                className="p-1 flex items-center text-black block hover:bg-blue-300 hover:text-black rounded-xl text-lg font-bold"
                activeclasscame="text-white"
                exact={true}
                to="/preparados"
              >
                <span className="mr-2">
                  <BiCheck />
                </span>
                Preparados
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto flex justify-center items-center">
            <img src="lo.png" alt="Logo" className="w-90 h-90" />
          </div>
        </div>
      )}
      {!sidebarOpen && (
        <button
          className="bg-red-300 text-white p-2 rounded-md fixed top-1 left-1 z-5"
          onClick={toggleSidebar}
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
