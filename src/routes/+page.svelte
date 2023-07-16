
<div class=title>
    <div></div>
    <h1>RedRock Contract Driver Payroll Tool</h1>
    <div>
        
    </div>
</div>

{#if !hidden}
    <div transition:slide={{ duration: 250 }}>
        <PayrollConfig  /> 
    </div>
{/if}


{#each $routeList as [route, price]}

    {#if $activeRoutes[route] === true}
        <RouteFieldContainer route={route}> 
            {#if $startDate && $endDate}

                {#each $selectedDateRange as date, i }

                <RouteDateField> 
                    {$selectedDateRange[i]}
                </RouteDateField>

                {/each}
            {/if}
        </RouteFieldContainer>
    {/if}
    
{/each}


<div class="footer">
    <button class="border" style='--color: {buttonColor}' on:click={toggleHide}>
        {#if !hidden}
        Hide Config 
        {:else} 
        Show Config 
        {/if}
    </button>

</div>


<script type="ts">
    import { slide } from 'svelte/transition';
	import PayrollConfig from "$lib/Components/PayrollConfig.svelte";
	import { activeRoutes, startDate, endDate, routeList, selectedDateRange } from '$lib/stores';
	import RouteFieldContainer from '$lib/Components/RouteFieldContainer.svelte';
	import RouteDateField from '$lib/Components/RouteDateField.svelte';
    let hidden = false;
    let buttonColor = ``;

    $: buttonColor = hidden ? 'white' : 'green'

    function toggleHide() {
        hidden = !hidden;
    }
</script>

<style>

    .title {
        display: flex;
        flex-direction: column;
    }

    h1 {
        text-align: center;
    }

    button {
        background-color: var(--color) ;
    }

    .footer {
        position: absolute;
        bottom: 2rem;
        left: 2rem;
    }

    /* GLOBAL STYLES */

    :global(body) {
        text-align: center;
    }

    :global(.border) {
        border: 1px solid black;
        border-radius: .5em;
    }

    :global(.easy-margin) {
        margin: .25rem;
    }
</style>