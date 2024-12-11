import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BN } from "bn.js";

import { assert } from "chai";
import { randomBytes } from "crypto";
import { TwitterDapp } from "../target/types/twitter_dapp";

describe("twitter_dapp", () => {
  const provider = anchor.AnchorProvider.env(); // This provider is wrapper of both connection and wallet
  anchor.setProvider(provider);

  const program = anchor.workspace.TwitterDapp as Program<TwitterDapp>;
  const wallet = provider.wallet;
  let tweet = "Today I learned about Anchor complete basics";
  let topic = "Anchor";
  let seed = new BN(randomBytes(8));

  let tweetPDA: anchor.web3.PublicKey;

  before("prepare", async () => {
    [tweetPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("TWEET_ACCOUNT"),
        wallet.publicKey.toBuffer(),
        seed.toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );

    console.log(
      `⚡️⚡️⚡️⚡️ The PDA is: ${tweetPDA.toString()} and the Random Seed is: ${seed} and wallet address is; ${
        wallet.publicKey
      } ⚡️⚡️⚡️⚡️`
    );
  });

  it("Tweet Creation", async () => {
    try {
      const trxSign = await program.methods
        .initializeTweet(tweet, topic, seed)
        .accountsStrict({
          user: wallet.publicKey,
          tweetAccount: tweetPDA,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log("The size of topic is :", topic.length);
      console.log(`The transaction is successfull 🥳 ${trxSign.toString()} `);
    } catch (e) {
      console.error(`You got an error Onicha!!! ${e}`);
      throw new Error(e);
    }
  });
});
