import React from 'react'
import { Link } from "react-router-dom";
import "../Styles/Dashboard.css";

function Dashboard() {
    return (
        <div className="LandingPage">
            <div className="Img">
                <img src={require("../images/Home.jpg")} alt="1" />
            </div>

            <div className="Title">
                <div className="title">
                    <h1>Welcome to  ImageViewer</h1>
                </div>
                <Link to="/postview">
                    <div className="button">Enter</div>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard