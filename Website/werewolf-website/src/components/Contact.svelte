
<style>
    :root {
        /* --contact-header-height: max(min(5rem, 12vw), 40px); */
        --contact-header-height: 3.25rem;
        --card-aspect-ratio: 756/1093;
    }
    .contact {
        width: 100%;
        padding-left: 7.5vw;
        padding-right: 7.5vw;
        padding-top: calc(var(--contact-header-height) / 4);
        padding-bottom: calc(var(--contact-header-height) / 4);

        font-family: Arial, Helvetica, sans-serif;
    }
    .contact .header {
        height: var(--contact-header-height);
        display: flex;
    }

    .contact .picture-wrapper {
        width: var(--contact-header-height);
        height: var(--contact-header-height);

        border-radius: 50%;
        overflow: hidden;
    }
    .contact .picture-wrapper img {
        height: calc(2.5 * var(--contact-header-height));
        aspect-ratio: var(--card-aspect-ratio);
        max-width: 9999999px;   /* Required because tailwind is a bitch */

        margin-top: calc(-0.35 * var(--contact-header-height));
        margin-left: calc(-0.35 * var(--contact-header-height));
    }
    .contact .picture-wrapper img.center {
        height: calc(1.2 * var(--contact-header-height));
        width: calc(1.2 * var(--contact-header-height));

        margin-top: calc(0 * var(--contact-header-height));
        margin-left: calc(-0.1 * var(--contact-header-height));
    }


    .right-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;

        padding-left: calc(var(--contact-header-height) / 4);
        
        height: var(--contact-header-height);
        flex: 1;
    }
    .right-wrapper .half {
        height: calc(var(--contact-header-height) / 2);
        line-height: calc(var(--contact-header-height) / 6);
        padding: calc(var(--contact-header-height) / 6);
    }
    .right-wrapper .upper-half {
        font-size: 1.15rem;
        line-height: calc(var(--contact-header-height) / 6 * 1.25 * 1.25);
    }
    .right-wrapper .subtitle {
        color: gray;
    }
/* 
    .right-wrapper .expand-arrow {
        position: absolute;

        top: calc(var(--contact-header-height) / 2);
        right: calc(var(--contact-header-height) / 4);
    } */



    .subcontent {
        overflow: hidden;
        max-height: 0vh;

        transition: max-height 0.5s;
    }
    .subcontent--expanded {
        max-height: 20vh;
    }
    .subcontent-content {
        margin-top: calc(0.33 * var(--contact-header-height));
    }
</style>



<div class="contact shadowed rounded">
    <div class="header">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="picture-wrapper" on:click={onPortraitClick}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <img
                src={state.name == null? 'images/user.png' : `images/cards/${state.name}.png`}
                class="{isPortraitCentered == true? 'center': ''}"
            />
        </div>
        <div class="right-wrapper">
            {#if state.name != null}
                <div class="half upper-half" on:click={onNameClick}>
                    <b>{state.name == null? '' : state.name}</b>
                </div>
                <div class="half lower-half">
                    {#if state.isEditMode}
                        <input class="subtitle-input" on:change={onInputDone} bind:value={_subtitleInputValue} bind:this={domInput}>
                    {:else}
                        <span class="subtitle">{state.subtitle}</span>
                    {/if}
                </div>
            {:else}
                {#if state.isEditMode}
                    <input class="subtitle-input" on:change={onInputDone} bind:value={_subtitleInputValue} bind:this={domInput}>
                {:else}
                    <span class="subtitle" on:click={toggleContent}>{state.subtitle}</span>
                {/if}
            {/if}

            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- <div class="expand-arrow" on:click={toggleContent}>
                V
            </div> -->
            <div class="badges">
                
            </div>
        </div>
    </div>
    <div class="{SUBCONTENT_CLASS}">
        <div class="subcontent-content">
            <slot></slot>
        </div>
    </div>
</div>


<script>

    import { createEventDispatcher, onMount } from 'svelte'
    import { contactsStore } from '../stores/contacts-store';
    import { get } from 'svelte/store'

    const dispatch = createEventDispatcher()

    export let state
    export let setState
    export let isPortraitCentered = false

    let _subtitleInputValue
    let domInput

    $: SUBCONTENT_CLASS = state.isExpanded ? 'subcontent subcontent--expanded' : 'subcontent'
    
    $: {
        console.log({state})
    }

    onMount(() => {
        setTimeout(() => {
            if (domInput != null) {
                domInput.focus()
            }
        }, 100)
    })



    function toggleContent() {
        setState({ ...state, isExpanded: !state.isExpanded })
    }
    function onInputDone() {
        setState({ ...state, subtitle: _subtitleInputValue, isEditMode: false })
    }
    function onNameClick() {
        if (state.name == null) {
            dispatch('change-role')
            return
        }
        toggleContent()
    }
    function onPortraitClick() {
        if (state.name == null) {
            dispatch('change-role')
            return
        }
        dispatch('show-portrait')
    }



</script>