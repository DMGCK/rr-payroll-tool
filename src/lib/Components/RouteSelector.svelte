
<div class="route-selector border easy-margin">
    <div class="text-center">Select Routes</div>
    <div class="grid-container" id="routeList">

        {#each $routeList as [route] }
        <RouteCheckbox route={route} />
        {/each}

    </div>
</div>


<script>
	import { routeList } from "$lib/stores";
import RouteCheckbox from "./RouteCheckbox.svelte";


</script>

<style>

.route-selector {
        width: 60%;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

</style>