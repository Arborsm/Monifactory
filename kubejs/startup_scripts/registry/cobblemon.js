/* eslint no-unused-vars: "off" */
StartupEvents.registry('item', event => {
  event.create('poke_flute').unstackable().rarity('uncommon').tooltip('§5右键后按H与宝可梦一起冒险吧！').displayName('宝可梦之笛')
})

GTCEuStartupEvents.registry('gtceu:material', event => {
  event.create('medicinal_brew').fluid().color(0x2DBAA0)
})
