import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useFormik } from "formik";
import soundFile from '../../assets/Sonido/Pedido.mp3';

const Helado = ({ helado }) => {
  const { firebaseInstance } = useContext(FirebaseContext);
  const { id, nombre, imagen, existencia, precio, descripcion } = helado;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const audio = new Audio(soundFile);

  const openModal = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      cantidad: 1,
    },
    onSubmit: (values) => {
      const { cantidad } = values;
      const total = cantidad * precio;

      const orden = {
        cantidad,
        precio,
        heladoId: id,
        total,
        fecha: new Date(),
        estado: 1, // 1: pendiente, 2: Aceptado-En preparacion, 3: entreagdo, 4: Rechazado
      };

      try {
        firebaseInstance.db.collection("ordenes").add(orden);
        navigate("/mis-ordenes");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex">
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col shadow bg-white-700 shadow-lg shadow-purple-700/70 bg-gradient-to-r from-purple-200 to-green-200">
        <img
          src={imagen}
          alt="imagen helado"
          className="w-626 h-200 object-cover mb-4 bg-cyan-700 shadow-lg shadow-pink-700/70"
        />
        <div className="flex items-center mb-2 ">
          <h2 className="ml-1 text-xl font-semibold">{nombre}</h2>
        </div>
        <div className="flex-grow bg-white p-4 rounded-lg shadow-md mb-3 shadow-lg shadow-purple-700/70">
          <p className="text-gray-600 mb-2">{descripcion}</p>
          <p className="text-gray-700 font-bold mb-2">Precio: ₡ {precio}</p>
          {existencia ? (
            <span className="text-green-500 font-bold text-center">
              Disponible
            </span>
          ) : (
            <span className="text-red-500 font-bold">No disponible</span>
          )}
        </div>
        <div className="mt-auto ">
          <button
            className="bg-purple-400 text-white font-bold shadow rounded-xl w-full py-3 px-3 leading-tight  focus:outline-none focus:shadow-outline bg-black-500 shadow-lg shadow-cyan-700/70"
            onClick={openModal}
          >
            Ver
            <span className=" top-3 right-7 mt-3">
              <span className="animate-ping inline-block h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500 shadow-lg shadow-pink-700/70"></span>
              </span>
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} style={{ zIndex: 9999 }}>
          <div className="bg-gradient-to-r from-green-200 to-purple-200 rounded-lg p-4 shadow-md shadow-lg" style={{ width: "500px" }}>
            <div className="flex justify-center  shadow-lg shadow-teal-700/70">
              <img
                src={imagen}
                alt="imagen helado"
                style={{ maxHeight: "200px", width: "300px" }}
                className="object-contain mb-4"
              />
            </div>
            <br />
            <div className="bg-white p-4 rounded-lg shadow-md shadow-lg shadow-yellow-700/70">
              <h2 className="text-xl text-left font-semibold mb-2">{nombre}</h2>
              <p className="text-gray-600 mb-2">{descripcion}</p>
              <p className="text-gray-700 font-bold mb-2">Precio: ₡ {precio}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mt-5 text-center shadow-lg shadow-cyan-700/70">
              <label className="text-gray-700 font-bold mb-2">Cantidad:</label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-lg shadow-pink-700/70">
                <input
                  type="number"
                  min="1"
                  max="20"
                  name="cantidad"
                  value={formik.values.cantidad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="outline-none text-gray-700 py-2 px-3 flex-grow"
                />
              </div>
              <label className="text-gray-700 font-bold mt-3">Total:</label>
              <div className="flex border border-gray-300 rounded-md overflow-hidden ml-3 mr-3 shadow-lg shadow-purple-700/70">
                <input
                  type="number"
                  readOnly
                  value={formik.values.cantidad * precio}
                  className="outline-none text-gray-700 py-2 px-3 flex-grow"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-5 relative">
              <button
                type="button"
                className="relative bg-green-400 mr-2 text-white font-bold shadow rounded-xl py-3 px-3 focus:outline-none focus:shadow-outline shadow-lg shadow-green-700/70"
                onClick={() => {
                  audio.play();
                  formik.handleSubmit();
                }}
              >
                Ordenar
              </button>
              <button
                className="bg-red-400 ml-2 text-white font-bold shadow rounded-xl py-3 px-3 focus:outline-none focus:shadow-outline"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Helado;
