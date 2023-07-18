   
<div style="grid-column:{i} width:{$globalWidth}" class="field border">
    <div>
        <slot name="date" />
    </div>
    <div>
        <slot name="dayTotal" />
    </div>
</div>

<script>

	import { globalWidth } from "$lib/stores";
    export let i;
    
</script>

<style>

    input {
        max-width: 3rem;
        height: 3rem;
        font-size: larger;
    }

</style>