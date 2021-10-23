import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import { AppContext } from '../../routes';

// Network
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import getWeb3 from "../../getWeb3";

export const NavBar = () => {
    const { appState, setAppState } = useContext(AppContext);
    const [connecting, setConnecting] = useState(true);

    useEffect(() => {
        getNetworkState();
    }, [])

    const getNetworkState = async () => {
        setConnecting(true);
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            setAppState({ ...appState, web3 });

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            if (deployedNetwork) {
                const instance = new web3.eth.Contract(
                    SimpleStorageContract.abi,
                    deployedNetwork.address,
                );
                // Set web3, accounts, and contract to the state, and then proceed with an
                // example of interacting with the contract's methods.


                let accountBalance = await web3.eth.getBalance(accounts[0]);
                accountBalance = web3.utils.fromWei(accountBalance, "Ether");
                setAppState({ web3, accounts, contract: instance, accountBalance });
                setConnecting(false);
            } else {
                alert("contract not Detected")
            }
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    }


    return (
        <header className="col-12 d-flex justify-content-between align-items-center px-5 py-4 navbar-component">
            <div className="d-flex">
                <img src="/images/logo.png" alt="" />
            </div>
            <div className="d-flex align-items-center">
                <a href="#asd" className="mx-2 text-white text-decoration-none">Home</a>
                {
                        connecting ?
                        <button className="mx-2 text-white text-decoration-none btn btn-sm btn-dark">
                            <div class="spinner-border spinner-border-sm" role="status"></div> Connecting
                        </button>
                        :
                        appState && appState.web3 ?
                        <button className="mx-2 text-white text-decoration-none btn btn-sm btn-success">
                            Wallet connected
                        </button>
                        :
                        <button className="mx-2 text-white text-decoration-none btn btn-sm btn-danger">
                            Connect wallet
                        </button>
                }
            </div>
        </header>
    )
}
