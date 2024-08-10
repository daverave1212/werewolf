import { arrayFindHighest, arrayFindIndexLowest, arrayFindLowest, percentChance, popArrayElementAt, popArrayElementFind, randomOf, randomizeArray, sum, times } from "./utils"

export const WEREWOLVES = 'werewolves'
export const TOWNSFOLK = 'townsfolk'
export const OTHER = 'other'

export const BEGINNER = 1
export const INTERMEDIATE = 2
export const ADVANCED = 3
export const COMPLETE = 4

export const NIGHTLY_WEREWOLVES = 'nightly-werewolves'
export const SPECIAL_SETUP = 'special-setup'
export const SETUP = 'setup'
export const NIGHTLY = 'nightly'
export const REGULAR = 'regular'

// Each werewolf is worth 3.5 Villagers
const getMinimumNWerewolves = (nPlayers) => Math.floor((nPlayers + 1) / 5)

export const WEREWOLF = 'Werewolf'
export const EVIL = 'Any Evil'
const evilsByPlayers = {
    8:  [[WEREWOLF, EVIL]],
    9:  [[WEREWOLF, WEREWOLF]],
    10: [[WEREWOLF, WEREWOLF],  [WEREWOLF, EVIL, EVIL]],
    11: [[WEREWOLF, WEREWOLF, EVIL]],
    12: [[WEREWOLF, WEREWOLF, EVIL]],
    13: [[WEREWOLF, WEREWOLF, EVIL, EVIL]],
    14: [[WEREWOLF, WEREWOLF, WEREWOLF],  [WEREWOLF, WEREWOLF, EVIL, EVIL]],
    15: [[WEREWOLF, WEREWOLF, WEREWOLF],  [WEREWOLF, WEREWOLF, EVIL, EVIL]],
    16: [[WEREWOLF, WEREWOLF, WEREWOLF, EVIL]],
    17: [[WEREWOLF, WEREWOLF, WEREWOLF, EVIL]],
    18: [[WEREWOLF, WEREWOLF, WEREWOLF, EVIL, EVIL]],
    19: [[WEREWOLF, WEREWOLF, WEREWOLF, WEREWOLF], [WEREWOLF, WEREWOLF, WEREWOLF, EVIL, EVIL, EVIL]],
    20: [[WEREWOLF, WEREWOLF, WEREWOLF, WEREWOLF], [WEREWOLF, WEREWOLF, WEREWOLF, EVIL, EVIL, EVIL]],
}


