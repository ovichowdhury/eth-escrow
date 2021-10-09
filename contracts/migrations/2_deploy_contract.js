const NaiveEscrow = artifacts.require('NaiveEscrow');

module.exports = (deployer, network, accounts) => {
    /**
     * Deploy Naive Escrow Contract
     */
    const naiveEscrowName = "Naive Escrow Service";
    deployer.deploy(NaiveEscrow, naiveEscrowName, accounts[0]);
}