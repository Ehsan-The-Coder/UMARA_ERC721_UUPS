const {ethers,upgrades} = require("hardhat");

async function main()
{
    const UMARA= await ethers.getContractFactory("UMARA");
    console.log("deploying UMARA...");
    const umara= await upgrades.deployProxy(UMARA,{kind:"uups"});
    await umara.deployed();
    const signer = await ethers.getSigner();
    const ownerAddress = await signer.getAddress();
    console.log('UMARA deployed to:', umara.address);
    console.log('UMARA is deployed by:', ownerAddress);
}
main();
//0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 contract 
//0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266  owner