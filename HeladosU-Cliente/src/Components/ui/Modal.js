
import React, { useEffect, useRef } from "react";
import "../../assets/modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden"; // Evita el desplazamiento de la página cuando el modal está abierto
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "auto"; // Restaura el desplazamiento de la página cuando el modal se cierra
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "auto"; // Asegura que el estilo de desplazamiento se restaure incluso si el componente se desmonta antes de cerrar el modal
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal-overlay fixed">
      <div className="relative modal-content" ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
