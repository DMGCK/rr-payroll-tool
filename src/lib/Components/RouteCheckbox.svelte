

<div class=border>
    {route}
    <input type="checkbox" bind:checked={isActive}>
</div>


<script lang="ts">
    import { activeRoutes } from "$lib/stores";

    // @ts-ignore
    export let route:string;
    // @ts-ignore
    let isActive:boolean = $activeRoutes[route] ? $activeRoutes[route] : false;

    function setRoute(isActive:boolean) {
        // isActive = true;
        $activeRoutes[route] = isActive;
    }

    $: setRoute(isActive);



</script>
