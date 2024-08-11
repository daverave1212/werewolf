
<style>
    :root {
        --contact-header-height: max(min(75px, 12vw), 40px);
    }
    .contact {
        width: 100%;
        padding-left: 7.5vw;
        padding-right: 7.5vw;

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

        margin-top: calc(-0.35 * var(--contact-header-height));
        margin-left: calc(-0.35 * var(--contact-header-height));
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
    .right-wrapper .name {
        color: gray;
    }

    .right-wrapper .expand-arrow {
        position: absolute;

        top: calc(var(--contact-header-height) / 2);
        right: calc(var(--contact-header-height) / 4);
    }



    .subcontent {
        overflow: hidden;
        max-height: 0vh;

        transition: max-height 0.5s;
    }
    .subcontent--expanded {
        max-height: 20vh;
    }
</style>


<div class="contact">
    <div class="header">
        <div class="picture-wrapper">
            <img src="https://raw.githubusercontent.com/daverave1212/werewolf/main/Cards/Werewolf%201.png"/>
        </div>
        <div class="right-wrapper">
            <div class="half upper-half">
                <b>John Agnew</b>
            </div>
            <div class="half lower-half">
                <span class="name">Werewolf</span>
            </div>

            <div class="expand-arrow" on:click={toggleContent}>
                V
            </div>
        </div>
    </div>
    <div class="{subcontentClass}">
        dadasd
    </div>
</div>


<script>
    
    let isExpanded = false

    $: subcontentClass = isExpanded ? 'subcontent subcontent--expanded' : 'subcontent'

    function toggleContent() {
        isExpanded = !isExpanded
    }

</script>