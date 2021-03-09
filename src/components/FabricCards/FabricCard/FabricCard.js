import React from 'react';
import './FabricCard.css';


const FabricCard = (props) => {

        return (
            <div className="FabricCard" onClick={() => props.ordering(props.id)}>
                <img className="FabricImg" src={props.img} alt={props.id} />
                <p className="FabricDescription">{props.description}</p>
                <span className="FabricMoreColours">{props.colors.length} more colors</span>
            </div>
        );
    
}

export default FabricCard;
