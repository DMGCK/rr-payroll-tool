

<div class="testitem border">
    {index}

</div>



<script lang="ts">
    export let index:number;
</script>

<style>
    .testitem {
        max-width: 20rem;
    }
    .testgrid {
        display: grid;
        grid-template-rows: 6rem;
        grid-template-columns: repeat(var(--testcols), 1fr);
    }
</style>


<div style="--testcols:{$selectedDateRange.length}" class="testgrid">
    {#each $selectedDateRange as date, i}
        <TestGrid index={i} />
        
    {/each}
</div>

