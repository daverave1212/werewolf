
<style>
    body {
        overflow: hidden;
    }
</style>

<script>

    import AddContactButton from "../components/AddContactButton.svelte";
    import Contact from "../components/Contact.svelte";
    import ContactList from "../components/ContactList.svelte";
    import ContactListHeader from "../components/ContactListHeader.svelte";
    import MyComp from "../components/MyComp.svelte";
    import { Scaffold, SidenavItem, SidenavButton } from "saraui"
    import SideMenu from "../components/SideMenu.svelte";
    import DrawerPage from "../components-standalone/DrawerPage.svelte";
    import RoleChooserDrawer from "../components/RoleChooserDrawer.svelte";
    import { BEGINNER, getRoles, getRolesByDifficulty } from "../lib/Database";
    import { contactsStore } from "../stores/contacts-store";

    // import { contactsStore } from '../stores/contacts-store'

    let isRoleChooserOpen = false
    let availableRoles = getRolesByDifficulty(BEGINNER)
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

    function onContactChangeRoleClick(i) {
        currentlySelectedRoleI = i
        isRoleChooserOpen = true
    }
    function onClickOnRole(i) {
        invalidateAvailableRole(i)
        isRoleChooserOpen = false
        const contactState = contacts[currentlySelectedRoleI]
        const newContactState = {...contactState, name: availableRoles[i].name}
        contacts[currentlySelectedRoleI] = newContactState
        contacts = contacts
    }
    function invalidateAvailableRole(i) {
        availableRoles[i].isValid = false
        availableRoles = availableRoles
    }




</script>

<RoleChooserDrawer
    isOpen={isRoleChooserOpen} setIsOpen={bool => isRoleChooserOpen = bool}
    roleStates={[...availableRoles]} setRoleStates={newRoles => availableRoles = newRoles}
    onClickOnRole={onClickOnRole}    
/>

<ContactListHeader/>

<div class="page">
    <ContactList>
        {#each contacts.keys() as i (contacts[i].name + i)}
            <Contact state={contacts[i]} setState={(newState) => setContactState(i, newState)} onChangeRoleClick={() => onContactChangeRoleClick(i)} key={contacts[i].name}>
                <button class="btn red" on:click={() => removeContact(i)}>Remove</button>
            </Contact>
        {/each}
        <AddContactButton onClick={addContact}>+</AddContactButton>
    </ContactList>    
</div>