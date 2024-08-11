
<style>
    :root {
        --role-chooser-image-size: 20vw;
    }
    .role-chooser-content {
        width: 100%;
        
        padding-left: 3vw;
        padding-left: 3vw;
        padding-top: 2vh;
        padding-bottom: 2vh;

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
    import { fly } from "svelte/transition";
    import DrawerPage from "../components-standalone/DrawerPage.svelte";
    import RoundCardPortrait from "./RoundCardPortrait.svelte";
    import { randomInt } from "../lib/utils";

    export let roleStates
    export let isOpen

    export let onClickOnRole

    function onPortraitClick(i) {
        if (roleStates[i].isValid == false) {
            return
        }
        onClickOnRole(i)
    }
</script>

<DrawerPage isOpen={isOpen}>
<!-- {#if extraRoleStates != null} -->
    <div class="center-content center-text padded">
        <br>
        <h2>Roles in this game</h2>
        <br>
        <p>These are all the roles automatically selected to be in this game.</p>
    </div>
<!-- {/if} -->
    <div class="role-chooser-content">

        {#each roleStates.keys() as i}
            {#if roleStates[i].isInGame != false}
                <div class="role-box center-content" on:click={(evt) => onPortraitClick(i)}>
                    <RoundCardPortrait name={roleStates[i].name} isValid={roleStates[i].isValid == false ? false : true}/>
                    <div class={roleStates[i].isValid == false ? 'title gray-text strikethrough' : 'title'}>{roleStates[i].name}</div>
                </div>
            {/if}
        {/each}

    </div>

    <div class="center-content center-text padded">
        <h2>Roles not in game</h2>
        <br>
        <p>These roles are NOT in the game (Strigoy can bluff as them, Philosopher gets one of them, etc).</p>
    </div>

    <div class="role-chooser-content">

        {#each roleStates.keys() as i}
            {#if roleStates[i].isInGame == false}
                <div class="role-box center-content" on:click={(evt) => onPortraitClick(i)}>
                    <RoundCardPortrait name={roleStates[i].name} isValid={roleStates[i].isValid == false ? false : true}/>
                    <div class={roleStates[i].isValid == false ? 'title gray-text strikethrough' : 'title'}>{roleStates[i].name}</div>
                </div>
            {/if}
        {/each}

    </div>
</DrawerPage>