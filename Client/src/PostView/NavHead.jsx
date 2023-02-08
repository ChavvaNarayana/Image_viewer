import React from "react";
import "../Styles/NavHead.css"
import { Link } from "react-router-dom";

export default function NavHead() {
    return (
        <div className="Nav">
            <p className="logo"><img src={require('../Svg/circle-oval-svgrepo-com.svg').default} alt="" />ImageViewer</p>
            <div className="Camicon"><Link to="/uploadview" ><img className="Cam" src={require('../Svg/camera-svgrepo-com.svg').default} alt="" /></Link></div>
        </div>
    )
}