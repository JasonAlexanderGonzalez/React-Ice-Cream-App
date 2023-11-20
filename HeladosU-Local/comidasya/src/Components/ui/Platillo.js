import React, { useContext, useRef, useState } from "react";
import { FirebaseContext } from "../../firebase";

const Platillo = ({ platillo }) => {
  const existenciaRef = useRef(platillo.existencia);
  const { firebaseInstance } = useContext(FirebaseContext);
  const { id, nombre, imagen, existencia, categoria, precio, descripcion } =
    platillo;

  const actualizarDisponibilidad = () => {
    const existencia = existenciaRef.current.value === "true";
    try {
      firebaseInstance.db.collection("productos").doc(id).update({
        existencia,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
<div className="mt-1 mb-8 bg-white p-4 rounded-lg shadow-md shadow-teal-400 flex flex-col border-teal-400 border">
      <img
        src={imagen}
        alt="imagen platillo"
        className="w-626 h-100 object-cover mb-4 bg-pink-700 shadow-lg shadow-pink-700/70"
      />
      <div className="flex items-center mb-2">
        <h2 className=" ml-1 text-xl font-semibold">{nombre}</h2>
      </div>
      <div className="flex-grow bg-white p-4 rounded-lg shadow-md ">
        <p className="text-gray-600 mb-2">{descripcion}</p>
        <p className="text-gray-700 font-bold mb-2">Precio: ₡ {precio}</p>
      </div>
      <div className="sm:flex sm:-mx-2 pl-2 mb">
  <label className="block">
    <span className="block text-gray-800 mb-2 ">Existencia</span>
    <select
      className="flex shadow-sm shadow-black bg-purple-300 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      value={existencia}
      ref={existenciaRef}
      onChange={() => actualizarDisponibilidad()}
    >
      <option value="true">Disponible</option>
      <option value="false">No Disponible</option>
    </select>
  </label>
</div>

    </div>
  );
};

export default Platillo;
