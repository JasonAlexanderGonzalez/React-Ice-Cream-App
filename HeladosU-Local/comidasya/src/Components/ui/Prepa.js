import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { FaCheck } from "react-icons/fa";

// Importa el sonido de aceptar
import acceptSound from "../sounds/accept.mp3";

const Orden = ({ orden }) => {
  const { firebaseInstance } = useContext(FirebaseContext);
  const { id, nombre, imagen, total, estado, heladoId } = orden;
  const [helado, setHelado] = useState(null);
  const [aceptado, setAceptado] = useState(false);
  const [rechazado, setRechazado] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState("");

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

  if (!helado || orden.estado !== 2) {
    return null;
  }

  // Función para reproducir el sonido de aceptar
  const reproducirSonido = () => {
    const audio = new Audio(acceptSound);
    audio.play();
  };

  const establecerPedido = async (nuevoEstado) => {
    try {
      let estadoNum;

      if (nuevoEstado) {
        Swal.fire("Pedido Preparado", "", "success");
        estadoNum = 3;
        setAceptado(true);
        setRechazado(false);
        setMotivoRechazo("");
      } else {
        console.log("nada");
      }

      await firebaseInstance.db.collection("ordenes").doc(id).update({
        estado: estadoNum,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // let estadoLec='En preparación';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md shadow-teal-400 flex flex-col border-teal-400 border">
      <img
        src={helado.imagen}
        alt="imagen platillo"
        className="w-626 h-200 object-cover mb-4 bg-pink-700 shadow-lg shadow-pink-700/70"
      />
      <div className="flex items-center mb-2">
        <h2 className="ml-1 text-xl font-semibold">{helado.nombre}</h2>
      </div>
      <div className="flex-grow bg-white p-4 rounded-lg shadow-md mb-3">
        <p className="text-gray-600 mb-2">{helado.descripcion}</p>
        <p className="text-gray-700 font-bold mb-2">
          Cantidad: {orden.cantidad}
        </p>
        <p className="text-gray-700 font-bold mb-2">Total: ₡ {orden.total}</p>

        <div className="block mt-5">
          <p className="block text-gray-800 text-center mb-2 font-bold bg-yellow-200 border-l-4 border-yellow-600">En preparación</p>
          <button
            className={`bg-green-500 shadow-md shadow-black hover:bg-green-400 text-white font-bold shadow rounded-xl py-3 px-6 leading-tight focus:outline-none focus:shadow-outline mr-3 ml-12
            ${
              rechazado && "bg-gray-500 cursor-not-allowed"
            }`}
            onClick={() => {
              establecerPedido(true);
              reproducirSonido(); // Reproduce el sonido al hacer clic en el botón
            }}
            disabled={rechazado}
          >
            <FaCheck className="inline-block mr-2" />
            {/* Listo */}
          </button>
        </div>

        {aceptado && <p className="text-green-500 mt-2">Orden Preparada</p>}
      </div>
    </div>
  );
};

export default Orden;