const Werewolf = {
    name: "Werewolf",
    isWerewolf: true,
    nPlayers: 0,
    team: WEREWOLVES,
    worth: -4,
    category: NIGHTLY_WEREWOLVES,
    difficulty: BEGINNER
}
const Cultist = {
    name: "Cultist",
    nPlayers: 0,
    team: WEREWOLVES,
    worth: -0.75,
    category: REGULAR,
    difficulty: BEGINNER
}
const Peasant = {
    name: "Peasant",
    nPlayers: 0,
    team: TOWNSFOLK,
    worth: 1,
    difficulty: BEGINNER,
    category: REGULAR
}
export const getRoles = () => [
    {
        name: "Alpha",
        isWerewolf: true,
        nPlayers: 10,
        team: WEREWOLVES,
        worth: -3.5,
        category: NIGHTLY_WEREWOLVES,
        difficulty: COMPLETE
    },
    {...Werewolf},
    {...Cultist},
    {
        name: "Hazer",
        nPlayers: 11,
        team: WEREWOLVES,
        worth: -2,
        category: NIGHTLY_WEREWOLVES,
        difficulty: INTERMEDIATE
    },
    {
        name: "Silencer",
        nPlayers: 12,
        team: WEREWOLVES,
        worth: -2,
        category: NIGHTLY_WEREWOLVES,
        difficulty: ADVANCED
    },


    {
        name: "Philosopher",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1,
        category: SPECIAL_SETUP,
        difficulty: INTERMEDIATE
    },
    {
        name: "Exorcist",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1.5,
        category: SPECIAL_SETUP,
        difficulty: COMPLETE
    },
    {
        name: "Copycat",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1.75,
        category: SPECIAL_SETUP,
        difficulty: COMPLETE
    },

    {
        name: "Blind Inspector",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1.5,
        category: SETUP,
        difficulty: INTERMEDIATE
    },
    {
        name: "Fortune Teller",
        nPlayers: 10,
        team: TOWNSFOLK,
        worth: 1.75,
        category: SETUP,
        difficulty: BEGINNER
    },
    {
        name: "Rival",
        nPlayers: 11,
        team: TOWNSFOLK,
        worth: 1,
        category: SETUP,
        difficulty: ADVANCED,
        isSpecial: true
    },
    {
        name: "Lover",
        nPlayers: 10,
        team: TOWNSFOLK,
        worth: 0.75,
        category: SETUP,
        difficulty: INTERMEDIATE,
        isSpecial: true
    },

    {
        name: "Seer",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1.75,
        category: NIGHTLY,
        difficulty: INTERMEDIATE
    },
    {
        name: "Town Guard",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1.75,
        category: NIGHTLY,
        difficulty: BEGINNER
    },
    {
        name: "Assassin",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1.25,
        category: NIGHTLY,
        difficulty: INTERMEDIATE
    },
    {
        name: "Priest",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1.75,
        category: NIGHTLY,
        difficulty: INTERMEDIATE
    },
    {
        name: "Schizophrenic",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 0.75,
        category: NIGHTLY,
        difficulty: ADVANCED
    },

    {
        name: "Butler",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1,
        category: REGULAR,
        difficulty: INTERMEDIATE
    },
    {
        name: "Inquisitor",
        nPlayers: 12,
        team: TOWNSFOLK,
        worth: 1.75,
        category: REGULAR,
        difficulty: COMPLETE
    },
    {
        name: "Mayor",
        nPlayers: 10,
        team: TOWNSFOLK,
        worth: 1.5,
        category: REGULAR,
        difficulty: COMPLETE
    },
    {
        name: "Witch Hunter",
        nPlayers: 10,
        team: TOWNSFOLK,
        worth: 1.25,
        category: REGULAR,
        difficulty: ADVANCED
    },
    {
        name: "Gangster",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1.25,
        category: REGULAR,
        difficulty: COMPLETE
    },
    {
        name: "Thief",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1,
        category: REGULAR,
        difficulty: ADVANCED
    },
    {
        name: "Crusader",
        nPlayers: 10,
        team: TOWNSFOLK,
        worth: 0.75,
        category: REGULAR,
        difficulty: INTERMEDIATE
    },
    {
        name: "Scapegoat",
        nPlayers: 10,
        team: TOWNSFOLK,
        worth: 2,
        category: REGULAR,
        difficulty: ADVANCED
    },
    {
        name: "Wrestler",
        nPlayers: 8,
        team: TOWNSFOLK,
        worth: 2,
        category: REGULAR,
        difficulty: BEGINNER
    },
    {
        name: "Cat",
        nPlayers: 10,
        team: TOWNSFOLK,
        worth: 2,
        category: REGULAR,
        difficulty: BEGINNER
    },
    {
        name: "Celebrity",
        nPlayers: 10,
        team: TOWNSFOLK,
        worth: 1.75,
        category: REGULAR,
        difficulty: COMPLETE
    },
    {
        name: "Archaeologist",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1,
        category: REGULAR,
        difficulty: COMPLETE
    },
    {
        name: "Fool",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 0.75,
        category: REGULAR,
        difficulty: COMPLETE
    },
    {
        name: "Sad Poet",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1,
        category: REGULAR,
        difficulty: INTERMEDIATE
    },
    {
        name: "Saint",
        nPlayers: 10,
        team: TOWNSFOLK,
        worth: 0.75,
        category: REGULAR,
        difficulty: BEGINNER
    },
    {
        name: "Star Child",
        nPlayers: 12,
        team: TOWNSFOLK,
        worth: 2,
        category: REGULAR,
        difficulty: ADVANCED
    },
    {
        name: "Hunter",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 1.25,
        category: REGULAR,
        difficulty: BEGINNER
    },
    {
        name: "Skinny Kid",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 0.5,
        category: REGULAR,
        difficulty: BEGINNER
    },
    {
        name: "Granny",
        nPlayers: 0,
        team: TOWNSFOLK,
        worth: 0.25,
        category: REGULAR,
        difficulty: ADVANCED
    },
    {
        name: "Madman",
        nPlayers: 0,
        team: OTHER,
        worth: 0.5,
        category: REGULAR,
        difficulty: ADVANCED
    },
    
    {
        name: "Alien",
        nPlayers: 0,
        team: OTHER,
        worth: 0.5,
        category: REGULAR,
        difficulty: COMPLETE
    },
    {
        name: "Diva",
        nPlayers: 9,
        team: OTHER,
        worth: 1,
        category: REGULAR,
        difficulty: ADVANCED
    },

    {...Peasant},

]

export function getRolesByDifficulty(difficulty) {
    return getRoles().filter(role => role.difficulty <= difficulty)
}

export function printRolesByDifficulty() {
    const roles = getRoles()
    console.log({roles})
    console.log({rolesBEGINNER: roles.filter(role => role.difficulty == BEGINNER)})
    console.log({rolesINTERMEDIATE: roles.filter(role => role.difficulty == INTERMEDIATE)})
    console.log({rolesADVANCED: roles.filter(role => role.difficulty == ADVANCED)})
    console.log({rolesCOMPLETE: roles.filter(role => role.difficulty == COMPLETE)})
}

