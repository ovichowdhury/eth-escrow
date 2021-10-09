import { useEffect, useState } from "react";
import { ethConfig } from "../configs/ethConfig";
import { NaiveEscrowService } from "../services/naiveEscrow";
import { NotificationManager } from 'react-notifications';

function Unlock(props) {
    const [loading, setLoading] = useState(false);
    const [conName, setConName] = useState("");
    const [depositor, setDepositor] = useState("");
    let naiveEscrowService = new NaiveEscrowService(window.ethereum);

    useEffect(() => {
        async function fetchData() {
            const name = await naiveEscrowService.getName();
            setConName(name);
        }
        fetchData();
    }, []);

    const unlockDeposit = async (e) => {
        try {
            setLoading(true);
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            await naiveEscrowService.unlock(accounts[0], depositor);
            setLoading(false);
            NotificationManager.success('Successfully Unlocked', "", 3000);
        }
        catch (ex) {
            console.error(ex);
            setLoading(false);
            NotificationManager.error("Transaction Failed", "", 3000);
        }
    }


    return (
        <>
            <h1 className="text-muted"> Arbitror Portal </h1>
            <p>Contract Name: {conName}</p>
            <form>
                <div className="form-group p-2">
                    <label htmlFor="receipient ">Depositor address</label>
                    <input type="text"
                        className="form-control"
                        id="depositor"
                        placeholder="Enter depositor address"
                        value={depositor}
                        onChange={(e) => setDepositor(e.target.value)}
                    />

                </div>
                <button type="button" className="btn btn-success" onClick={unlockDeposit}>Unlock</button>
                <p style={{ float: "right", color: "blue" }}>{loading ? "Loading..." : ""}</p>
            </form>
        </>
    )
}

export default Unlock;