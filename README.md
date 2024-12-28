# tswow-mod-mailonlevelup
 A livescript that sends mail when a player levels up

## Key learnings
See livescripts/mail/RegisterPlayerLevelUpMailEvents.ts for discussion on:
* Documentation on  mail params like senderType and from for TrinityCore, which are not yet present as Enums in TSWow.
* CreateItem returns a TSItem or undefined. In TypeScript, we must handle the undefined case, otherwise, we receive compiler-time errors. This is a good thing! It forces authors to handle problem scenarios.
* Creating an array of items of type TSArray<TSItem>, which is required to send items to players.
* TrinityCore item templates vs. item instance, and how this relates to sending players item instances by creating them from item templates.

## How to use
If you are not sure how to add this livescript to your TSWow module, refer to the Wiki: https://tswow.github.io/tswow-wiki/