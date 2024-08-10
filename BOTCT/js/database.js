
const SETUP_GOOD = 'SETUP_GOOD'
const NIGHTLY_GOOD = 'NIGHTLY_GOOD'
const NORMAL = 'NORMAL'
const SETUP_EVIL = 'SETUP_EVIL'
const NIGHTLY_EVIL = 'NIGHTLY_EVIL'

const TOWNSFOLK = 'townsfolk'
const OUTSIDERS = 'outsiders'
const MINIONS = 'minions'
const DEMONS = 'demons'

const NO_PRIORITY = 99


const TheImp = {
    name: "Imp",
    type: DEMONS,
    isGood: false,
    category: NIGHTLY_EVIL,
    effect: 'Imp points at someone. They die.'
}

const roles = [
    {
        name: "Washerwoman",
        type: TOWNSFOLK,
        isGood: true,
        category: SETUP_GOOD,
        effect: 'Show 2 people and a Townsfolk role. One of them is that role.'
    },
    {
        name: "Librarian",
        type: TOWNSFOLK,
        isGood: true,
        category: SETUP_GOOD,
        effect: 'Show 2 people and an Outsider role. One of them is that role.'
    },
    {
        name: "Investigator",
        type: TOWNSFOLK,
        isGood: true,
        category: SETUP_GOOD,
        effect: 'Show 2 people and a Minion role. One of them is that role.'
    },
    {
        name: "Chef",
        type: TOWNSFOLK,
        isGood: true,
        category: SETUP_GOOD,
        effect: 'Show how many evil pairs there are.'
    },
    {
        name: "Empath",
        type: TOWNSFOLK,
        isGood: true,
        category: NIGHTLY_GOOD,
        effect: 'Show how many of their alive neighbors is evil.'
    },
    {
        name: "Fortune Teller",
        type: TOWNSFOLK,
        isGood: true,
        category: NIGHTLY_GOOD,
        effect: 'Fortune Teller choose 2 players. Nod if either is a Demon.'
    },
    {
        name: "Undertaker",
        type: TOWNSFOLK,
        isGood: true,
        category: NIGHTLY_GOOD,
        effect: 'Show them the role of the person that died by execution.'
    },
    {
        name: "Monk",
        type: TOWNSFOLK,
        isGood: true,
        category: NIGHTLY_GOOD,
        effect: 'Monk points at someone. They are protected from the Evil.'
    },
    {
        name: "Ravenkeeper",
        type: TOWNSFOLK,
        isGood: true,
        category: NORMAL,
        effect: 'If Ravenkeeper dies, they wake up and choose a player. Show them their role.'
    },
    {
        name: "Virgin",
        type: TOWNSFOLK,
        isGood: true,
        category: NORMAL,
        effect: 'If you are nominated, the nominator dies.'
    },
    {
        name: "Slayer",
        type: TOWNSFOLK,
        isGood: true,
        category: NORMAL,
        effect: 'Once per game, choose a player. If they are the Demon, they die.'
    },
    {
        name: "Soldier",
        type: TOWNSFOLK,
        isGood: true,
        category: NORMAL,
        effect: 'You are safe from the Demon.'
    },
    {
        name: "Mayor",
        type: TOWNSFOLK,
        isGood: true,
        category: NORMAL,
        effect: 'If only 3 players live and no execution occurs, you win. If Mayor is eaten, somone else might be eaten.'
    },

    {
        name: "Butler",
        type: OUTSIDERS,
        isGood: true,
        category: NIGHTLY_GOOD,
        effect: 'Butler chooses a player. They can only vote if they vote.'
    },
    {
        name: "Drunk",
        type: OUTSIDERS,
        isGood: true,
        category: NORMAL,
        effect: 'Drunk believes is a role, but is actually not. They get wrong or random information.'
    },
    {
        name: "Recluse",
        type: OUTSIDERS,
        isGood: true,
        category: NORMAL,
        effect: 'Recluse might register as Evil, even if dead.'
    },
    {
        name: "Saint",
        type: OUTSIDERS,
        isGood: true,
        category: NORMAL,
        effect: 'If Saint dies by execution, Townsfolk lose.'
    },

    {
        name: "Poisoner",
        type: MINIONS,
        isGood: false,
        category: NIGHTLY_EVIL,
        effect: 'Poisoner chooses a player. That player becomes poisoned this night and the following day.'
    },
    {
        name: "Spy",
        type: MINIONS,
        isGood: false,
        category: NIGHTLY_EVIL,
        effect: 'Spy can see all roles. Spy might register as Good, even if dead.'
    },
    {
        name: "Scarlet Woman",
        type: MINIONS,
        isGood: false,
        category: NORMAL,
        effect: 'If Imp dies, Scarleet Woman becomes Imp (only if there are 5 or more people alive)'
    },
    {
        name: "Baron",
        type: MINIONS,
        isGood: false,
        category: NORMAL,
        effect: 'There are 2 extra Outsiders.'
    },

    TheImp
]



const firstNightOrder = [
    'Imp',
    "Poisoner",
    'Spy',
    'Washerwoman',
    'Librarian',
    'Investigator',
    'Chef',
    'Empath',
    'Fortune Teller',
    'Butler'
]
function getSetupRolePriority(roleName) {
    const index = firstNightOrder.indexOf(roleName)
    if (index == -1) {
        return NO_PRIORITY
    }
    return index
}

const everyNightOrder = [
    'Poisoner',
    'Monk',
    'Spy',
    'Scarlet Woman',
    'Imp',
    'Ravenkeeper',
    'Undertaker',
    'Empath',
    'Fortune Teller',
    'Butler'
]
function getNightlyRolePriority(roleName) {
    const index = everyNightOrder.indexOf(roleName)
    if (index == -1) {
        return NO_PRIORITY
    }
    return index
}

function getRole(name) {
    return roles.find(role => role.name == name)
}