/* eslint prefer-const: "off", valid-typeof: "off", no-unused-vars: "off" */
const modAndStage = [
  ['cobblemon', 'cobblemontrainer']
]

const [ULV, LV, MV, HV, EV, IV, LuV, ZPM, UV, UHV, UEV, UIV, UMV, UXV, MAX] = GTValues.VA

const mobStageRange = 64

ServerEvents.recipes(event => {
  event.shapeless('kubejs:poke_flute', ['supplementaries:flute', 'cobblemon:poke_ball'])
})

PlayerEvents.loggedIn(e => {
  e.server.scheduleInTicks(100, _callback => {
    if (!e.player.getStages().getAll().contains('cobblemontrainer')) {
      Utils.server.runCommandSilent('tp @e[type=cobblemon:pokemon] 0 -70 0')
    }
  })
})

EntityEvents.spawned(event => {
  const { entity } = event
  if (typeof (entity) !== null) {
    let entityName = entity.getType()
    let player = entity.getLevel().getNearestPlayer(entity, mobStageRange)
    if (player !== null && player.getName() !== null) {
      // let playerName = player.getName().getString()
      let playerStages = player.getStages().getAll()
      modAndStage.forEach(pair => {
        const [mod, stage] = pair
        if (entityName.split(':')[0] === mod && !playerStages.contains(stage)) {
          if (global.debug) {
            // console.log(`Canceling ${entityName} spawn for ${playerName} due to ${stage} stage abscence`)
          }
          event.cancel()
        }
      })
    }
  }
})

ItemEvents.rightClicked(event => {
  if (event.item.id === 'kubejs:poke_flute') {
    if (!event.player.getStages().getAll().contains('cobblemontrainer')) {
      event.player.stages.add('cobblemontrainer')
      event.player.tell('§e宝可梦，启动！')
    } else {
      event.player.stages.remove('cobblemontrainer')
      Utils.server.runCommandSilent('tp @e[type=cobblemon:pokemon] 0 -70 0')
      event.player.tell('§e宝可梦，关闭！')
    }
  }
})

