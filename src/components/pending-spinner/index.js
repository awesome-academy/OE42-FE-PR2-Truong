import React, { useEffect } from "react";
import "./style.sass";

function PendingSpinner(props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <div className="spinner-container">
      <i className="fa fa-spinner"></i>
    </div>
  );
}

export default PendingSpinner;
