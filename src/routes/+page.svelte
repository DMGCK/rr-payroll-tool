
<div class=title>
    <div></div>
    <h1>RedRock Boise Contract Driver Payroll Tool</h1>
    <div>
        
    </div>
</div>

{#if !hidden}
    <div transition:slide={{ duration: 250 }}>
        <PayrollConfig  /> 
    </div>
{/if}


{#if $selectedDateRange.length - 1 !== 0}
{$selectedDateRange.length}
<RouteFieldContainer route="Total" gridSize={$selectedDateRange.length}> 
    
    {#if $startDate && $endDate}
        {#each $selectedDateRange as date, i }

            <TotalsDateField on:fieldUpdate row={`row${date}`} index={i+1}> 
                <slot slot="date">
                    {getFormattedDate(i)}
                </slot>

            </TotalsDateField>
        {/each}
    {/if}
</RouteFieldContainer>
{/if}

{#each $routeList as [route, price]}

    {#if $activeRoutes[route] === true}
        <RouteFieldContainer route={route} gridSize={$selectedDateRange.length}> 
            
            {#if $startDate && $endDate}
                {#each $selectedDateRange as date, i }

                <RouteDateField row={route} index={i+1}> 
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
	import { activeRoutes, startDate, endDate, routeList, selectedDateRange, totalsCounter } from '$lib/stores';
	import RouteFieldContainer from '$lib/Components/RouteFieldContainer.svelte';
	import RouteDateField from '$lib/Components/RouteDateField.svelte';
	import TotalsDateField from '$lib/Components/TotalsDateField.svelte';
    let hidden = false;
    let buttonColor = ``;
    $: buttonColor = hidden ? 'white' : 'green'
    $: changeRange($startDate, $endDate);



    
    function changeRange(_,__) {
        try {
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
        } catch (error) {
            console.error(error)
            $selectedDateRange = []
        }
    }
    
    function getTotalForDay(i) {
        const elements = document.querySelectorAll(`input .col${i}`)
        try {
            console.log(elements)
            

            return `working? ${elements.length} found`
        } catch (error) {
            return 0
        }
    }
    
    function getFormattedDate(i) {
        const dateArray = $selectedDateRange[i].split("-")
        const res = `${dateArray[1]} / ${dateArray[2]}`
        return dateArray[1] ? res : ''
    }
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