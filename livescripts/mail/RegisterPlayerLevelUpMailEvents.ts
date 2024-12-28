interface Mail {
    senderType: uint8, // https://trinitycore.atlassian.net/wiki/spaces/tc/pages/2130254/mail#mail-messageType
    from: uint64, // https://trinitycore.atlassian.net/wiki/spaces/tc/pages/2130254/mail#mail-stationery
    subject: string,
    body: string,
    money?: uint32, // the ? operator here marks these parameters as optional. More info: https://www.typescripttutorial.net/typescript-tutorial/typescript-optional-parameters/ 
    cod? : uint32,
    delay? : uint32,
    items? : TSArray<TSItem>
    itemEntries? : TSArray<TSItemEntry>
}

interface CreateItemInput {
    itemTemplateEntry: uint32,
    count: uint32
}

export function RegisterPlayerLevelUpMailEvents(events: TSEvents) {
    events.Player.OnLevelChanged((player) => {
        // When creating items to send to players, remember that TrinityCore has two concepts about items:
        // 1. Item templates, which are used by the core to define properties that items have, like their name.
        // 2. Item instances, which are what players interact with.
        // We are sending item instances to a player. We must create the item instance by providing CreateItem with an item template entry.
        const itemDetails : CreateItemInput = {
            itemTemplateEntry: 4306, // silk cloth
            count: 1
        }
        const itemInstance : TSItem | undefined = CreateItem(itemDetails.itemTemplateEntry, itemDetails.count)

        // CreateItem returns a TSItem or undefined, if creating an item fails.
        // We MUST handle the undefined case, otherwise, our code won't compile.
        if (itemInstance == undefined) return; // Lets just not send any mail if creating an item fails for some reason.

        const congratsPackageItems : TSArray<TSItem> = [itemInstance]

        // Interested in more options on some of the below params? See documentation linked above the Mail interface!
        const congratsMail : Mail = {
            senderType: 0, // MAIL_NORMAL
            from: 1, // TEST
            subject: "Congratulations Package",
            body: "Congrats on the level up!",
            money: 0,
            cod: 0,
            delay: 0,
            items: congratsPackageItems
        }

        player.SendMail(
            congratsMail.senderType,
            congratsMail.from,
            congratsMail.subject,
            congratsMail.body,
            congratsMail.money,
            congratsMail.cod,
            congratsMail.delay,
            congratsMail.items
        )
    })
}