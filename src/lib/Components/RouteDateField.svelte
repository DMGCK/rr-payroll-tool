   
<div style="width:{$globalWidth}" class="field border">
    <div >
        <slot></slot>
    </div>
    <input class={`col${index}`} bind:value={fieldValue} min="0" type="number" />
</div>

<script>

	import { globalWidth, totalsObject } from "$lib/stores";
    export let index;
    let fieldValue = 0;

    // $: $totalsObject[`col${index}`] = fieldValue
    
</script>

<style>

    input {
        max-width: 3rem;
        height: 3rem;
        font-size: larger;
        text-align: center;
    }

</style>