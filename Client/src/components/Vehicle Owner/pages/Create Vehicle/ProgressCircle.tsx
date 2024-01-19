import React from "react";
const ProgressCircle = ({ outerclass,classname, children }) => {
    return (
        <div className={outerclass}><div className={classname}>0{children}</div></div>
    )
}

export default ProgressCircle;
