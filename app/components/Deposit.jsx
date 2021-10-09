import { useEffect, useState } from "react";
import { ethConfig } from "../configs/ethConfig";
import { NaiveEscrowService } from "../services/naiveEscrow";
import { NotificationManager } from 'react-notifications';

function Deposit(props) {
    const [conName, setConName] = useState("");
    const [receipient, setReceipient] = useState("");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    let naiveEscrowService = new NaiveEscrowService(window.ethereum);


    useEffect(() => {
        async function fetchData() {
            const name = await naiveEscrowService.getName();
            setConName(name);
        }
        fetchData();
    }, []);

    const handleClick = async (e) => {
        try {
            setLoading(true);
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            await naiveEscrowService.deposit(accounts[0], receipient, amount);
            setLoading(false);
            NotificationManager.success('Successfully Deposited', "", 3000);
        }
        catch (ex) {
            console.error(ex);
            setLoading(false);
            NotificationManager.error("Transaction Failed", "", 3000);
        }

    }
    return (
        <>
            <p>Contract Name: {conName}</p>
            <div>
                <h3 className="text-muted">Deposit Service</h3>
                <form>
                    <div className="form-group p-2">
                        <label htmlFor="receipient ">Receipient address</label>
                        <input type="text"
                            className="form-control"
                            id="receipient"
                            placeholder="Enter receipient address"
                            value={receipient}
                            onChange={(e) => setReceipient(e.target.value)}
                        />
                    </div>
                    <div className="form-group p-2">
                        <label htmlFor="amount ">Ether amount</label>
                        <input type="text"
                            className="form-control"
                            id="amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Deposit</button>
                    <p style={{ float: "right", color: "blue" }}>{loading ? "Loading..." : ""}</p>
                </form>
            </div>
        </>
    )
}

export default Deposit;