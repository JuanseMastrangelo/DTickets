import React, { useContext, useState } from 'react';
import './style.scss';
import Particles from 'react-particles-js';

import { AppContext } from '../../routes';
import { ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from "shards-react";

export const Main = () => {
    const [clientId, setClientId] = useState("41431069");
    const [lastIdSearched, setLastIdSearched] = useState(null);
    const [records, setRecords] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { appState, setAppState } = useContext(AppContext);

    const searchClient = async () => {
        const { accounts, contract } = appState;
        setLastIdSearched(+clientId);
        // const balance = await contract.methods.setRecord(41431069, 2, 5, "Test 2").send({ from: accounts[0] });
        const balance = await contract.methods.getRecordsByID(+clientId).call();
        setRecords(balance)
    }

    const formatTimestamp = (tmp) => {
        const date = new Date(tmp * 1000);
        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    }


    return (
        <div className="main-component">
            <section className="h-100">
                <Particles />
                <div className="container position-relative h-100 d-flex">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="col-md-6">
                            <div className="spacer-single"></div>
                            <h6>
                                <span className="text-uppercase text-blue">DMR</span>
                            </h6>
                            <div>
                                <h1 className="text-white">Check medical records</h1>
                            </div>
                            <div>
                                <p className="lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa in voluptatibus accusamus voluptas, quidem optio quaerat recusandae ullam necessitatibus rem libero nobis ducimus enim ab voluptate facere consequuntur velit accusantium.</p>
                            </div>
                            <div className="spacer-10"></div>
                            <div className="d-inline">
                                <div className="row">
                                    <div className="spacer-single"></div>
                                    <div className="row m-0 p-0">
                                        <div className="col-3 pl-0">
                                            <select className="form-control">
                                                <option selected>Argentina</option>
                                            </select>
                                        </div>
                                        <div className="col-9 pr-0">
                                            <input
                                                type="number"
                                                value={clientId}
                                                onChange={e => setClientId(e.target.value)}
                                                className="form-control"
                                                placeholder="Ingrese número de DNI" />
                                        </div>
                                    </div>
                                    <button className="btn btn-sm btn-success mt-3 py-3"
                                        disabled={clientId.trim() === ''}
                                        onClick={() => searchClient()}>
                                        <h4 className="m-0">Buscar</h4>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            lastIdSearched && (
                                <div className="col-md-5 xs-hide card">
                                    <div className="modal-header w-100">
                                        <h5 className="modal-title w-100">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <span>Records: <b>{lastIdSearched}</b></span>
                                                <div class="d-flex align-items-center">
                                                    <button class="btn btn-light border">Add record</button>
                                                    <button class="btn btn-light border ml-2"
                                                    onClick={() => setLastIdSearched(null)}>x</button>
                                                </div>
                                            </div>
                                        </h5>
                                    </div>
                                    <div className="">
                                        {
                                            records.length > 0 && (records[0].client != 0) ?
                                                (
                                                    <ListGroup>
                                                        {
                                                            records.map((r, i) => (
                                                                <ListGroupItem key={i}>
                                                                    <div class="d-flex align-items-center justify-content-between">
                                                                        {r['value']}
                                                                        <small className="text-secondary">{formatTimestamp(r['timestamp'])}</small>
                                                                    </div>
                                                                </ListGroupItem>
                                                            ))
                                                        }
                                                    </ListGroup>
                                                )
                                                :
                                                <div className="d-flex justify-content-center py-3">
                                                    No se ha encontrado historial
                                                </div>
                                        }
                                    </div>
                                </div>
                                )
                            }
                    </div>
                </div>
            </section>

            <section className="d-flex justify-content-center">
                <div className="col-5">
                    <div class="form-group">
                        <label for="exampleInputEmail1" className="text-white">ID</label>
                        <input className="form-control" placeholder="ID" />
                    </div>
                    <div class="form-group mt-3">
                        <label for="exampleInputEmail1" className="text-white">Diagnostico</label>
                        <textarea className="form-control"></textarea>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn btn-primary col-3">Send</button>
                    </div>
                </div>
            </section>

        </div>
    )
}
