import { ethConfig } from "../configs/ethConfig";
import { naiveEscrowConfig } from "../configs/naiveEscrow";
import Web3 from 'web3';



export class NaiveEscrowService {
    constructor(provider) {
        this.web3 = new Web3(provider);
        this.naiveEscrowContract = new this.web3.eth.Contract(
            naiveEscrowConfig.contractABI,
            naiveEscrowConfig.contractAddress
        );
    }

    async getName() {
        const name = await this.naiveEscrowContract.methods.name().call();
        return name;
    }


    async deposit(sender, receipient, amount) {
        console.log(sender);
        const res = await this.naiveEscrowContract
            .methods
            .deposit(receipient, this.web3.utils.toWei(amount))
            .send({
                from: sender,
                value: this.web3.utils.toWei(amount)
            });
        console.log(res);
        return res;
    }

    async withdraw(sender) {
        const res = await this.naiveEscrowContract.methods.withdraw().send({
            from: sender
        });
        return res;
    }

    async unlock(sender, depositor) {
        const res = await this.naiveEscrowContract.methods.unlock(depositor).send({
            from: sender
        });
        return res;
    }


    async depositorInfo(depositorAddress) {
        const res = await this.naiveEscrowContract.methods.depositorInfo(depositorAddress).call();
        console.log(res);
        return {
            receipient: res.receipient,
            amount: res.amount,
            createTime: res.createTime
        }
    }

    /**
     * utility services
     */
    toEther(amount) {
        return this.web3.utils.fromWei(amount, "ether");
    }


    async getRevertReason(txHash) {

        const tx = await this.web3.eth.getTransaction(txHash)

        let result = await this.web3.eth.call(tx, tx.blockNumber)

        result = result.startsWith('0x') ? result : `0x${result}`

        if (result && result.substr(138)) {

            const reason = web3.utils.toAscii(result.substr(138))
            console.log('Revert reason:', reason)
            return reason

        }

        return "Transaction Failed";

    }
}

