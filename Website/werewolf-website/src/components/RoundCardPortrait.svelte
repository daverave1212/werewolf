<style>
    :root {
        --role-chooser-image-size: 20vw;
        --role-chooser-image-size-big: 20vh;
    }
    .image-wrapper {
        width: var(--role-chooser-image-size);
        height: var(--role-chooser-image-size);
        overflow: hidden;
        border-radius: 50%;
    }
    .image-wrapper.big {
        width: var(--role-chooser-image-size-big);
        height: var(--role-chooser-image-size-big);
    }
    .image-wrapper img {
        --width: calc(0.55 * var(--role-chooser-image-size));
        width: calc(2.5 * var(--width));
        aspect-ratio: var(--card-aspect-ratio);
        margin-left: calc(-0.34 * var(--width));
        margin-top: calc(-0.34 * var(--width));
    }
    .image-wrapper.big img {
        --width: calc(0.55 * var(--role-chooser-image-size-big));
    }
    .grayscale {
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
    }
</style>

<script>
    export let name
    export let isValid
    export let isBig = false
</script>

<div class="image-wrapper {isBig? 'big': ''}">
    <img src="images/cards/{name}.png" class="{!isValid? 'grayscale': ''}"/>
</div>