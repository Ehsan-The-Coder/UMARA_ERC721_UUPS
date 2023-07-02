const{expect} = require("chai");
const chai = require('chai');
const hre = require("hardhat");




describe("UMARA ERC721 Versions...",function()
{
    this.timeout(600000);//600 seconds
    let _allAddress = [];
    let UMARA;
    let umara;
    let UMARA_V2;
    let umara_v2;
    let UMARA_Address;

    this.beforeEach(async function()
        {
            UMARA = await hre.ethers.getContractFactory("UMARA");
            UMARA_V2 = await hre.ethers.getContractFactory("UMARA_V2");
            _allAddress = await hre.ethers.getSigners();
            umara=await hre.upgrades.deployProxy(UMARA,{kind:"uups"});
            UMARA_Address=umara.address;
        });
        
    describe("Version V1",function()
    {
        it("should check if owner can mint",async function()
        {
            for(var i=1; i<=5;i++)
            {
                await umara.safeMint(_allAddress[i].address);
                expect((await umara.count()).toString()).to.equal(i.toString());
            }
        });
        it("should check if other than reverted",async function()
        {
            try
            {
                await umara.connect(_allAddress[2]).safeMint(_allAddress[2].address);
                //generate exception
            }
            catch (error) 
            {
                //console.log(error);
            }
            var _actual= await umara.connect(_allAddress[0]).count();
            var _expect=0;
            expect(_actual.toString()).to.equal(_expect.toString());
        });
    });


    describe("Version V2 where any user can mint",function()
    {
        it("should check if owner can mint",async function()
        {
            umara_v2=await upgrades.upgradeProxy(UMARA_Address, UMARA_V2);
            for(var i=1; i<=5;i++)
            {
                await umara_v2.safeMint(_allAddress[i].address);
                expect((await umara_v2.count()).toString()).to.equal(i.toString());
            }
        });
        it("should check if other than can also mint",async function()
        {
            umara_v2=await upgrades.upgradeProxy(UMARA_Address, UMARA_V2);
            for(var i=1; i<=5;i++)
            {
                await umara_v2.connect(_allAddress[i]).safeMint(_allAddress[i].address);
                expect((await umara_v2.count()).toString()).to.equal(i.toString());
            }
        });
        it("should check if hold values of ex version",async function()
        {
            for(var i=1; i<=5;i++)
            {
                await umara.safeMint(_allAddress[i].address);
            }//this version have 5 values 
            //now upgrade to v2
            umara_v2=await upgrades.upgradeProxy(UMARA_Address, UMARA_V2);
            for(var i=1; i<=5;i++)
            {
                await umara_v2.connect(_allAddress[i]).safeMint(_allAddress[i].address);
            }//this version also have 5 values
            //intotal we expect 10 values
            expect((await umara_v2.count()).toString()).to.equal('10');
        });
    });
});