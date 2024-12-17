import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Wallet } from "@coral-xyz/anchor/dist/cjs/provider";
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
  let tweetPDA: anchor.web3.PublicKey;

  let walletTwo = anchor.web3.Keypair.generate();

  before("prepare", async () => {
    let walletBalance = await provider.connection.getBalance(
      walletTwo.publicKey
    );

    if (walletBalance == 0) {
      let trx = await provider.connection.requestAirdrop(
        walletTwo.publicKey,
        anchor.web3.LAMPORTS_PER_SOL * 2
      );

      await provider.connection.confirmTransaction(trx, "confirmed");
      console.log(`Successfully airdrop 2 SOLs to your new Wallet ${trx}`);
    }
  });

  it("Tweet Creation", async () => {
    try {
      const { seed, tweetPDA } = createTweetPDA(wallet, program.programId);
      const trxSign = await program.methods
        .initializeTweet(tweet, topic, seed)
        .accountsStrict({
          user: wallet.publicKey,
          tweetAccount: tweetPDA,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: true });

      console.log(`The transaction is successfull 🥳 ${trxSign.toString()} `);

      const tweetAccount = await program.account.tweet.fetch(tweetPDA);
      assert.equal(tweet, tweetAccount.content);
      assert.equal(topic, tweetAccount.topic);
    } catch (e) {
      console.error(`You got an error Onicha!!! ${e}`);
      throw new Error(e);
    }
  });

  it("Tweet Creation With out Topic", async () => {
    try {
      const { seed, tweetPDA } = createTweetPDA(wallet, program.programId);

      const trxSign = await program.methods
        .initializeTweet("Hello Hummans", "", seed)
        .accountsStrict({
          user: wallet.publicKey,
          tweetAccount: tweetPDA,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc({ skipPreflight: true });

      console.log(`The transaction is successfull 🥳 ${trxSign.toString()} `);

      const tweetAccount = await program.account.tweet.fetch(tweetPDA);
      // console.log(tweetAccount);
    } catch (e) {
      console.error(`You got an error Onicha!!! ${e}`);
      throw new Error(e);
    }
  });

  it("Tweet Creation with new Wallet", async () => {
    try {
      const { seed, tweetPDA } = createTweetPDA(walletTwo, program.programId);
      const trxSign = await program.methods
        .initializeTweet(tweet, "", seed)
        .accountsStrict({
          user: walletTwo.publicKey,
          tweetAccount: tweetPDA,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([walletTwo])
        .rpc({ skipPreflight: true });

      const tweetAccount = await program.account.tweet.fetch(tweetPDA);

      console.log(`New User Wallet Successfully Created a Tweet`);
    } catch (e) {
      console.error(`You got an error Onicha!!! ${e}`);
      throw new Error(e);
    }
  });

  it("Fetching all tweets", async () => {
    const tweetAccounts = await program.account.tweet.all();

    // console.log(tweetAccounts);
    assert.equal(tweetAccounts.length, 3);
  });

  it("filtering the Tweet based on authour", async () => {
    let authourTweetAccounts = await program.account.tweet.all([
      {
        memcmp: {
          offset: 8,
          bytes: wallet.publicKey.toBase58(),
        },
      },
    ]);

    // console.log(authourTweetAccounts);
  });

  it("filtering the Tweet based on the topic", async () => {
    let filterTweet = await program.account.tweet.all([
      {
        memcmp: {
          offset: 8 + 32 + 8 + 4,
          bytes: anchor.utils.bytes.bs58.encode(Buffer.from(topic)),
        },
      },
    ]);

    console.log("filtering based on empty String", filterTweet);
  });
});

const createTweetPDA = (
  wallet: Wallet | anchor.web3.Keypair,
  program: anchor.web3.PublicKey
) => {
  let seed = new BN(randomBytes(8));
  let [tweetPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("TWEET_ACCOUNT"),
      wallet.publicKey.toBuffer(),
      seed.toArrayLike(Buffer, "le", 8),
    ],
    program
  );

  console.log(
    `⚡️⚡️⚡️⚡️ The PDA is: ${tweetPDA.toString()} and the Random Seed is: ${seed} and wallet address is; ${
      wallet.publicKey
    } ⚡️⚡️⚡️⚡️`
  );

  return {
    tweetPDA,
    seed,
  };
};

// +++++++++++++++++++++ Learnings +++++++++++++++++++++++++++
// - A PDA allows a maximum of 16 seeds, with each seed limited to 32 bytes in length.
