import { Wallet, JsonRpcProvider, parseEther, Contract } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const rpc = "https://mainnet.skalenodes.com/v1/green-giddy-denebola";
const TO = "0x56F57fa49DF41aE11610d362A00819755183733a";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (PRIVATE_KEY === undefined) throw new Error("Add PRIVATE_KE to .env");

const abi = [
    "function updateCounter() external"
];

async function main() {

    const provider = new JsonRpcProvider(rpc);
    const wallet = new Wallet(PRIVATE_KEY, provider);
    const contract = new Contract(TO, abi, wallet);

    let nonce = await wallet.getNonce();

    const type0 = await contract.updateCounter({
        gasPrice: 100_000,
        gasLimit: 50_000,
        nonce: nonce++,
        type: 0
    });

    console.log("Type 0", type0);

    const type2 = await contract.updateCounter({
        nonce
    });

    console.log("Type2: ", type2);
}

main()
    .catch((err) => {
        console.error(err);
    });
