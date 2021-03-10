import React, { Component } from 'react';
import './OrderForm.css';

import { designSelections } from '../../../utility/dummyData';

class OrderForm extends Component {
    state = {
        factory: "",
        assignDesign: {
            id: "",
            name: "",
            visible: false,
        },
        quantity: "",
        inventory: 1650,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            factory: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'Amaya Creations', displayValue: 'Amaya Creations' },
                        { value: 'Surya Textiles', displayValue: 'Surya Textiles' },
                    ]
                },
                value: 'Select factory',
                validation: {},
                valid: true,

            },
        },
        formIsValid: false,
        goNext: false,
        goBack: false,
    }

    checkValidity = () => {
        let isValid = true;
        isValid = this.state.factory !== "" && isValid;
        isValid = this.state.assignDesign.id !== "" && isValid;
        isValid = this.state.assignDesign.name !== "" && isValid;
        isValid = this.state.quantity !== "" && isValid;
        console.log(this.state.quantity !== "" && isValid);
        isValid = parseInt(this.state.quantity) > 0 && parseInt(this.state.quantity) <= this.state.inventory && isValid;
        console.log(parseInt(this.state.quantity) > 0 && parseInt(this.state.quantity) <= this.state.inventory && isValid);

        this.setState({ formIsValid: isValid });
    }

    DesignsInputClickhandler = () => {
        this.setState({ assignDesign: { ...this.state.assignDesign, visible: !this.state.assignDesign.visible } });
    }

    selectFactoryHandler = async (event) => {
        await this.setState((prevState) => ({ factory: event.target.value }));
        this.checkValidity();
    }

    selectDesignHandler = (id, name) => {
        this.setState({
            assignDesign: {
                ...this.state.assignDesign,
                id: id,
                name: name,
                visible: !this.state.assignDesign.visible,
            }
        });
        this.checkValidity();
    }

    quantityHandler = async (event) => {
        await this.setState((prevState) => ({ quantity: event.target.value }));
        this.checkValidity();
    }

    orderHandler = (event) => {
        event.preventDefault();
    }

    nextHandler = () => {
        this.setState({ goNext: true, goBack: true });
    }
    goBackHandler = () => {
        this.setState({ goNext: false, goBack: false });
    }


    render() {
        let summary = (
            <div className="Summary">
                <h4>
                    <i class="material-icons error_outline">error_outline</i>
                    You won't be able to change the details later!
                </h4>
                <ul>
                    <li>
                        <label>Factory</label>
                        <span>{this.state.factory}</span>
                    </li>
                    <li>
                        <label>Assign for design</label>
                        <span>{this.state.assignDesign.name}</span>
                    </li>
                    <li>
                        <label>Assign quantity</label>
                        <span>{this.state.quantity} meter</span>
                    </li>
                    <li>
                        <label>Challan</label>
                        <span style={{ background: '#F2F2F2', padding: '4px' }}>File_name_comes_here.pdf</span>
                    </li>
                </ul>
            </div>
        )
        let form = (
            <form onSubmit={this.orderHandler}>
                <label className="FormLabel">Factory*</label>
                <select required onChange={this.selectFactoryHandler}>
                    <option value="">Select factory</option>
                    <option key='Amaya Creations' value='Amaya Creations'>Amaya Creations</option>
                    <option key='Surya Textiles' value='Surya Textiles'>Surya Textiles</option>
                </select>
                <label className="FormLabel">Assign for design*</label>
                <input type="text" required onClick={this.DesignsInputClickhandler} placeholder="Search by Name or Design ID" value={this.state.assignDesign.name} />
                <div className="DesignsCtr" style={this.state.assignDesign.visible ? { display: 'block' } : { display: 'none' }}>
                    {designSelections.map(design => (
                        <div className="DesignItem" key={design.id} value={design.name} onClick={() => this.selectDesignHandler(design.id, design.name)}>
                            <img className="DesignImg" src={design.img} alt={design.name} />
                            <div>
                                <h5 className="DesignHead">{design.name}</h5>
                                <h6 className="DesignId">{design.id}</h6>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="Inventory-ctr">
                    <div className="Inventory">
                        <label className="FormLabel">Assign quantity*</label>
                        <input type="number" onChange={this.quantityHandler} placeholder="Enter quantity" value={this.state.quantity} required />
                    </div>
                    <div className="Inventory">
                        <label className="FormLabel">Available Inventory</label>
                        <span>{this.state.inventory} meter</span>
                    </div>
                    <div className="Inventory">
                        <label className="FormLabel">Attach Challan</label>
                        <input type="file" placeholder="Select File" />
                    </div>
                </div>


            </form>

        );

        return (
            <div>
                <h4 style={{ 'margin-top': '0' }}>
                    <i
                        className="fa fa-arrow-left left-arrow"
                        onClick={this.state.goBack ? this.goBackHandler : this.props.backBtn}>
                    </i>
                    Assign to factory
                </h4>
                {this.state.goNext ? summary : form}
                <div className="Ctas" >
                    <button
                        className="BackBtn cta-btn"
                        onClick={this.state.goBack ? this.goBackHandler : this.props.backBtn}
                    >BACK
                    </button>
                    <button
                        disabled={!this.state.formIsValid}
                        className="NextBtn cta-btn"
                        onClick={this.nextHandler}
                    >{this.state.goNext ? 'ASSIGN TO FACTORY' : 'NEXT'}
                    </button>
                </div>
            </div>
        );
    }
}



export default OrderForm;