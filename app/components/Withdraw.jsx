import { useEffect, useState } from "react";
import { ethConfig } from "../configs/ethConfig";
import { NaiveEscrowService } from "../services/naiveEscrow";
import { NotificationManager } from 'react-notifications';

function Withdraw(props) {
    const [loading, setLoading] = useState(false);
    const [depositor, setDepositor] = useState("");
    const [depositorDetails, setDepositorDetails] = useState({});
    let naiveEscrowService = new NaiveEscrowService(window.ethereum);

    const getDepositorDetails = async (e) => {
        try {
            const depositorInfo = await naiveEscrowService.depositorInfo(depositor);
            setDepositorDetails(depositorInfo);
        }
        catch (ex) {
            alert(ex.toString());
        }

    }

    const withdrawEther = async (e) => {
        try {
            setLoading(true);
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            await naiveEscrowService.withdraw(accounts[0]);
            setLoading(false);
            NotificationManager.success('Successfully Withdrawn', "",3000);
        }
        catch (ex) {
            console.error(ex);
            setLoading(false);
            NotificationManager.error("Transaction Failed", "", 3000);
        }
    }


    return (
        <>
            <div>
                <h3 className="text-muted">Withdraw Service</h3>
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
                        <small className="form-text text-muted">This field is for only getting the depositor profile. Metamask address will be used for withdraw</small>
                    </div>

                    <div>
                        {depositorDetails.receipient ? (
                            <ul>
                                <li>Receipient: {depositorDetails.receipient}</li>
                                <li>Amount: {naiveEscrowService.toEther(depositorDetails.amount)} ether</li>
                                <li>Create Time: {new Date(depositorDetails.createTime * 1000).toLocaleString()}</li>
                            </ul>
                        ) : ""
                        }

                    </div>

                    <button type="button"
                        className="btn btn-primary"
                        onClick={(e) => getDepositorDetails(e)}
                    >
                        Get Details
                    </button>

                    
                    <hr />
                    <button type="button" className="btn btn-success" onClick={withdrawEther}>Withdraw</button>
                    <p style={{ float: "right", color: "blue" }}>{loading ? "Loading..." : ""}</p>
                    <p>Withdraw is allowed after 24 hours of deposit</p>

                </form>
            </div>
        </>
    )
}

export default Withdraw;