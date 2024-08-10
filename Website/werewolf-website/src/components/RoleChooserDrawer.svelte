
<style>
    :root {
        --role-chooser-image-size: 20vw;
    }
    .role-chooser-content {
        width: 100%;
        
        padding-left: 3vw;
        padding-left: 3vw;
        padding-top: 5vh;
        padding-bottom: 5vh;

        display: grid;
        grid-template-columns: auto auto auto;
        grid-row-gap: 6vw;
    }
    .role-box {
        /* width: var(--role-chooser-image-size); */
    }
    .gray-text {
        color: gray;
    }
    .role-box .title {
        padding-top: calc(0.1 * var(--role-chooser-image-size));
        text-align: center;
    }

</style>

<script>
    import DrawerPage from "../components-standalone/DrawerPage.svelte";
    import RoundCardPortrait from "./RoundCardPortrait.svelte";

    export let roleStates
    export let setRoleStates
    export let isOpen
    export let setIsOpen

    export let onClickOnRole

    function onPortraitClick(i) {
        if (roleStates[i].isValid == false) {
            return
        }
        onClickOnRole(i)
    }
</script>

<DrawerPage isOpen={isOpen}>
    <div class="role-chooser-content">

        {#each roleStates.keys() as i}
            <div class="role-box center-content" on:click={(evt) => onPortraitClick(i)}>
                <RoundCardPortrait name={roleStates[i].name} isValid={roleStates[i].isValid == false ? false : true}/>
                <div class={roleStates[i].isValid == false ? 'title gray-text strikethrough' : 'title'}>{roleStates[i].name}</div>
            </div>
        {/each}

    </div>
</DrawerPage>