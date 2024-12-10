import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

import { assert } from "chai";
import { TwitterDapp } from "../target/types/twitter_dapp";

function TweetPDA(
  provider: anchor.AnchorProvider,
  topic: string,
  program: anchor.web3.PublicKey
) {
  const [tweetPDA] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("TWEET_ACCOUNT"),
      provider.wallet.publicKey.toBuffer(),
      Buffer.from(topic),
    ],
    program
  );
  return tweetPDA;
}

describe("twitter_dapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env(); // This provider is wrapper of both connection and wallet
  anchor.setProvider(provider);

  const program = anchor.workspace.TwitterDapp as Program<TwitterDapp>;
  const wallet = provider.wallet;
  let tweet = "Today I learned about Anchor complete basics";
  let topic = "Anchor";

  it("Tweet Creation", async () => {
    try {
      console.log("The size of topic is :", topic.length);
      const tweetPDA = TweetPDA(provider, topic, program.programId);

      const trxSign = await program.methods
        .initializeTweet(tweet, topic)
        .accountsStrict({
          user: wallet.publicKey,
          tweetAccount: tweetPDA,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();

      console.log("The size of topic is :", topic.length);
      console.log(`The transaction is successfull 🥳 ${trxSign.toString()} `);

      const { content, authour, timestamp } = await program.account.tweet.fetch(
        tweetPDA
      );

      assert.equal(tweet, content);
      console.log(
        `All Tweet account details content:${content} timestamp: ${timestamp} authour: ${authour}`
      );
    } catch (e) {
      console.error(`You got an error Onicha!!! ${e}`);
      throw new Error(e);
    }
  });
});
