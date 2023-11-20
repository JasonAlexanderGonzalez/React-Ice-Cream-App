import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import Orden from "../ui/Prepara";
import { FaCheck } from "react-icons/fa";



const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const { firebaseInstance } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerOrdenes = () => {
      firebaseInstance.db.collection("ordenes").onSnapshot((snapshot) => {
        const ordenes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrdenes(ordenes);
      });
    };

    obtenerOrdenes();
  }, [firebaseInstance.db]);

  console.log(ordenes);

  return (
    <>
    <div>
    <h1 className="uppercase text-white text-4xl tracking-wide text-center font-bold bg-orange-300 rounded-xl animate-bounce m-10 shadow-lg shadow-teal-700 ">
    <FaCheck className="inline-block mr-2 text-green-500" />
        Preparados</h1>
 
    </div>
      {/* {<h1 className="text-3xl font-light mb-4">En Preparacion</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          ordenes.map((orden) => (
            <Orden key={orden.id} orden={orden} />
          ))
        }
      </div>
    </>
  );
};

export default Ordenes;
