<script lang="ts">
	import Card from "../components/Card.svelte";
    
    import { all_places, selected_place_data } from "$lib/stores/store"
	import { onMount } from "svelte";

    export let data;

    // TODO place store login in component
    function setState(data) {
        all_places.set(data.items) 
    }

    onMount(async() => {
        setState(data)
    })


</script>
<main class='content'>
    {#if data === null}
        LOADING
    {:else}
        {#each data.items as items}
            <Card id={items.id} name={items.name}/>
        {/each}
    {/if}

</main>
<h1>{JSON.stringify($selected_place_data)}</h1>
<style>
    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 30px;
        margin: 30px;
        background-color: rgb(20, 93, 63);
    }
</style>