import React from "react";
import "./style.css";


function Card(props) {
    return (
        <div className="card" onClick={() => props.setClicked(props.id)}>
            <div className="img-container">
                <img className="img-fluid" alt={props.name} src={props.image} />
            </div>
        </div>
    );
}

export default Card;