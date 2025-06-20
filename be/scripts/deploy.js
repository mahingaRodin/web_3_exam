async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const NameStorage = await ethers.getContractFactory("NameStorage");
    const nameStorage = await NameStorage.deploy();

    console.log("NameStorage address:", nameStorage.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });