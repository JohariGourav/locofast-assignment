import React, { Component } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import Modal from '../../components/UI/Modal/Modal';
import FabricCards from '../../components/FabricCards/FabricCards';
import Order from '../Order/Order';

class LocoFast extends Component {
    state = {
        modalOpen: false,
    }

    modalClosedHandler = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }

    orderHandler = () => {
        this.setState({ modalOpen: true });
    }

    orderCancelHandler = () => {
        this.setState({ modalOpen: false });
    }

    render() {
        return (
            <React.Fragment>
                <Modal show={this.state.modalOpen} modalClosed={this.modalClosedHandler}>
                    <Order orderCancel={this.orderCancelHandler}/>
                </Modal>
                <SideBar></SideBar>
                <FabricCards ordering={this.orderHandler}></FabricCards>
            </React.Fragment>
        );
    }
}

export default LocoFast;
