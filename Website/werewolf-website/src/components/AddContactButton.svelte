
<style>
    .add-contact-button {
        background-color: white;
        border: none;
        padding: 0px;

        width: 100%;
        height: calc(var(--contact-header-height) * 1.5);
        
        display: block;
        justify-content: center;
        flex-direction: column;
        text-align: center;

        color: gray;
        font-size: 1.5rem;
    }
</style>

<script>

    export let onClick

</script>

<button class="add-contact-button shadowed rounded" on:click={onClick}>
    <slot></slot>
</button>