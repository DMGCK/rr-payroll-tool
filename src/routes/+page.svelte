
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

<RouteFieldContainer route="Total" gridSize={$selectedDateRange.length}> 
    
    {#if $startDate && $endDate}
        {#each $selectedDateRange as date, i }
            <TotalsDateField index={i+1}> 
                <slot slot="date">
                    {getFormattedDate(i)}
                </slot>
                <slot slot="dayTotal">
                    {getTotalForDay(i)}
                </slot>
            </TotalsDateField>
        {/each}
    {/if}

</RouteFieldContainer>

{#each $routeList as [route, price]}

    {#if $activeRoutes[route] === true}
        <RouteFieldContainer route={route} gridSize={$selectedDateRange.length}> 
            
            {#if $startDate && $endDate}
                {#each $selectedDateRange as date, i }
                <RouteDateField index={i+1}> 
                    {getFormattedDate(i)}
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
	import TotalsDateField from '$lib/Components/TotalsDateField.svelte';
    let hidden = false;
    let buttonColor = ``;
    $: buttonColor = hidden ? 'white' : 'green'
    $: changeRange($startDate, $endDate);



    function toggleHide() {
        hidden = !hidden;
    }

    function changeRange() {
        let rangeOfDates = [];
        if ($endDate == undefined || $startDate == undefined) {
            return rangeOfDates
        }
        const endDateCopy = JSON.parse(JSON.stringify($endDate));
        const startDateCopy = document.createElement("input")
        startDateCopy.type = "date";
        startDateCopy.value = JSON.parse(JSON.stringify($startDate));
    
        while (startDateCopy.value <= endDateCopy) {
            rangeOfDates.push(startDateCopy.value)
            startDateCopy.stepUp();
        }
    
        $selectedDateRange = rangeOfDates
    }

    function getFormattedDate(i) {
        const dateArray = $selectedDateRange[i].split("-")
            return `${dateArray[1]} / ${dateArray[2]}`
    }

    function getTotalForDay(i) {
        return i;
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