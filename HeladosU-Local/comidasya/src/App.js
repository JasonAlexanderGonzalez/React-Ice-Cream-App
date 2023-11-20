import React from "react";
import { Routes, Route } from "react-router";
import NuevoPlatillo from "./Components/paginas/NuevoPlatillo";
import Ordenes from "./Components/paginas/Ordenes";
import Menu from "./Components/paginas/Menu";
import Sidebar from "./Components/ui/Sidebar";
import Preparacion from "./Components/paginas/Preparacion";
import Preparados from "./Components/paginas/Preparados";

import firebaseInstance, { FirebaseContext } from './firebase';

function App() {
  return (
    <FirebaseContext.Provider
      value={{
        firebaseInstance,
      }}
    >
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="md:w-2/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Ordenes />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/nuevo-platillo" element={<NuevoPlatillo />} />
            <Route path="/preparacion" element={<Preparacion />} />
            <Route path="/preparados" element={<Preparados />} />



          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}
export default App;
