<style>

</style>

<script>
    import AddContactButton from "../../components/AddContactButton.svelte";
import Contact from "../../components/Contact.svelte";
import ContactList from "../../components/ContactList.svelte";
    import ContactListHeader from "../../components/ContactListHeader.svelte";

    let players = []

    function setPlayerStateI(i, newState) {
        players[i] = newState
        players = players
    }

    function addPlayer() {
        const newContact = {
            name: null,
            subtitle: '',
            isExpanded: false,
            isEditMode: true
        }
        players = [...players, newContact]
    }

    function removePlayer(i) {
        players.splice(i, 1)
        players = players
    }

</script>

<ContactListHeader></ContactListHeader>
<div class="page">
    <ContactList>
        {#each players.keys() as i}
            <Contact
                state={players[i]} setState={newState => setPlayerStateI(i, newState)}
                isPortraitCentered={true}
                on:change-role={() => {
                    setPlayerStateI(i, {...players[i], isExpanded: !players[i].isExpanded})
                }}
            >
                <button class="btn red" on:click={() => removePlayer(i)}>Remove</button>
            </Contact>
        {/each}
        <AddContactButton onClick={addPlayer}>+</AddContactButton>
        <a class="btn big colorful" href="/difficulty-select">Next</a>
    </ContactList>
</div>