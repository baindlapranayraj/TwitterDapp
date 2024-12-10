use anchor_lang::prelude::*;

pub mod constants;
pub mod error;
pub mod instructions;
pub mod states;

#[allow(unused_imports)]
use crate::{constants::*, error::*, instructions::*, states::*};

declare_id!("7oPujJNFWGHAk3Ht1fgwzKELNBjp6nboGwgXjYGck5ik");

#[program]
pub mod twitter_dapp {
    use super::*;

    pub fn initialize_tweet(ctx: Context<SendTweet>, content: String, topic: String) -> Result<()> {
        match send_tweet(ctx, content, topic) {
            Ok(_) => {
                msg!("Successfully created your ");
                Ok(())
            }
            Err(e) => {
                msg!("Failed while creating your tweet");
                Err(e)
            }
        }
    }
}
