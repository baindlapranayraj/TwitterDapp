use anchor_lang::prelude::*;

#[error_code]
pub enum TwitterError {
    #[msg("The provided topic should be 50 characters long maximum.")]
    TopicLenghthOverflow,

    #[msg("The provided content should be 280 characters long maximum.")]
    ContentLengthOverflow,

    #[msg("Invalid Authour trying to create Tweet")]
    AuthourInvalid,
}
