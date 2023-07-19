   


<div style="width:{$globalWidth}" class="field border">
    <div>
        <slot name="date" />
    </div>
    <div on:fieldUpdate={logIt}>
        {totalForColumn}
        <!-- <slot name="total">
            0
        </slot> -->
    </div>
</div>


<script>

	import { globalWidth, totalsCounter } from "$lib/stores";
	import { onMount } from "svelte";
    export let index;
    let totalForColumn = 0;

    function logIt(event) {
        console.log(event)
    }

</script>

<style>

    input {
        max-width: 3rem;
        height: 3rem;
        font-size: larger;
    }

</style>