


<div class="border">
    <h2>Options</h2>
    <div class="container">
        <DateSelector />
        <RouteSelector />
    </div>
</div>



<script>
	import DateSelector from "./DateSelector.svelte";
	import RouteSelector from "./RouteSelector.svelte";
	import RouteFieldContainer from "./RouteFieldContainer.svelte";
    import { activeRoutes, routeList } from "$lib/stores";




</script>

<style>

    h2 {
        margin: .5rem;
    }
    .container {
        margin-top: .25rem;
        margin-bottom: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
        
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;

        display: flex;
        justify-content:space-between;

        text-align: center;

    }



</style>