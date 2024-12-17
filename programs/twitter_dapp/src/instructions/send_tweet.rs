use anchor_lang::prelude::*;

#[allow(unused_imports)]
use crate::{constants::*, error::*, states::*};

pub fn send_tweet(
    ctx: Context<SendTweet>,
    content: String,
    topic: String,
    seed: u64,
) -> Result<()> {
    let tweet_account = &mut ctx.accounts.tweet_account;
    let user = &ctx.accounts.user;

    require!(content.len() < 280, TwitterError::ContentLengthOverflow);
    require!(topic.len() < 25, TwitterError::TopicLenghthOverflow);

    let clock = Clock::get().unwrap();

    tweet_account.content = content;
    tweet_account.timestamp = clock.unix_timestamp;
    tweet_account.topic = topic;
    tweet_account.authour = user.key();
    tweet_account.seed = seed;

    msg!("Created a tweet");

    Ok(())
}

#[derive(Accounts)]
#[instruction(content: String,topic: String,seed:u64)]
pub struct SendTweet<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = Tweet::LEN,
        seeds = [TWEET_ACCOUNT_SEED,user.key().as_ref(),seed.to_le_bytes().as_ref()],
        bump
    )]
    pub tweet_account: Box<Account<'info, Tweet>>,

    pub system_program: Program<'info, System>,
}
