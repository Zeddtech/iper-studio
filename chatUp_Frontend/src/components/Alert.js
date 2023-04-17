import React, { useState, useEffect } from "react";

function Alert({ message, duration, closeAlert }) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
      if (closeAlert) {
        closeAlert();
      }
    }, duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [duration, closeAlert]);

  const handleClose = () => {
    setShowAlert(false);
    closeAlert();
  };

  return (
    <>
      {showAlert && (
        <div className="absolute flex -top-20 right-0 left-0 item-center justify-center z-[9999] overflow-hidden animate-slide-in">
          <div className="bg-cyan-300  rounded text-white px-4 py-3 shadow-md ">
            <div className="flex items-center ">
              <span className="font-bold">{message}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Alert;
