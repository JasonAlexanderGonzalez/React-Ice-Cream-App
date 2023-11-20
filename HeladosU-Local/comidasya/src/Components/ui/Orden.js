import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Howl } from "howler";
import acceptSound from "../sounds/accept.mp3";
import rejectSound from "../sounds/reject.mp3";
import { FaCheck,  FaTimes  } from "react-icons/fa";


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

  if (!helado || orden.estado !== 1) {
    return null;
  }

  const acceptAudio = new Howl({ src: [acceptSound] });
  const rejectAudio = new Howl({ src: [rejectSound] });

  const reproducirSonido = (audio) => {
    audio.play();
  };

  const establecerPedido = async (nuevoEstado) => {
    try {
      let estadoNum;

      if (nuevoEstado) {
        Swal.fire("Pedido aceptado", "", "success");
        estadoNum = 2;
        setAceptado(true);
        setRechazado(false);
        setMotivoRechazo("");
        reproducirSonido(acceptAudio);
      } else {
        const { value: motivo } = await Swal.mixin({
          input: "select",
          inputOptions: {
            tiempo: "Por tiempo",
            distancia: "Por distancia",
            fuerzaMayor: "Fuerza mayor",
            hora: "Hora",
          },
          inputPlaceholder: "Seleccione un motivo de rechazo",
          showCancelButton: true,
          confirmButtonText: "Rechazar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
          inputValidator: (value) => {
            if (!value) {
              return "Debe seleccionar un motivo de rechazo";
            }
          },
        }).fire("Motivo de rechazo", "", "question");

        if (motivo) {
          Swal.fire("Orden rechazada", `Motivo: ${motivo}`, "error");
          estadoNum = 4;
          setAceptado(false);
          setRechazado(true);
          setMotivoRechazo(motivo);
          reproducirSonido(rejectAudio);
        } else {
          return; // Si no se selecciona un motivo, no se realiza ninguna acción
        }
      }

      await firebaseInstance.db.collection("ordenes").doc(id).update({
        estado: estadoNum,
      });
    } catch (error) {
      console.log(error);
    }
  };

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

        <div className="block mt-5 ">
  <span className="block text-gray-800 mb-3 text-center font-bold bg-purple-300 border-l-4 border-purple-600">Estado</span>
  <div className="flex justify-between">
    <button
      className={`bg-green-500 hover:bg-green-400 shadow-md shadow-black text-white font-bold shadow rounded-xl w-full py-2 px-4 leading-tight focus:outline-none focus:shadow-outline mr-2 ml-2
      ${rechazado && "bg-gray-500 cursor-not-allowed"}`}
      onClick={() => establecerPedido(true)}
      disabled={rechazado}
    >
      <FaCheck className="inline-block mr-2" />
      {/* Aceptar */}
    </button>
    <button
      className={`bg-red-500 hover:bg-red-400 shadow-md shadow-black text-white font-bold shadow rounded-xl w-full py-2 px-4 leading-tight focus:outline-none focus:shadow-outline ml-5 mr-3 
      ${aceptado && "bg-gray-500 cursor-not-allowed"}`}
      onClick={() => establecerPedido(false)}
      disabled={aceptado}
    >
      <FaTimes className="inline-block mr-2" />
      {/* Rechazar */}
    </button>
  </div>
</div>
</div>
  
          {aceptado && <p className="text-green-500 mt-2">Orden aceptada</p>}
          {rechazado && (
            <p className="text-red-500 mt-2">
              Orden rechazada.Motivo:{" "}
              <span className="font-bold">{motivoRechazo}</span>
            </p>
          )}
        </div>
  );
};

export default Orden;
