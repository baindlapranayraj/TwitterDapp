import "./App.css";
import { TwitterLayout } from "./components";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";


const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);


function App() {
  return (
    <>
      <div>
        <Theme>
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
               <Toaster position="top-right" reverseOrder={false} />
               <TwitterLayout />
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </Theme>
      </div>
    </>
  );
}

export default App;
