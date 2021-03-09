import React, { Component } from 'react';

import { fabricCards, } from '../../utility/dummyData';
import './Order.css';

import OrderForm from './OrderForm/OrderForm';
// import { fabricCards, } from '../../utility/dummyData';

class Order extends Component {

    render() {
        
        return (
            <div className="OrderContainer">
                <div className="OrderHeader">
                    <h4 className="OrderHeading">Material Details</h4>
                    <span className="Cross" onClick={this.props.orderCancel}>X</span>
                </div>
                <div className="OrderContents">
                    <img className="MaterialImg" src={fabricCards[1].img} alt={fabricCards[1].id} />
                    <OrderForm backBtn={this.props.orderCancel}/>
                </div>
            </div>
        );
    }
}

export default Order;