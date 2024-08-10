function createRoleDiv({ name, type, playerName, isDrunk }) {
    const div = dom(`
        <div class="role-wrapper" data-type="${type}" data-is-drunk="${isDrunk}">
            <div class="image-wrapper">
                <img src="images/${name}.png">
            </div>
            <div class="role role-${isDrunk === true? 'outsiders' : type}">
                <span class="role-name">${name}</span>
                ${ isDrunk == true ? "(Drunk)" : "" }
            </div>
            <input class="name-input" value="${playerName}">
        </div>
    `)

    function openThisModal() {
        const thisRole = getRole(name)
        index.showModalWithContent([
            dom(`<img src="images/${name}.png">`),
            dom(`<h3 style="text-align: center; padding: 2vw;">${thisRole.effect}</h3>`),
        ])
    }

    div.querySelector('.image-wrapper').addEventListener('click', (evt) => {
        openThisModal()   
    })
    div.querySelector('.role').addEventListener('click', evt => {
        openThisModal()
    })

    return div
}


// [{ name, type, playerName, isDrunk }]
function setHTMLRolesState(roleStates) {
    const rolesDivs = roleStates.map(state => createRoleDiv(state))

    const rolesDiv = document.querySelector('#Roles-Wrapper')
    rolesDiv.innerHTML = ''
    rolesDiv.append(...rolesDivs)
}

function getHTMLRoleStates() {
    const rolesWrapperDiv = document.querySelector('#Roles-Wrapper')
    const rolesDivs = Array.from(rolesWrapperDiv.querySelectorAll('.role-wrapper'))
    return rolesDivs.map(div => ({
        name: div.querySelector('.role-name').innerHTML.trim(),
        type: div.getAttribute('data-type'),
        isDrunk: div.getAttribute('data-is-drunk') == 'true',
        playerName: div.querySelector('.name-input').value
    }))
}