ServerEvents.recipes(event => {
  function addASSRecipe(name, itemInputs, itemOutputs, fluidInputs, fluidOutputs, eut, time, circuit) {
    const dur = time * 20
    const recipe = event.recipes.gtceu.assembler(name + '_ass').duration(dur).EUt(eut)
    if (itemInputs != null) {
      recipe.itemInputs(itemInputs)
    }
    if (fluidInputs != null) {
      recipe.inputFluids(fluidInputs)
    }
    if (itemOutputs != null) {
      recipe.itemOutputs(itemOutputs)
    }
    if (fluidOutputs != null) {
      recipe.outputFluids(fluidOutputs)
    }
    if (circuit != null) {
      recipe.circuit(circuit)
    }
  }

  addASSRecipe(['poke_ball'], ['2x cobblemon:red_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:poke_ball'], [], [], LV, 4)
  addASSRecipe(['slate_ball'], ['2x cobblemon:black_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:slate_ball'], [], [], LV, 6)
  addASSRecipe(['verdant_ball'], ['2x cobblemon:green_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:verdant_ball'], [], [], LV, 6, 1)
  addASSRecipe(['azure_ball'], ['2x cobblemon:blue_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:azure_ball'], [], [], LV, 6)
  addASSRecipe(['citrine_ball'], ['2x cobblemon:yellow_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:citrine_ball'], [], [], LV, 6, 1)
  addASSRecipe(['premier_ball'], ['2x cobblemon:white_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:premier_ball'], [], [], LV, 6, 1)
  addASSRecipe(['roseate_ball'], ['2x cobblemon:pink_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:roseate_ball'], [], [], LV, 6, 1)
  addASSRecipe(['heal_ball'], ['cobblemon:pink_apricorn', 'cobblemon:white_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring', '#forge:circuits/lv'], ['cobblemon:heal_ball'], ['gtceu:medicinal_brew 200'], [], LV, 6, 2)
  addASSRecipe(['safari_ball'], ['cobblemon:green_apricorn', 'cobblemon:yellow_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring', '#forge:circuits/lv'], ['cobblemon:safari_ball'], [], [], LV, 6, 2)
  addASSRecipe(['cherish_ball'], ['3x #forge:gems/almandine_exquisite', '2x #forge:plates/double/stainless_steel', 'gtceu:silver_ring', '#forge:circuits/hv'], ['cobblemon:cherish_ball'], [], [], HV, 15)
  addASSRecipe(['friend_ball'], ['cobblemon:red_apricorn', 'cobblemon:green_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:friend_ball'], ['gtceu:tin 200'], [], MV, 8, 6)
  addASSRecipe(['great_ball'], ['cobblemon:red_apricorn', 'cobblemon:blue_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:great_ball'], ['gtceu:tin 200'], [], MV, 8, 1)
  addASSRecipe(['level_ball'], ['cobblemon:red_apricorn', 'cobblemon:black_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:level_ball'], ['gtceu:tin 200'], [], MV, 8, 7)
  addASSRecipe(['lure_ball'], ['cobblemon:red_apricorn', 'cobblemon:blue_apricorn', 'cobblemon:green_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:lure_ball'], ['gtceu:tin 200'], [], MV, 8, 4)
  addASSRecipe(['moon_ball'], ['cobblemon:black_apricorn', 'cobblemon:blue_apricorn', 'cobblemon:yellow_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:moon_ball'], ['gtceu:tin 200'], [], MV, 8, 8)
  addASSRecipe(['net_ball'], ['cobblemon:white_apricorn', 'cobblemon:blue_apricorn', 'cobblemon:black_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:net_ball'], ['gtceu:tin 200'], [], MV, 8, 9)
  addASSRecipe(['park_ball'], ['cobblemon:red_apricorn', '2x cobblemon:green_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:park_ball'], ['gtceu:tin 200'], [], MV, 8, 10)
  addASSRecipe(['sport_ball'], ['2x cobblemon:red_apricorn', 'cobblemon:white_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:sport_ball'], ['gtceu:tin 200'], [], MV, 8, 11)
  addASSRecipe(['dive_ball'], ['cobblemon:white_apricorn', '2x cobblemon:blue_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:dive_ball'], ['gtceu:tin 200'], [], MV, 8, 12)
  addASSRecipe(['fast_ball'], ['cobblemon:red_apricorn', 'cobblemon:yellow_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:fast_ball'], ['gtceu:tin 200'], [], MV, 8, 13)
  addASSRecipe(['heavy_ball'], ['cobblemon:blue_apricorn', 'cobblemon:black_apricorn', '4x gtceu:lead_plate', 'gtceu:steel_ring', '#forge:circuits/mv'], ['cobblemon:heavy_ball'], ['gtceu:lead 400'], [], MV, 16)
  addASSRecipe(['ultra_ball'], ['cobblemon:black_apricorn', 'cobblemon:yellow_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#forge:circuits/hv'], ['cobblemon:ultra_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 0)
  addASSRecipe(['dusk_ball'], ['cobblemon:black_apricorn', 'cobblemon:green_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#forge:circuits/hv'], ['cobblemon:dusk_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 1)
  addASSRecipe(['luxury_ball'], ['2x cobblemon:black_apricorn', 'cobblemon:red_apricorn', '2x gtceu:gold_plate', 'gtceu:stainless_steel_ring', '#forge:circuits/hv'], ['cobblemon:luxury_ball'], ['gtceu:rose_gold 400'], [], EV, 16)
  addASSRecipe(['quick_ball'], ['cobblemon:blue_apricorn', 'cobblemon:yellow_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#forge:circuits/hv'], ['cobblemon:quick_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 2)
  addASSRecipe(['repeat_ball'], ['cobblemon:black_apricorn', 'cobblemon:yellow_apricorn', '2x cobblemon:red_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#forge:circuits/hv'], ['cobblemon:repeat_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 3)
  addASSRecipe(['timer_ball'], ['cobblemon:black_apricorn', 'cobblemon:red_apricorn', '2x cobblemon:white_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#forge:circuits/hv'], ['cobblemon:timer_ball'], ['gtceu:polyethylene 200'], [], EV, 16, 4)
  addASSRecipe(['dream_ball'], ['2x cobblemon:pink_apricorn', 'cobblemon:red_apricorn', '2x gtceu:tungsten_steel_plate', 'gtceu:tungsten_steel_ring', '#forge:circuits/iv'], ['cobblemon:dream_ball'], ['gtceu:polytetrafluoroethylene 200'], [], IV, 20, 2)

  event.recipes.gtceu.assembly_line('beast_ball')
    .itemInputs('4x gtceu:gold_plate', '4x minecraft:echo_shard', '2x #forge:plates/tritanium', '#forge:rings/silicone_rubber', '#forge:circuits/uv')
    .itemOutputs('cobblemon:beast_ball')
    .inputFluids('gtceu:soldering_alloy 600', 'gtceu:lubricant 1000', 'gtceu:styrene_butadiene_rubber 3000', 'gtceu:naquadria 576')
    .EUt(ZPM)
    .duration(500)

  event.recipes.gtceu.assembly_line('master_ball')
    .itemInputs('4x minecraft:shulker_shell', '4x minecraft:echo_shard', '2x #forge:plates/neutronium', '#forge:rings/silicone_rubber', '#forge:circuits/uhv')
    .itemOutputs('cobblemon:master_ball')
    .inputFluids('gtceu:soldering_alloy 600', 'gtceu:lubricant 1000', 'gtceu:sodium_potassium 12000')
    .EUt(UHV)
    .duration(1200)

  function shaped(name, a, b, c) {
    event.shaped(name, ['ABA', 'SCH', 'ABA'], { A: a, B: b, C: c, S: '#forge:tools/screwdrivers', H: '#forge:tools/hammers' })
  }
  shaped('cobblemon:poke_ball', 'cobblemon:red_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
  shaped('cobblemon:azure_ball', 'cobblemon:blue_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
  shaped('cobblemon:slate_ball', 'cobblemon:black_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
  shaped('cobblemon:verdant_ball', 'cobblemon:green_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
  shaped('cobblemon:citrine_ball', 'cobblemon:yellow_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
  shaped('cobblemon:premier_ball', 'cobblemon:white_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
  shaped('cobblemon:roseate_ball', 'cobblemon:pink_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')

  event.remove({ id: 'cobblemon:heal_powder' })
  event.recipes.gtceu.macerator('heal_powder')
    .itemInputs('cobblemon:revival_herb')
    .itemOutputs('cobblemon:heal_powder')
    .EUt(32)
    .duration(240)
  event.recipes.gtceu.mixer('medicinal_brew')
    .itemInputs('cobblemon:medicinal_leek')
    .inputFluids('minecraft:water 600')
    .outputFluids('gtceu:medicinal_brew 600')
    .duration(120)
    .EUt(16)
  event.recipes.gtceu.mixer('revive')
    .itemInputs('cobblemon:heal_powder')
    .inputFluids('gtceu:honey 200')
    .itemOutputs('cobblemon:revive')
    .EUt(32)
    .duration(240)
  function addMIXRecipe(name, itemInputs, itemOutputs, fluidInputs, fluidOutputs, eut, time, circuit) {
    const dur = time * 20
    const recipe = event.recipes.gtceu.mixer(name + '_mix').duration(dur).EUt(eut)
    if (itemInputs != null) {
      recipe.itemInputs(itemInputs)
    }
    if (fluidInputs != null) {
      recipe.inputFluids(fluidInputs)
    }
    if (itemOutputs != null) {
      recipe.itemOutputs(itemOutputs)
    }
    if (fluidOutputs != null) {
      recipe.outputFluids(fluidOutputs)
    }
    if (circuit != null) {
      recipe.circuit(circuit)
    }
  }

  addMIXRecipe(['pp_up'], ['2x cobblemon:leppa_berry', '2x cobblemon:pep_up_flower', '2x cobblemon:vivichoke'], ['cobblemon:pp_up'], ['gtceu:medicinal_brew 200'], [], LV, 6)
  addMIXRecipe(['zinc'], ['2x cobblemon:grepa_berry', '2x #cobblemon:zinc_ingredients', '2x cobblemon:pink_mint_leaf'], ['cobblemon:zinc'], ['gtceu:medicinal_brew 200'], [], LV, 6)
  addMIXRecipe(['protein'], ['2x cobblemon:kelpsy_berry', '2x #cobblemon:protein_ingredients', '2x cobblemon:red_mint_leaf'], ['cobblemon:protein'], ['gtceu:medicinal_brew 200'], [], LV, 6)
  addMIXRecipe(['calcium'], ['2x cobblemon:hondew_berry', '2x minecraft:bone_meal', '2x cobblemon:cyan_mint_leaf'], ['cobblemon:calcium'], ['gtceu:medicinal_brew 200'], [], LV, 6)
  addMIXRecipe(['iron'], ['2x cobblemon:qualot_berry', '2x minecraft:beetroot', '2x cobblemon:blue_mint_leaf'], ['cobblemon:iron'], ['gtceu:medicinal_brew 200'], [], LV, 6)
  addMIXRecipe(['hp_up'], ['2x cobblemon:pomeg_berry', '2x minecraft:sugar', '2x cobblemon:white_mint_leaf'], ['cobblemon:hp_up'], ['gtceu:medicinal_brew 200'], [], LV, 6)
  addMIXRecipe(['carbos'], ['2x cobblemon:tamato_berry', '2x minecraft:wheat', '2x cobblemon:green_mint_leaf'], ['cobblemon:carbos'], ['gtceu:medicinal_brew 200'], [], LV, 6)

  event.recipes.gtceu.assembler('healing_machine')
    .itemInputs('2x minecraft:copper_ingot', '5x minecraft:iron_ingot')
    .itemOutputs('cobblemon:healing_machine')
    .duration(120)
    .EUt(512)
  event.recipes.gtceu.assembler('pasture')
    .itemInputs('2x minecraft:wheat', '5x #minecraft:planks', 'minecraft:hopper', 'cobblemon:pc')
    .itemOutputs('cobblemon:pasture')
    .duration(120)
    .EUt(512)
  event.recipes.gtceu.assembler('pc')
    .itemInputs('2x minecraft:copper_ingot', '4x minecraft:iron_ingot', 'minecraft:glass', '2x minecraft:smooth_stone')
    .itemOutputs('cobblemon:pc')
    .duration(120)
    .EUt(512)
})
