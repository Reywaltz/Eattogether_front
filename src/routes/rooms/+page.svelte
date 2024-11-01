<script lang="ts">
	import RoomCard from "../../components/RoomCard.svelte";

    let { data } = $props()

</script>

{#if data.items === null}
        LOADING
    {:else}
    <div class="rooms_container"> 
        {#each data.items as items}
            <RoomCard 
            external_id={items.external_id}
            name={items.name}
            created_at={items.created_at}
            />
        {/each}
    </div>
{/if}


<style>
    .rooms_container {
        display: flex;
        background-color: red;
    }
</style>