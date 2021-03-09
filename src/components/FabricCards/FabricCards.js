import React from 'react';
import FabricCard from './FabricCard/FabricCard';
import { fabricCards, } from '../../utility/dummyData';
import './FabricCards.css';

const FabricCards = (props) => {

        let cards = fabricCards.map(
            (card) => <FabricCard key={card.id} {...card} ordering={props.ordering}/>
        );
        return (
            <div className="FabricCards">
                {cards}
            </div>
        );
}

export default FabricCards;