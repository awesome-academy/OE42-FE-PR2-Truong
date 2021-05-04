import React, { useState } from "react";
import "./style.sass";

function CustomInput({ innerRef, field, type, icon, ...props }) {
  const [showPass, setShowPass] = useState(false);
  
  return (
    <div className="custom-input-container">
      {type === "password" && (
        <i
          className={`fa ${showPass ? "fa-eye-slash" : "fa-eye"} pass-icon`}
          onClick={() => setShowPass(!showPass)}
        ></i>
      )}
      <input
        ref={innerRef ? innerRef : null}
        type={type === "password" ? (showPass ? "text" : "password") : type}
        autoComplete="off"
        {...field}
        {...props}
      />
      <i className={`fa fa-${icon} main-icon`}></i>
    </div>
  );
}

export default CustomInput;
