import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import { AppContext } from '../../routes';

// Network
import MedicalRecordsContract from "../../contracts/MedicalRecords.json";
import Web3 from "web3";

export const NavBar = () => {
    const { appState, setAppState } = useContext(AppContext);
    const [connecting, setConnecting] = useState(false);

    useEffect(() => {
        connectWithWeb3();
    }, []);

    const connectWithWeb3 = () => {
        try {
            const web3 = new Web3(window.ethereum);
            setAppState({ ...appState, web3 });
            checkIfIsConnected(web3);
        } catch (error) {
            alert("No se encontro web3 #1");
        }
    }

    const checkIfIsConnected = async (web3) => {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            let accountBalance = await web3.eth.getBalance(accounts[0]);
            accountBalance = web3.utils.fromWei(accountBalance, "Ether");
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            console.log(networkId);
            const deployedNetwork = MedicalRecordsContract.networks[networkId];
            if (deployedNetwork) {
                const instance = new web3.eth.Contract(
                    MedicalRecordsContract.abi,
                    deployedNetwork.address,
                );
                setAppState({ ...appState, accounts, accountBalance, contract: instance });
            } else {
                alert("contract not Detected")
            }


        }
    }

    const requestConnectWallet = async () => {
        setConnecting(true);
        try {
            await window.ethereum.enable();
        } catch (error) {
            alert("No se encontro web3");
        }
        setConnecting(false);
    }


    return (
        <header className="col-12 d-flex justify-content-between align-items-center px-5 py-4 navbar-component">
            <div className="d-flex">
                <img src="/images/logo.png" alt="" />
            </div>
            {/* <div className="d-flex align-items-center">
                <a href="#asd" className="mx-2 text-white text-decoration-none">Home</a>
                {
                        connecting ?
                        <button className="mx-2 text-white text-decoration-none btn btn-sm btn-dark">
                            <div className="spinner-border spinner-border-sm" role="status"></div> Connecting
                        </button>
                        :
                        appState && appState.accounts && appState.accounts.length > 0 ?
                        <button className="mx-2 text-white text-decoration-none btn btn-sm btn-success" title={appState.accounts}>
                            $
                            <span> </span>
                            {
                                (+appState.accountBalance).toFixed(5) + ' ETH'
                            }
                        </button>
                        :
                        <button className="mx-2 text-white text-decoration-none btn btn-sm btn-danger" onClick={() => requestConnectWallet()}>
                            Connect wallet
                        </button>
                }
            </div> */}
        </header>
    )
}
