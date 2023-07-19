   
<div style="width:{$globalWidth}" class="field border">
    <div >
        <slot></slot>
    </div>
    <input class={`col${index}`} bind:value={fieldValue} min="0" type="number" />
</div>

<script>

	import { globalWidth, totalsCounter } from "$lib/stores";
	import { createEventDispatcher } from "svelte";
    export let index;
    export let row;
    const dispatch = createEventDispatcher();
    let fieldValue = 0;


    $: updateEvent(fieldValue)
    function updateEvent(__) {
        console.log('firing update')
        dispatch("fieldUpdate", {
            total : fieldValue,
            location: `i${index}${row}` 
        })
    }

    try {
        $totalsCounter[`i${index}`][row] = fieldValue;
        console.error(`SET SUCCESS @ Input ${fieldValue}`)
        
    } catch (error) {
        console.error(`SET ERROR @ Input ${error}`)
        $totalsCounter[`i${index}`] = {row: fieldValue}

    }



    // $: $totalsCounter[`col${index}`] = fieldValue
    
</script>

<style>

    input {
        max-width: 3rem;
        height: 3rem;
        font-size: larger;
        text-align: center;
    }

</style>