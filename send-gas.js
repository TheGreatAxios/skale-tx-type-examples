import { Wallet, JsonRpcProvider, parseEther } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const rpc = "https://mainnet.skalenodes.com/v1/green-giddy-denebola";
const TO = "0xB172540aBa281D637c2D0942D7bEF380861E6037";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (PRIVATE_KEY === undefined) throw new Error("Add PRIVATE_KE to .env");

async function main() {

    const provider = new JsonRpcProvider(rpc);
    const wallet = new Wallet(PRIVATE_KEY, provider);
    let nonce = await wallet.getNonce();

    const type0 = await wallet.sendTransaction({
        to: TO,
        value: parseEther("0.0000000000000001"),
        gasPrice: 100_000,
        gasLimit: 21_000,
        nonce: nonce++,
        type: 0
    });

    console.log("Type 0", type0);

    const type2 = await wallet.sendTransaction({
        to: TO,
        value: parseEther("0.0000000000000001"),
        nonce
    });

    console.log("Type2: ", type2);
}

main()
    .catch((err) => {
        console.error(err);
    });
