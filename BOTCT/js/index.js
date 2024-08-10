
function createSeparatorAfterFoundRole(roleStateToBoolFunc) {
    const rolesState = getHTMLRoleStates()
    console.log({rolesState})
    const firstRoleIndex = rolesState.findIndex(roleStateToBoolFunc)
    console.log({firstRoleIndex})
    const rolesWrapperDiv = document.querySelector('#Roles-Wrapper')
    const separator = dom(`
        <div class="separator"></div>
    `)
    rolesWrapperDiv.insertBefore(separator, rolesWrapperDiv.children[firstRoleIndex])
}

let index = {}
index = {
    generateRoles: function() {
        const nPeople = getSelectedNPlayers()
        const roles = getRolesByPeople(nPeople)

        const roleStates = roles.map(role => ({...role, playerName: ''}))
        setHTMLRolesState(roleStates)

        document.querySelector("#Top-Wrapper").remove()
        document.querySelector("#Sort-Wrapper").style.display = ''
    },

    loadSavedRoles() {
        const roleStates = getSavedRoleStates()
        if (roleStates == null) {
            return
        }
        setHTMLRolesState(roleStates)

        document.querySelector("#Top-Wrapper").remove()
        document.querySelector("#Sort-Wrapper").style.display = ''

    },

    sortBySetup: function() {
        let roleStates = getHTMLRoleStates()
        roleStates = roleStates.sort((a, b) => getSetupRolePriority(a.name) - getSetupRolePriority(b.name))
        setHTMLRolesState(roleStates)

        createSeparatorAfterFoundRole(role => getSetupRolePriority(role.name) == NO_PRIORITY)

        saveRolesStatesByHTML()
    },

    sortByNightly: function() {
        let roleStates = getHTMLRoleStates()
        roleStates = roleStates.sort((a, b) => getNightlyRolePriority(a.name) - getNightlyRolePriority(b.name))
        setHTMLRolesState(roleStates)

        createSeparatorAfterFoundRole(role => getNightlyRolePriority(role.name) == NO_PRIORITY)

        saveRolesStatesByHTML()
    },

    closeModal: function() {
        document.querySelector('.modal').style.display = 'none'
    },

    showModalWithContent(domElem) {
        document.querySelector('.modal').style.display = ''
        document.querySelector('.modal-content').innerHTML = ''
        if (Array.isArray(domElem)) {
            for (const elem of domElem) {
                document.querySelector('.modal-content').appendChild(elem)
            }
        } else {
            document.querySelector('.modal-content').appendChild(domElem)
        }
    },

    showImpRoles() {
        const threeRoles = get3RandomUnusedRolesByHTML()
        index.showModalWithContent([
            dom(`<img src="images/${threeRoles[0].name}.png">`),
            dom(`<img src="images/${threeRoles[1].name}.png">`),
            dom(`<img src="images/${threeRoles[2].name}.png">`)
        ])
    }
}