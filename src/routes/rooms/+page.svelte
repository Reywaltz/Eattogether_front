<script lang="ts">
	import RoomCard from "../../components/RoomCard.svelte";

    let { data } = $props()

</script>

{#if data.items === null}
        LOADING
    {:else}
    <div class="flex bg-red-500"> 
        {#each data.items as items}
            <RoomCard 
                external_id={items.external_id}
                name={items.name}
                created_at={items.created_at}
                owner_id={items.owner_id}
            />
        {/each}
    </div>
{/if}

<style>
</style>