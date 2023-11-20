import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useFormik } from "formik";
import soundFile1 from '../../assets/Sonido/Pedido.mp3';
import soundFile2 from '../../assets/Sonido/rechazado.mp3';

const Orden = ({ orden }) => {
  const { firebaseInstance } = useContext(FirebaseContext);
  const { id, nombre, imagen, total, estado, heladoId } = orden;
  const [helado, setHelado] = useState(null);
  
  const audio1 = new Audio(soundFile1);
  const audio2 = new Audio(soundFile2);

  useEffect(() => {
    const obtenerHelado = async () => {
      try {
        const doc = await firebaseInstance.db
          .collection("productos")
          .doc(heladoId)
          .get();

        if (doc.exists) {
          setHelado({
            id: doc.id,
            ...doc.data(),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerHelado();
  }, [firebaseInstance.db, heladoId]);

  /*useEffect(() => {
    if (orden.estado === 3) {
      audio1.play();
    }
  }, [orden.estado]);*/

  useEffect(() => {
    if (orden.estado === 4) {
      audio2.play();
    }
  }, [orden.estado]);

  if (!helado) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col bg-gradient-to-r from-green-200 to-purple-200">
      <img
        src={helado.imagen}
        alt="imagen helado"
        className="w-626 h-200 object-cover mb-4 rounded-xl"
      />
      <div className="flex items-center mb-2">
        <h2 className="ml-1 text-xl font-semibold">{helado.nombre}</h2>
      </div>
      <div className="flex-grow bg-white p-4 rounded-lg shadow-md mb-3 shadow-lg shadow-green-700/80">
        <p className="text-gray-600 mb-2">{helado.descripcion}</p>
        <p className="text-gray-700 font-bold mb-2">
          Cantidad: {orden.cantidad}
        </p>
        <p className="text-gray-700 font-bold mb-2">Total: ₡ {orden.total}</p>
        {orden.estado === 1 && (
          <><span className=" top-3 right-7 mt-3">
            <span className="animate-ping inline-block h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500 shadow-lg shadow-purple-700/70"></span>
            </span>
          </span><span className="text-purple-500 font-bold text-center">
              Pendiente
            </span></>
        )}
        {orden.estado === 2 && (
  <div>
    <span className="text-blue-500 font-bold text-center">
      En preparación...
    </span>
    <span className="top-3 right-7 mt-3">
      <span className="animate-ping inline-block h-3 w-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-lg shadow-blue-700/70"></span>
      </span>
    </span>
  </div>
)}
{orden.estado === 3 && (
  <div>
    <span className="text-green-500 font-bold text-center">
      Entregado
    </span>
    <span className="top-3 right-7 mt-3">
      <span className="animate-ping inline-block h-3 w-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-lg shadow-green-700/70"></span>
      </span>
    </span>
  </div>
)}

{orden.estado === 4 && (
  <div>
    <span className="text-red-500 font-bold text-center">
      Rechazado
    </span>
    <span className="top-3 right-7 mt-3">
      <span className="animate-ping inline-block h-3 w-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-lg shadow-red-700/70"></span>
      </span>
    </span>
  </div>
)}
      </div>
    </div>
  );
};

export default Orden;
