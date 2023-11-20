import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import Orden from "../ui/Orden";

const MisOrdenes = () => {
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
         <h2 className=" animate-bounce right-50 text-3xl text-center bg-teal-700 text-white font-bold shadow rounded-xl w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-black-500 shadow-lg shadow-green-700/80"
      >Mis pedidos</h2>
      <br
      >


      </br>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {ordenes.map((orden) => (
            <Orden key={orden.id} orden={orden} />
          ))}
        </div>
        
        <button
  className="animate-bounce bg-transparent p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center float-right"
  onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
>
  <svg
    id="scrollArrow"
    className="w-6 h-6 text-pink-500"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
  </svg>
</button>

      </>
      
    );
  };
  
  export default MisOrdenes;

