import React from 'react';
import './SmallLoader.css'

 const ComponentLoader = () => {
    return (
        <div className="col-md-12 col-xs-12" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

        <div className="small" style={{clear : "both"}}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        </div>
    );
}

export default ComponentLoader;

