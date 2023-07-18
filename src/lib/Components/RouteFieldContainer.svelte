
<div class="route-container">

    <div class="route-title">
        Container for {route}
    </div>
    <div style="--grid-size:{gridSize}" bind:clientWidth={w} class="field-container border">
        <slot></slot>
    </div>
</div>

<script lang="ts">
	import { globalWidth } from "$lib/stores";
	import { afterUpdate, beforeUpdate } from "svelte";


export let route:string;
export let gridSize:number;
let w:number;

beforeUpdate(() => {
    $globalWidth = gridSize / w;
})

</script>

<style>

    .route-container {
        display: flex;
        justify-content: start;
    }

    .route-title {
        min-width: 15%;
        justify-content: center;
    }

    .route-container .field-container {
        width: 70%;
    }    

    .field-container {
        display: grid;
        grid-template-rows: 6rem;
        grid-template-columns: repeat(var(--grid-size), 1fr); 
    }


</style>


<!-- other stuff -->


