   


<div style="width:{$globalWidth}" class="field border">
    <div>
        <slot name="date" />
    </div>
    <div>
        <!-- {$totalsObject[totalProp]} -->
        <slot name="total">
            0
        </slot>
    </div>
</div>


<script>

	import { globalWidth, totalsObject } from "$lib/stores";
	import { onMount } from "svelte";
    export let index;
    const totalProp = `col${index}`

    // onMount(() => {
    //     if ($totalsObject[totalProp] !== 0) {
    //         $totalsObject[totalProp] = 0
    //     }
    // })
    
</script>

<style>

    input {
        max-width: 3rem;
        height: 3rem;
        font-size: larger;
    }

</style>