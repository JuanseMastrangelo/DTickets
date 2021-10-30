import React, { useContext } from 'react';
import './style.scss';
import Particles from 'react-particles-js';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfinity } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../../routes';

export const Main = () => {
    const { appState, setAppState } = useContext(AppContext);

    const buyTicket = async () => {
        const { accounts, contract } = appState;
        console.log(contract.methods);
        /* // Stores a given value, 5 by default.
        await contract.methods.set(5).send({ from: accounts[0] });
    
        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();
    
        // Update state with the result.
        this.setState({ storageValue: response }); */
    }


    return (
        <div className="main-component">
            <section>
                <Particles />
                <div className="container position-relative">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="spacer-single"></div>
                            <h6>
                                <span className="text-uppercase text-blue">Market</span>
                            </h6>
                            <div>
                                <h1 className="text-white">Buy and Get tickets</h1>
                            </div>
                            <div>
                                <p className="lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa in voluptatibus accusamus voluptas, quidem optio quaerat recusandae ullam necessitatibus rem libero nobis ducimus enim ab voluptate facere consequuntur velit accusantium.</p>
                            </div>
                            <div className="spacer-10"></div>
                            <button className="btn btn-sm btn-light text-blue mb-3">Explore</button>
                            <div className="d-inline">
                                <div className="row">
                                    <div className="spacer-single"></div>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                                            <div className="text-left">
                                                <h3>
                                                    <span className="text-blue">2</span>
                                                </h3>
                                                <h5 className="text-white">Sells</h5>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-4 mb30">
                                            <div className="text-left">
                                                <h3>
                                                    <span className="text-blue">
                                                        <FontAwesomeIcon icon={faInfinity} />
                                                    </span>
                                                </h3>
                                                <h5 className="text-white">Available</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-sm btn-light mt-3 py-3" onClick={() => buyTicket()}>
                                            <h4 className="m-0">Buy ticket with crypto</h4>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 xs-hide">
                            <div className="onStep d-inline css-stf90f">
                                <img src="images/women-with-vr.png" className="img-fluid" alt="" />
                            </div></div></div>
                </div>
            </section>
        </div>
    )
}
