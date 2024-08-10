// http://bignose.whitetree.org/projects/botc/diy/

function getNDemonsByPeople(nPeople) {
    return 1
}
function getNMinionsByPeople(nPeople) {
    if (nPeople <= 9) return 1
    if (nPeople <= 12) return 2
    return 3
}
function getNOutsidersByPeople(nPeople) {
    const nPlayersToOutsiders = {
        5: 0,
        6: 1,
        7: 0,
        8: 1,
        9: 2,
        10: 0,
        11: 1,
        12: 2,
        13: 0,
        14: 1,
        15: 2
    }
    return nPlayersToOutsiders[nPeople]
}


function getSomeMinionRoles(nPeople) {
    const minions = randomizeArray(roles.filter(role => role.type == MINIONS))
    const nMinions = getNMinionsByPeople(nPeople)
    return minions.slice(0, nMinions)
}
function getSomeOutsidersRoles(rolesSoFar, nPeople) {
    const outsiders = randomizeArray(roles.filter(role => role.type == OUTSIDERS))
    let nOutsiders = getNOutsidersByPeople(nPeople)
    console.log(rolesSoFar.filter(role => role.name == 'Baron'))
    if (rolesSoFar.filter(role => role.name == 'Baron').length == 1) {
        nOutsiders += 2
    }
    return outsiders.slice(0, nOutsiders)
}
function getSomeTownsfolkRoles(nTownsfolk) {
    let townsfolk = randomizeArray(roles.filter(role => role.type == TOWNSFOLK))
    const townsfolkSoFar = []
    let townsfolkCategories = [SETUP_GOOD, NIGHTLY_GOOD, NORMAL]

    while (townsfolkSoFar.length < nTownsfolk) {
        const currentTownsfolkCategory = townsfolkCategories.shift()
        townsfolkCategories.push(currentTownsfolkCategory)

        const foundRoleIndex = townsfolk.findIndex(role => role.category == currentTownsfolkCategory)
        const foundRole = popArrayElementAt(townsfolk, foundRoleIndex)
        townsfolkSoFar.push(foundRole)
    }
    return townsfolkSoFar
}
function getDrunkRole(rolesSoFar) {
    const isRoleUsed = role => rolesSoFar.find(roleSoFar => roleSoFar.name == role.name) != null
    const rolesNotUsed = roles.filter(role => !isRoleUsed(role))

    let townsfolkCategories = [NIGHTLY_GOOD, SETUP_GOOD, NORMAL]
    for (const category of townsfolkCategories) {
        const foundRole = rolesNotUsed.find(role => role.category == category)
        if (foundRole != null) {
            return foundRole
        }
    }
    
    return null
}


function getRolesByPeople(nPeople) {

    let rolesSoFar = [TheImp]

    const minions = getSomeMinionRoles(nPeople)
    rolesSoFar = [...rolesSoFar, ...minions]

    const outsiders = getSomeOutsidersRoles(rolesSoFar, nPeople)
    rolesSoFar = [...rolesSoFar, ...outsiders]

    const nTownsfolk = nPeople - 1 - minions.length - outsiders.length
    const townsfolk = getSomeTownsfolkRoles(nTownsfolk)
    

    const isDrunkInGame = rolesSoFar.find(role => role.name == 'Drunk') != null
    if (isDrunkInGame) {
        const differentRole = getDrunkRole(townsfolk)
        const drunkIndex = rolesSoFar.findIndex(role => role.name == 'Drunk')
        rolesSoFar[drunkIndex] = {...differentRole, isDrunk: true}
    }

    rolesSoFar = [...rolesSoFar, ...townsfolk]

    console.log({rolesSoFar})
    return rolesSoFar
}


function getSelectedNPlayers() {
    const e = document.querySelector('#N-Players-Select')
    const text = e.options[e.selectedIndex].text
    return parseInt(text)
}

function getCurrentRolesByHTML() {
    const rolesWrapperDiv = document.querySelector('#Roles-Wrapper')
    const rolesNames = Array.from(rolesWrapperDiv.children)
        .map(div => div.querySelector('role').innerText.trim())
    const rolesInGame = rolesNames.map(roleName => roles.find(role => role.name == roleName))
    return rolesInGame
}

function get3RandomUnusedRolesByHTML() {
    const rolesThisGame = getHTMLRoleStates()
    const isRoleInGame = (roleState) => rolesThisGame.find(role => role.name == roleState.name) != null
    const townsfolkNotInGame = roles.filter(role => isRoleInGame(role) == false).filter(role => role.isGood)
    randomizeArray(townsfolkNotInGame)
    return townsfolkNotInGame.slice(0, 3)
}

function saveRolesStatesByHTML() {
    const rolesThisGame = getHTMLRoleStates()
    localStorage.setItem('rolesThisGame', JSON.stringify(rolesThisGame))
}
function getSavedRoleStates() {
    const rolesThisGameJSON = localStorage.getItem('rolesThisGame')
    if (rolesThisGameJSON == null) {
        return
    }
    return JSON.parse(rolesThisGameJSON)
}