import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../firebase";
//Importamos el platillo para tener acceso a sus datos
import Platillo from "../ui/Platillo";
import { FaBars , FaPlus } from "react-icons/fa";

const Menu = () => {
  const [platillos, guadarPlatillos] = useState([]);
  const { firebaseInstance } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerPlatillos = () => {
      firebaseInstance.db.collection("productos").onSnapshot(manejarSnapshot);
    };
    obtenerPlatillos();
  }, [firebaseInstance.db]);
  // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
  function manejarSnapshot(snapshot) {
    const platillos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    // almacenar los resultados en el state
    guadarPlatillos(platillos);
  }

  return (
    <>

      <h1 className="uppercase text-white text-4xl tracking-wide text-center font-bold bg-red-300 rounded-xl animate-bounce m-10 shadow-lg shadow-teal-400 ">
      <FaBars className="inline-block mr-2" />
        Menú
      </h1>

      <Link
        to="/nuevo-platillo"
        className=" bg-purple-400 rounded-xl shadow-md shadow-black hover:bg-blue-800, inline-block mb-5 p-2 
    text-white uppercase font-bold"
      >
        <FaPlus className="inline-block mr-2" />
        Agregar Platillo
      </Link>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

      {platillos.map((platillo) => (
        <Platillo key={platillo.id} platillo={platillo} />
      ))}
      </div>
    </>
  );
};
export default Menu;
