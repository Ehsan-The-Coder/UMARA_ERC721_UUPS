const {ethers,upgrades}= require("hardhat");

async function main()
{
    const UMARA_V2 = await ethers.getContractFactory("UMARA_V2");
    console.log("Upgrading contract UMARA...");
    const UMARA_Address="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    await upgrades.upgradeProxy(UMARA_Address, UMARA_V2);
    console.log("UMARA upgraded to UMARA_V2");
}

main();