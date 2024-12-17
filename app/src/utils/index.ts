import { AnchorProvider } from "@coral-xyz/anchor"
import { AnchorWallet } from "@solana/wallet-adapter-react"
import { Connection } from "@solana/web3.js"


export const anchorProvider = (connection:Connection,wallet:AnchorWallet)=>{
    const provider = new AnchorProvider(connection,wallet,{
        commitment:"confirmed"
    })
    return {
        provider
    }
}