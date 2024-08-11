
<style>
    body {
        overflow: hidden;
    }
</style>

<script>

    import AddContactButton from "../../components/AddContactButton.svelte";
    import Contact from "../../components/Contact.svelte";
    import ContactList from "../../components/ContactList.svelte";
    import ContactListHeader from "../../components/ContactListHeader.svelte";
    import MyComp from "../../components/MyComp.svelte";
    import { Scaffold, SidenavItem, SidenavButton } from "saraui"
    import SideMenu from "../../components-standalone/SideMenu.svelte";
    import DrawerPage from "../../components-standalone/DrawerPage.svelte";
    import RoleChooserDrawer from "../../components/RoleChooserDrawer.svelte";
    import { BEGINNER, getRoles, getRolesByDifficulty } from "../../lib/Database";
    import { contactsStore } from "../../stores/contacts-store";
    import Modal from "../../components-standalone/Modal.svelte";
    import { randomInt } from "../../lib/utils";

    // import { contactsStore } from '../stores/contacts-store'

    let isRoleChooserOpen = false
    let availableRoles = getRolesByDifficulty(BEGINNER).map(role => randomInt(0, 1) == 1? {...role, isInGame: true} : {...role, isInGame: false})
    let contacts = [{
        name: 'Alien',
        subtitle: 'Dave',
        isEditMode: false,
        isExpanded: false
    },
    {
        name: 'Scapegoat',
        subtitle: 'Calin',
        isEditMode: false,
        isExpanded: false
    },
    {
        name: 'Schizophrenic',
        subtitle: 'Bober',
        isEditMode: false,
        isExpanded: false
    }]

    let currentlySelectedRoleI
    let onChooseRoleI


    function addContact() {
        let newContact = {
            name: null,
            subtitle: '',
            isExpanded: false,
            isEditMode: true
        }
        contacts = [...contacts, newContact]
    }
    function removeContact(i) {
        contacts.splice(i, 1)
        contacts = contacts
    }


    function setContactState(i, newState) {
        const newContacts = [...contacts]
        newContacts[i] = newState
        contacts = newContacts
    }

    function openRoleChangeMenuForPlayerI(i) {
        currentlySelectedRoleI = i
        isRoleChooserOpen = true
    }
    function changeRole(playerI, newRoleI) {
        const i = newRoleI
        isRoleChooserOpen = false
        const contactState = contacts[playerI]
        const previousRoleName = contactState.name
        const newContactState = {...contactState, name: availableRoles[i].name}
        contacts[playerI] = newContactState
        contacts = contacts
        invalidateAvailableRole(i)
        if (previousRoleName != null) {
            validateUnavailbleRole(previousRoleName)
        }
    }

    function invalidateAvailableRole(i) {
        availableRoles[i].isValid = false
        availableRoles = availableRoles
    }
    function validateUnavailbleRole(roleName) {
        const thisRole = availableRoles.find(role => role.name == roleName)
        if (thisRole == null) {
            console.log("ERROR: Role to validate " + roleName + " not found!")
            return
        }
        thisRole.isValid = true
        availableRoles = availableRoles
    }



    let isModalOpen = false
    let currentModalRoleName = 'Werewolf'
    function openModalWithRoleName(roleName) {
        currentModalRoleName = roleName
        isModalOpen = true
    }




</script>

<Modal isOpen={isModalOpen} setIsOpen={bool => isModalOpen = bool}>
    <img style="width: 100%" src="images/cards/{currentModalRoleName}.png"/>
</Modal>

<RoleChooserDrawer
    isOpen={isRoleChooserOpen} setIsOpen={bool => isRoleChooserOpen = bool}
    roleStates={[...availableRoles]} setRoleStates={newRoles => availableRoles = newRoles}
    onClickOnRole={clickedRoleI => changeRole(currentlySelectedRoleI, clickedRoleI)}    
/>

<ContactListHeader/>

<div class="page">
    <ContactList>
        {#each contacts.keys() as i (contacts[i].name + i)}
            <Contact
                state={contacts[i]} setState={(newState) => setContactState(i, newState)}
                on:change-role={() => openRoleChangeMenuForPlayerI(i)}
                on:show-portrait={() => openModalWithRoleName(contacts[i].name)}
            >
                <div class="flex-content wrap">
                    <button class="btn red" on:click={() => removeContact(i)}>Remove</button>
                    <button class="btn blue" on:click={() => openRoleChangeMenuForPlayerI(i)}>Change Role</button>
                    
                    <br> <button class="btn blue" on:click={() => {}}>Change Role (Any)</button>
                </div>
            </Contact>
        {/each}
    </ContactList>    
</div>