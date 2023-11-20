import React from "react";
import { Routes, Route } from "react-router";
import NuevoHelado from "./Components/paginas/NuevoHelado";
import MisOrdenes from "./Components/paginas/MisOrdenes";
import Menu from "./Components/paginas/Menu";
import Sidebar from "./Components/ui/Sidebar";
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
            <Route path="/mis-ordenes" element={<MisOrdenes />} />
            <Route extract path="/menu" element={<Menu />} />
            <Route path="/nuevo-helado" element={<NuevoHelado />} />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}
export default App;