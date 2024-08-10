<style>
    :root {
        --menu-selected-color: rgb(186, 160, 255);
    }
    .page {
        text-align: center;
    }
    .cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 5%;
        grid-row-gap: 5vw;
    }
    .card {
        width: 100%;
        height: 100%;

        padding: 1rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        gap: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;

        background-color: white;
        transition: 0.25s;
    }
    .colorful {
        background-color: var(--menu-selected-color);
    }
    .card p {
        font-size: 0.8rem;
    }

    .image-wrapper {
        width: var(--role-chooser-image-size);
        height: var(--role-chooser-image-size);
        overflow: hidden;
        border-radius: 50%;
    }
    .image-wrapper img {
        --width: calc(0.55 * var(--role-chooser-image-size));
        width: calc(2.5 * var(--width));
        aspect-ratio: var(--card-aspect-ratio);
        margin-left: calc(-0.34 * var(--width));
        margin-top: calc(-0.34 * var(--width));
    }
</style>

<script>
    import RoleChooserDrawer from "../../components/RoleChooserDrawer.svelte";
    import RoundCardPortrait from "../../components/RoundCardPortrait.svelte";
    import { BEGINNER, getRolesByDifficulty, INTERMEDIATE } from "../../lib/Database";

    const difficulties = [
        {
            name: 'Kids',
            difficulty: BEGINNER,
            imageName: 'Peasant',
            description: 'Contains only Werewolves, Peasants and a Saint.'
        },
        {
            name: 'Beginner',
            difficulty: BEGINNER,
            imageName: 'Werewolf',
            description: 'Cointains some simple townsfolk roles and a Cultist Evil helper role.'
        },
        {
            name: 'Intermediate',
            difficulty: INTERMEDIATE,
            imageName: 'Seer',
            description: 'Contains a few more standard townsfolk roles and an extra Evil role.'
        },
        {
            name: 'Advanced',
            difficulty: INTERMEDIATE,
            imageName: 'Granny',
            description: 'Contains all essential good and evil roles, some chaos roles, and more!'
        },
        {
            name: 'Complete',
            difficulty: INTERMEDIATE,
            imageName: 'Fool',
            description: 'Contains all 40+ roles in the game! Some of them may be unbalanced, though.'
        }
    ]

    let isRolesDrawerOpen = false
    let availableDrawerRoles = []
    let selectedDifficultyName

    function openDrawerWithDifficultyRoles(difficulty) {
        availableDrawerRoles = getRolesByDifficulty(difficulty)
        isRolesDrawerOpen = true
    }
    
    function onClickOnDifficulty(difficulty) {
        if (selectedDifficultyName == difficulty.name) {
            openDrawerWithDifficultyRoles(difficulty.difficulty)
            return
        }
        selectedDifficultyName = difficulty.name
    }





    const mods = [
        {
            name: 'No Mods',
            imageName: 'MOD No Mod',
            description: 'Standard game play, no fancy rules.'
        },{
            name: 'Mods!',
            imageName: 'MOD Conspiracy',
            description: 'Each game will have an extra mod!'
        }
    ]
    let selectedModName
    function onClickOnMod(mod) {
        selectedModName = mod.name
    }

</script>


<RoleChooserDrawer
    isOpen={isRolesDrawerOpen} setIsOpen={(value) => isRolesDrawerOpen = value}
    roleStates={availableDrawerRoles} setRoleStates={() => {}}
    onClickOnRole={() => isRolesDrawerOpen = false}
/>
<div class="page">
    <br>
    <br>
    <br>
    <h2>Choose Game Difficulty</h2>
    <br>
    <p>Each game difficulty contains about 10 extra roles. The more advanced the difficulty, the more complex player choices will be!</p>
    <br>

    <div class="cards">
        {#each difficulties as difficulty}
            <div class="card shadowed rounded {selectedDifficultyName == difficulty.name? 'colorful' : ''}" on:click={() => onClickOnDifficulty(difficulty)}>
                <RoundCardPortrait name={difficulty.imageName} isValid={true}/>
                <h3>{difficulty.name}</h3>
                <p>{difficulty.description}</p>
            </div>
        {/each}
    </div>

    <br>
    <br>
    <br>
    <h2>Play With Mods?</h2>
    <br>
    <p>Mods are extra ways to spice up the game. Each mod will change some rules of the game. Maybe some players will have 2 roles, or maybe one player is hallucinating!</p>
    <br>

    <div class="cards">
        {#each mods as mod}
            <div class="card shadowed rounded {selectedModName == mod.name? 'colorful' : ''}" on:click={() => onClickOnMod(mod)}>
                <RoundCardPortrait name={mod.imageName} isValid={true}/>
                <h3>{mod.name}</h3>
                <p>{mod.description}</p>
            </div>
        {/each}
    </div>
    
    
    <br>
    <br>
    <button
        style="width: 60%"
        class="btn big {selectedModName == null || selectedDifficultyName == null? 'gray': 'colorful'}"
    >
        <a href="/">Start</a>
    </button>
</div>