<h1 align="center">
  Naive Escrow Service
</h1>

<p align="center"> Ethereum Based Escrow Service Demo Implemetation
<p align="center">
  
## Technology Used

1. Solidity Smart Contract
2. Truffle Framework
3. Web3 with Next.js
4. Ethereum Rinkeby Testnet
5. Metamask
  
## Naive Escrow Online
[Vercel App](https://eth-escrow.vercel.app/)
  
## Local Installation
1. Smart Contract
```bash
$ truffle migrate --compile-all --network <name from truffle-config> --reset
```
2. Provide the contract address in eth-escrow/app/configs/naiveEscrow.js
3. Install the DApp Dependencies
```bash
$ npm install
```
4. Start the DApp
```bash
$ npm run build && npm start
```
5. Integrated with Metamask, so make sure you have the extension in your browser. and enjoy !!!
  
## How to Use
#### Depositor Portal
![image](https://eth-escrow.vercel.app/depositor.PNG)

#### Arbitror Portal
![image](https://eth-escrow.vercel.app/arbitror.PNG)

### Instructions
1. Make sure Metamask is installed in your browser.
2. Allow https://eth-escrow.vercel.app to use Metamask (Metamask will ask for permission during first time usage)
3. For every successful or failed transaction the initiator of the transaction has to pay for the gas fee of the transaction.
4. Deposit, Withdraw and Unlock buttons are the transactional buttons of this application so this actions will cost you some ether as gas fee.
5. As this is a demo application data validations are not imposed yet in frontend, So try to provide valid data always.
  

## Stay in touch

- Author - [Nahid Chowdhury](https://bd.linkedin.com/in/nahid-chowdhury)
