import React  from "react";

export const Alert = (props) => {
    const {alert} = props
  return (
    <div>
      <div className={`alert alert-${alert.type}`} role="alert">
        {alert.msg}
      </div>
    </div>
  );
};
