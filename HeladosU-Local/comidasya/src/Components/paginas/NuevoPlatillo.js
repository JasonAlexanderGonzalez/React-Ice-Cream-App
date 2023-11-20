import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router";
import firebaseInstance from "../../firebase/firebase";
import botonSound from "../sounds/boton.mp3";


const NuevoPlatillo = () => {
  const { FirebaseInstance } = useContext(FirebaseContext);
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState("");
  const navigate = useNavigate();
  const [reproduciendoSonido, setReproduciendoSonido] = useState(false);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      imagen: "",
      descripcion: "",
    },

    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "Los Platillos deben de tener al menos 3 carateres")
        .required("El nombre del platillo es obligatorio"),

      precio: Yup.number()
        .min(1, "Debes agregar un numero")
        .required("El precio es obligatorio"),

      descripcion: Yup.string()
        .min(10, "La descrcipcion")
        .required("La descripcion es obligatoria"),
    }),
    onSubmit: (platillo) => {
      try {
        platillo.existencia = true;
        platillo.imagen = urlimagen;
        firebaseInstance.db.collection("productos").add(platillo);
        // Redireccionar al guardar hacia el menú
        navigate("/menu");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleUploadFile = async (event) => {
    const file = event.target.files[0];
    const storageRef = firebaseInstance.storage.ref("productos");
    const fileRef = storageRef.child(file.name);
    try {
      guardarSubiendo(true);
      const uploadTask = fileRef.put(file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        guardarProgreso(progress);
      });
      await uploadTask;
      guardarSubiendo(false);
      const downloadURL = await fileRef.getDownloadURL();
      guardarUrlImagen(downloadURL);
    } catch (error) {
      console.log(error);
      guardarSubiendo(false);
    }
  };

  const reproducirSonido = () => {
    const audio = new Audio(botonSound);
    audio.play();
  };

  useEffect(() => {
    if (reproduciendoSonido) {
      reproducirSonido();
      setReproduciendoSonido(false);
    }
  }, [reproduciendoSonido]);

  return (
    <>
      <h1 className="uppercase text-white text-4xl tracking-wide text-center font-bold bg-red-300 rounded-xl animate-bounce m-10 shadow-lg shadow-teal-400">
        Agregar Platillo
      </h1>
      <div className="flex justify-center mt-10 bg-purple-200 shadow-xl shadow-black rounded-xl">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2 text-lg"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow-sm shadow-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Nombre Platillo"
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                className="shadow-sm shadow-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="precio"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                placeholder="₡2000"
                min="0"
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2 text-lg"
                htmlFor="imagen"
              >
                Imagen
              </label>

              <input
                className="shadow-sm shadow-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                id="imagen"
                name="imagen"
                type="file"
                onChange={handleUploadFile}
              />
            </div>
            {subiendo && (
              <div className="h-12 relative w-full border text-lg">
                <div
                  className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                  style={{ width: `${progreso}%` }}
                >
                  {progreso}%
                </div>
              </div>
            )}

            {urlimagen && (
              <p className="bg-green-500 text-white p-3 text-center my-5 text-lg">
                La imagen se subió correctamente
              </p>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="descripcion"
              >
                Descripción
              </label>
              <textarea
                className="  shadow-sm shadow-black border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                name="descripcion"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Descripción del Platillo"
              ></textarea>
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error:</p>
                <p>{formik.errors.descripcion} </p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-purple-400 hover:bg-purple-500 text-white w-40 ml-20 mt-4 mb-8 py-2 px-2 uppercase font-bold text-sm border-2 border-purple-500 rounded-lg shadow-lg shadow-purple-500 relative top-[-3px] right-[-230px]"
              value="Guardar Platillo"
              onClick={() => setReproduciendoSonido(true)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoPlatillo;