export const NO_PRIORITY = 99
const setupOrder = [
    'Philosopher',
    'Exorcist',
    'Copycat',

    'Alpha',
    'Werewolf',

    'Blind Inspector',
    'Fortune Teller',
    'Rival'
]
export function getSetupRolePriority(roleOrRoleName) {
    let roleName = roleOrRoleName.name != null? roleOrRoleName.name : roleOrRoleName
    if (roleName == 'Rival A' || roleName == 'Rival B') {
        roleName = 'Rival'
    }
    const index = setupOrder.indexOf(roleName)
    if (index == -1) {
        return NO_PRIORITY
    }
    return index
}

const nightlyOrder = [
    'Werewolf',
    'Secondary Werewolf',
    'Town Guard',
    'Assassin',
    'Priest'
]
export function getNightlyRolePriority(roleOrRoleName) {
    let roleName = roleOrRoleName.name != null? roleOrRoleName.name : roleOrRoleName
    if (roleName == 'Alpha') {
        roleName = 'Werewolf'
    }
    if (roleName == 'Hazer' || roleName == 'Silencer') {
        roleName = 'Secondary Werewolf'
    }
    const index = nightlyOrder.indexOf(roleName)
    if (index == -1) {
        return NO_PRIORITY
    }
    return index
}



export function getRole(name) {
    return getRoles().find(role => role.name == name)
}



// TODO: I don't like the algorithm
// There should be a set number of evils every game
// Have a set number of Werewolves + Evils per players, then calculate villagers only by the villagers worth
// ALSO -- I deleted duplicates from the roles list
export function setupRoles(nPlayers, difficulty) {
    const baseGoodRoles = getRoles().filter(role => role.difficulty <= difficulty && role.team != WEREWOLVES && role.isSpecial != true)
    times(3, () => {
        baseGoodRoles.push(getRole('Peasant'))      // Add 3 extra Peasants
    })
    while (baseGoodRoles.length < nPlayers + 3) {   // Pad with Peasants
        baseGoodRoles.push(getRole('Peasant'))
    }
    const goodRoles = randomizeArray(baseGoodRoles) 
    const evilRoles = randomizeArray(getRoles().filter(role => role.difficulty <= difficulty && role.team == WEREWOLVES && role.isWerewolf != true))

    const rolesSoFar = []

    // First, correctly add enough werewolves and evil roles, judging by the evilsByPlayers table
    const evilsThisGame = randomOf(...evilsByPlayers[nPlayers])
    const nWerewolvesThisGame = evilsThisGame.filter(roleName => roleName == WEREWOLF).length
    const nNonWerewolfEvilsThisGame = evilsThisGame.length - nWerewolvesThisGame
    while (evilRoles.length < nNonWerewolfEvilsThisGame) {
        evilRoles.push(getRole('Cultist'))
    }
    
    times(nWerewolvesThisGame, () => {
        rolesSoFar.push(getRole('Werewolf'))
    })
    times(nNonWerewolfEvilsThisGame, () => {
        rolesSoFar.push(evilRoles.pop())
    })
    

    // Second, add townsfolk
    while (rolesSoFar.length < nPlayers) {
        rolesSoFar.push(goodRoles.pop())
    }

    const getWorthBalanceSoFar = () => sum(rolesSoFar.map(role => role.worth))


    // Third, balance it
    function popTownsfolkMatchingCondition(conditionRoleToBool) {
        const townsfolksMatching = rolesSoFar.filter(role => role.team != WEREWOLF && conditionRoleToBool(role))
        if (townsfolksMatching.length == 0)
            return null
        const chosenTownsfolk = randomOf(...townsfolksMatching)
        return popArrayElementFind(rolesSoFar, role => role.name == chosenTownsfolk.name)
    }
    function moveGoodTownsfolkMatchingConditionToRolesSoFar(conditionRoleToBool) {
        const unusedTownsfolks = goodRoles.filter(conditionRoleToBool)
        if (unusedTownsfolks.length == 0)
            return null
        const chosenNewTownsfolk = randomOf(...unusedTownsfolks)
        popArrayElementFind(goodRoles, role => role.name == chosenNewTownsfolk.name)
        rolesSoFar.push(chosenNewTownsfolk)
    }
    function replaceWeakTownsfolkWithStronger() {
        const removedTownsfolk = popTownsfolkMatchingCondition(role => role.worth <= 1)
        if (removedTownsfolk == null)
            return
        moveGoodTownsfolkMatchingConditionToRolesSoFar(role => role.worth >= removedTownsfolk.worth)
    }
    function replaceStrongTownsfolkWithWeaker() {
        const removedTownsfolk = popTownsfolkMatchingCondition(role => role.worth >= 1)
        if (removedTownsfolk == null)
            return
        moveGoodTownsfolkMatchingConditionToRolesSoFar(role => role.worth <= removedTownsfolk.worth)
    }

    while (Math.abs(getWorthBalanceSoFar()) >= 0.75) {
        const areTownsfolkTooWeak = getWorthBalanceSoFar() < 0
        if (areTownsfolkTooWeak) {
            replaceWeakTownsfolkWithStronger()
        } else {
            replaceStrongTownsfolkWithWeaker()
        }
    }
    
    console.log(`For ${nPlayers} people, difficulty ${difficulty}, worth balance is: ${getWorthBalanceSoFar()}`)
    console.log(rolesSoFar)
}

