const hre = require('hardhat');

//'Staking contract deployed to : 0x5FbDB2315678afecb367f032d93F642f64180aa3 by:  0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

async function main() {
    [signer1, signer2] = await ethers.getSigners();

    const Staking = await hre.ethers.getContractFactory("Staking");

    const staking = await Staking.deploy({
        value: ethers.utils.parseEther('10')
    });

    console.log("Staking contract deployed to :", staking.address, "by: ", signer1.address)

    const provider = waffle.provider;
    let data;
    let transaction;
    let reciept;
    let block;
    let newUnlockedDate;

    data = {value: ethers.utils.parseEther('0.5')}
    transaction = await staking.connect(signer2).stakeEther(30, data)

    data = {value: ethers.utils.parseEther('1')}
    transaction = await staking.connect(signer2).stakeEther(180, data)

    data = {value: ethers.utils.parseEther('1.75')}
    transaction = await staking.connect(signer2).stakeEther(180, data)

    data = {value: ethers.utils.parseEther('5')}
    transaction = await staking.connect(signer2).stakeEther(90, data)
    reciept = await transaction.wait()
    block = await provider.getBlock(reciept.blockNumber)
    newUnlockedDate = block.timestamp - (60 * 60 * 24 * 100)
    await staking.connect(signer1).changeUnlockDate(3, newUnlockedDate)

    data = {value: ethers.utils.parseEther('1.75')}
    transaction = await staking.connect(signer2).stakeEther(180, data)
    reciept = await transaction.wait()
    block = await provider.getBlock(reciept.blockNumber)
    newUnlockedDate = block.timestamp = (60*60*24*100)
    await staking.connect(signer1).changeUnlockDate(4, newUnlockedDate)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });