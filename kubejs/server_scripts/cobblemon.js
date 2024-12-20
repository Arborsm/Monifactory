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
    const {entity} = event
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
    addASSRecipe(['poke_ball'], ['2x cobblemon:red_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:poke_ball'], [], [], LV, 4, 21)
    addASSRecipe(['slate_ball'], ['2x cobblemon:black_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:slate_ball'], [], [], LV, 6, 21)
    addASSRecipe(['verdant_ball'], ['2x cobblemon:green_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:verdant_ball'], [], [], LV, 6, 21)
    addASSRecipe(['azure_ball'], ['2x cobblemon:blue_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:azure_ball'], [], [], LV, 6, 21)
    addASSRecipe(['citrine_ball'], ['2x cobblemon:yellow_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:citrine_ball'], [], [], LV, 6, 21)
    addASSRecipe(['premier_ball'], ['2x cobblemon:white_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:premier_ball'], [], [], LV, 6, 21)
    addASSRecipe(['roseate_ball'], ['2x cobblemon:pink_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring'], ['cobblemon:roseate_ball'], [], [], LV, 6, 21)
    addASSRecipe(['heal_ball'], ['cobblemon:pink_apricorn', 'cobblemon:white_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring', '#gtceu:circuits/lv'], ['cobblemon:heal_ball'], ['gtceu:medicinal_brew 200'], [], LV, 6, 21)
    addASSRecipe(['safari_ball'], ['cobblemon:green_apricorn', 'cobblemon:yellow_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring', '#gtceu:circuits/lv'], ['cobblemon:safari_ball'], [], [], LV, 6, 21)
    addASSRecipe(['cherish_ball'], ['3x #gtceu:gems/almandine_exquisite', '2x #gtceu:plates/double/stainless_steel', 'gtceu:silver_ring', '#gtceu:circuits/hv'], ['cobblemon:cherish_ball'], [], [], HV, 15)
    addASSRecipe(['friend_ball'], ['cobblemon:red_apricorn', 'cobblemon:green_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:friend_ball'], ['gtceu:tin 200'], [], MV, 8, 6)
    addASSRecipe(['great_ball'], ['cobblemon:red_apricorn', 'cobblemon:blue_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:great_ball'], ['gtceu:tin 200'], [], MV, 8, 9)
    addASSRecipe(['level_ball'], ['cobblemon:red_apricorn', 'cobblemon:black_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:level_ball'], ['gtceu:tin 200'], [], MV, 8, 7)
    addASSRecipe(['lure_ball'], ['cobblemon:red_apricorn', 'cobblemon:blue_apricorn', 'cobblemon:green_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:lure_ball'], ['gtceu:tin 200'], [], MV, 8, 4)
    addASSRecipe(['moon_ball'], ['cobblemon:black_apricorn', 'cobblemon:blue_apricorn', 'cobblemon:yellow_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:moon_ball'], ['gtceu:tin 200'], [], MV, 8, 8)
    addASSRecipe(['net_ball'], ['cobblemon:white_apricorn', 'cobblemon:blue_apricorn', 'cobblemon:black_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:net_ball'], ['gtceu:tin 200'], [], MV, 8, 9)
    addASSRecipe(['park_ball'], ['cobblemon:red_apricorn', '2x cobblemon:green_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:park_ball'], ['gtceu:tin 200'], [], MV, 8, 10)
    addASSRecipe(['sport_ball'], ['2x cobblemon:red_apricorn', 'cobblemon:white_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:sport_ball'], ['gtceu:tin 200'], [], MV, 8, 11)
    addASSRecipe(['dive_ball'], ['cobblemon:white_apricorn', '2x cobblemon:blue_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:dive_ball'], ['gtceu:tin 200'], [], MV, 8, 12)
    addASSRecipe(['fast_ball'], ['cobblemon:red_apricorn', 'cobblemon:yellow_apricorn', '2x gtceu:iron_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:fast_ball'], ['gtceu:tin 200'], [], MV, 8, 13)
    addASSRecipe(['heavy_ball'], ['cobblemon:blue_apricorn', 'cobblemon:black_apricorn', '4x gtceu:lead_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:heavy_ball'], ['gtceu:lead 400'], [], MV, 16)
    addASSRecipe(['nest_ball'], ['2x cobblemon:green_apricorn', '2x cobblemon:yellow_apricorn', '4x gtceu:lead_plate', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:nest_ball'], ['gtceu:lead 400'], [], MV, 16)
    addASSRecipe(['ultra_ball'], ['cobblemon:black_apricorn', 'cobblemon:yellow_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:ultra_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 5)
    addASSRecipe(['dusk_ball'], ['cobblemon:black_apricorn', 'cobblemon:green_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:dusk_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 9)
    addASSRecipe(['luxury_ball'], ['2x cobblemon:black_apricorn', 'cobblemon:red_apricorn', '2x gtceu:gold_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:luxury_ball'], ['gtceu:rose_gold 400'], [], EV, 16)
    addASSRecipe(['quick_ball'], ['cobblemon:blue_apricorn', 'cobblemon:yellow_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:quick_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 9)
    addASSRecipe(['repeat_ball'], ['cobblemon:black_apricorn', 'cobblemon:yellow_apricorn', '2x cobblemon:red_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:repeat_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 3)
    addASSRecipe(['timer_ball'], ['cobblemon:black_apricorn', 'cobblemon:red_apricorn', '2x cobblemon:white_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:timer_ball'], ['gtceu:polyethylene 200'], [], EV, 16, 4)
    addASSRecipe(['love_ball'], ['3x cobblemon:pink_apricorn', 'cobblemon:white_apricorn', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:love_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 6)
    addASSRecipe(['dream_ball'], ['2x cobblemon:pink_apricorn', 'cobblemon:red_apricorn', '2x gtceu:tungsten_steel_plate', 'gtceu:tungsten_steel_ring', '#gtceu:circuits/iv'], ['cobblemon:dream_ball'], ['gtceu:polytetrafluoroethylene 200'], [], IV, 20, 9)
    addASSRecipe(['ancient_great_ball'], ['2x cobblemon:blue_apricorn', '2x gtceu:tumblestone', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:ancient_great_ball'], ['gtceu:tin 200'], [], MV, 8, 13)
    addASSRecipe(['ancient_wing_ball'], ['cobblemon:white_apricorn', 'cobblemon:blue_apricorn', '2x cobblemon:sky_tumblestone', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:ancient_wing_ball'], ['gtceu:tin 200'], [], MV, 8, 13)
    addASSRecipe(['ancient_leaden_ball'], ['2x cobblemon:black_apricorn', '2x cobblemon:black_tumblestone', 'gtceu:steel_ring', '#gtceu:circuits/mv'], ['cobblemon:ancient_leaden_ball'], ['gtceu:tin 200'], [], MV, 8, 13)
    addASSRecipe(['ancient_ultra_ball'], ['cobblemon:black_apricorn', 'cobblemon:yellow_apricorn', '2x cobblemon:tumblestone', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:ancient_ultra_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 13)
    addASSRecipe(['ancient_jet_ball'], ['cobblemon:white_apricorn', 'cobblemon:blue_apricorn', '2x cobblemon:sky_tumblestone', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:ancient_jet_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 13)
    addASSRecipe(['ancient_gigaton_ball'], ['2x cobblemon:black_apricorn', '2x cobblemon:black_tumblestone', '2x gtceu:titanium_plate', 'gtceu:stainless_steel_ring', '#gtceu:circuits/hv'], ['cobblemon:ancient_gigaton_ball'], ['gtceu:rose_gold 200'], [], EV, 16, 13)

    shaped('cobblemon:poke_ball', 'cobblemon:red_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
    shaped('cobblemon:azure_ball', 'cobblemon:blue_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
    shaped('cobblemon:slate_ball', 'cobblemon:black_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
    shaped('cobblemon:verdant_ball', 'cobblemon:green_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
    shaped('cobblemon:citrine_ball', 'cobblemon:yellow_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
    shaped('cobblemon:premier_ball', 'cobblemon:white_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
    shaped('cobblemon:roseate_ball', 'cobblemon:pink_apricorn', 'gtceu:copper_plate', 'gtceu:iron_ring')
    shaped('cobblemon:ancient_poke_ball', 'cobblemon:red_apricorn', 'cobblemon:tumblestone', 'gtceu:wrought_iron_ring')
    shaped('cobblemon:ancient_azure_ball', 'cobblemon:blue_apricorn', 'cobblemon:tumblestone', 'gtceu:wrought_iron_ring')
    shaped('cobblemon:ancient_citrine_ball', 'cobblemon:yellow_apricorn', 'cobblemon:tumblestone', 'gtceu:wrought_iron_ring')
    shaped('cobblemon:ancient_ivory_ball', 'cobblemon:white_apricorn', 'cobblemon:tumblestone', 'gtceu:wrought_iron_ring')
    shaped('cobblemon:ancient_verdant_ball', 'cobblemon:green_apricorn', 'cobblemon:tumblestone', 'gtceu:wrought_iron_ring')
    shaped('cobblemon:ancient_roseate_ball', 'cobblemon:pink_apricorn', 'cobblemon:tumblestone', 'gtceu:wrought_iron_ring')
    shaped('cobblemon:ancient_slate_ball', 'cobblemon:black_apricorn', 'cobblemon:tumblestone', 'gtceu:wrought_iron_ring')
    shaped('cobblemon:ancient_feather_ball', 'cobblemon:blue_apricorn', 'cobblemon:sky_tumblestone', 'gtceu:wrought_iron_ring')
    shaped('cobblemon:ancient_heavy_ball', 'cobblemon:black_apricorn', 'cobblemon:black_tumblestone', 'gtceu:wrought_iron_ring')

    addMIXRecipe(['pp_up'], ['2x cobblemon:leppa_berry', '2x cobblemon:pep_up_flower', '2x cobblemon:vivichoke'], ['cobblemon:pp_up'], ['gtceu:medicinal_brew 200'], [], LV, 6)
    addMIXRecipe(['zinc'], ['2x cobblemon:grepa_berry', '2x #cobblemon:zinc_ingredients', '2x cobblemon:pink_mint_leaf'], ['cobblemon:zinc'], ['gtceu:medicinal_brew 200'], [], LV, 6)
    addMIXRecipe(['protein'], ['2x cobblemon:kelpsy_berry', '2x #cobblemon:protein_ingredients', '2x cobblemon:red_mint_leaf'], ['cobblemon:protein'], ['gtceu:medicinal_brew 200'], [], LV, 6)
    addMIXRecipe(['calcium'], ['2x cobblemon:hondew_berry', '2x minecraft:bone_meal', '2x cobblemon:cyan_mint_leaf'], ['cobblemon:calcium'], ['gtceu:medicinal_brew 200'], [], LV, 6)
    addMIXRecipe(['iron'], ['2x cobblemon:qualot_berry', '2x minecraft:beetroot', '2x cobblemon:blue_mint_leaf'], ['cobblemon:iron'], ['gtceu:medicinal_brew 200'], [], LV, 6)
    addMIXRecipe(['hp_up'], ['2x cobblemon:pomeg_berry', '2x minecraft:sugar', '2x cobblemon:white_mint_leaf'], ['cobblemon:hp_up'], ['gtceu:medicinal_brew 200'], [], LV, 6)
    addMIXRecipe(['carbos'], ['2x cobblemon:tamato_berry', '2x minecraft:wheat', '2x cobblemon:green_mint_leaf'], ['cobblemon:carbos'], ['gtceu:medicinal_brew 200'], [], LV, 6)

    event.remove({output: 'cobblemon:beast_ball'})
    event.recipes.gtceu.assembly_line('beast_ball')
        .itemInputs('4x gtceu:gold_plate', '4x minecraft:echo_shard', '2x #gtceu:plates/tritanium', '#gtceu:rings/silicone_rubber', '#gtceu:circuits/uv')
        .itemOutputs('cobblemon:beast_ball')
        .inputFluids('gtceu:soldering_alloy 600', 'gtceu:lubricant 1000', 'gtceu:styrene_butadiene_rubber 3000', 'gtceu:naquadria 576')
        .EUt(ZPM)
        .duration(500)


    event.remove({output: 'cobblemon:master_ball'})
    event.recipes.gtceu.assembly_line('master_ball')
        .itemInputs('4x minecraft:shulker_shell', '4x minecraft:echo_shard', '2x #gtceu:plates/neutronium', '#gtceu:rings/silicone_rubber', '#gtceu:circuits/uhv')
        .itemOutputs('cobblemon:master_ball')
        .inputFluids('gtceu:soldering_alloy 600', 'gtceu:lubricant 1000', 'gtceu:sodium_potassium 12000')
        .EUt(UHV)
        .duration(1200)

    event.remove({output: 'cobblemon:heal_powder'})
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

    function addMIXRecipe(name, itemInputs, itemOutputs, fluidInputs, fluidOutputs, eut, time, circuit) {
        event.remove({ output: itemOutputs[0]})
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

    function shaped(name, a, b, c) {
        event.remove({ output: name})
        event.shaped(name, ['ABA', 'SCH', 'ABA'], {
            A: a,
            B: b,
            C: c,
            S: '#forge:tools/screwdrivers',
            H: '#forge:tools/hammers'
        })
    }

    function addASSRecipe(name, itemInputs, itemOutputs, fluidInputs, fluidOutputs, eut, time, circuit) {
        event.remove({ output: itemOutputs[0]})
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
})