export function setupRolesOLD(nPlayers, difficulty) {
    let goodRoles = randomizeArray(getRoles().filter(role => role.difficulty <= difficulty && role.team != WEREWOLVES))
    let evilRoles = randomizeArray(getRoles().filter(role => role.difficulty <= difficulty && role.team == WEREWOLVES && role.name != 'Werewolf' && role.name != 'Alpha'))

    let rolesSoFar = []

    // First, assume the baseline of 3:1 Townsfolk:Werewolves ratio
    const nBaselineWerewolves = getMinimumNWerewolves(nPlayers)
    times(nBaselineWerewolves, () => {
        rolesSoFar.push(getRole('Werewolf'))
    })
    while (rolesSoFar.length < nPlayers) {
        const randomGoodRole = goodRoles.shift()
        rolesSoFar.push(randomGoodRole)
    }

    console.log({rolesSoFar})

    // Secondly, try to balance roles
    const getWorthBalanceSoFar = () => sum(rolesSoFar.map(role => role.worth))
    function popWeakestTownsfolkSoFar() {
        const nonWerewolvesSoFar = rolesSoFar.filter(role => role.team != WEREWOLVES)
        console.log({nonWerewolvesSoFar})
        const weakestRoleSoFar = arrayFindLowest(nonWerewolvesSoFar, role => role.worth)
        console.log({weakestRoleSoFar})
        const weakestRole = popArrayElementFind(rolesSoFar, role => role.name == weakestRoleSoFar.name)
        return weakestRole
    }
    function popStrongestTownsfolkSoFar() {
        const nonWerewolvesSoFar = rolesSoFar.filter(role => role.team != WEREWOLVES)
        const strongestRoleSoFar = arrayFindHighest(nonWerewolvesSoFar, role => role.worth)
        const strongestRole = popArrayElementFind(rolesSoFar, role => role.name == strongestRoleSoFar.name)
        return strongestRole
    }
    function replaceWerewolfWithWeakerEvil() {
        const removedWerewolf = popArrayElementFind(rolesSoFar, role => role.isWerewolf)
        const newEvil = evilRoles.shift()
        rolesSoFar.push(newEvil)
    }
    function replaceWeakestTownsfolkWithStronger() {
        const weakestRole = popWeakestTownsfolkSoFar()
        randomizeArray(goodRoles)
        goodRoles.push(weakestRole)
        
        rolesSoFar.push(goodRoles.shift())
    }
    function replaceWeakestTownsfolkWithEvil() {
        const weakestRole = popWeakestTownsfolkSoFar()
        randomizeArray(goodRoles)
        goodRoles.push(weakestRole)

        if (percentChance(75) && evilRoles.length > 0) {
            rolesSoFar.push(evilRoles.shift())
        } else {
            rolesSoFar.push(getRole('Werewolf'))
        }
    }
    function replaceStrongestTownsfolkWithWeaker() {
        const strongestRole = popStrongestTownsfolkSoFar()
        randomizeArray(goodRoles)
        goodRoles.push(strongestRole)

        rolesSoFar.push(goodRoles.shift())
    }

    let nChanges = 0
    while (Math.abs(getWorthBalanceSoFar()) >= 1) {
        const areVillagersTooWeak = getWorthBalanceSoFar() < 0
        const areWerewolvesTooWeak = getWorthBalanceSoFar() > 0
        if (areVillagersTooWeak) {
            const areThereEnoughWerewolvesToRemoveOne = rolesSoFar.filter(role => role.isWerewolf).length >= getMinimumNWerewolves(nPlayers)
            if (areThereEnoughWerewolvesToRemoveOne && percentChance(75)) {  // Replace werewolf with different weaker role
                replaceWerewolfWithWeakerEvil()
            } else {
                replaceWeakestTownsfolkWithStronger()
            }
        }
        if (areWerewolvesTooWeak) {
            if (percentChance(50)) {
                replaceWeakestTownsfolkWithEvil()
            } else {
                replaceStrongestTownsfolkWithWeaker()
            }
        }
        nChanges += 1
    }

    console.log({
        nChanges,
        rolesSoFar: rolesSoFar.sort((a, b) => a.worth - b.worth),
        balance: getWorthBalanceSoFar()
    })
    
}