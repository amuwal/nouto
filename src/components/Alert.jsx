import React  from "react";

export const Alert = (props) => {
    const {alert} = props
  return (
    <div className="justify-content-center">
      <div className={`alert alert-${alert.type}`} role="alert">
        {alert.msg}
      </div>
    </div>
  );
};
