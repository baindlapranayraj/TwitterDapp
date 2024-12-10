use anchor_lang::prelude::*;

#[account]
#[derive(Default, InitSpace)]
pub struct Tweet {
    pub authour: Pubkey, //
    pub timestamp: i64,  // Note: There is no Id in this Tweet Or the Timestamp itself is Id ?
    #[max_len(25)]
    pub topic: String,
    #[max_len(280)]
    pub content: String, //
}

impl Tweet {
    pub const LEN: usize = 8 + 32 + 8 + (4 + 25 * 4) + (4 + 280 * 4);
}
