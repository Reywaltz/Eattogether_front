<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import Card from "../../../components/Card.svelte";
    import RoomCard from "../../../components/RoomCard.svelte";
	import type { Place } from "../../../types/place";
	import type { Room } from "../../../types/rooms";
	import { selected_place } from "$lib/stores/store.svelte";
    interface Result {
        room: Room,
        places: Place[]
    
    }
    
    interface Props {
        data: Result
    }

    let { data }: Props = $props()
    
    const vote = (async () => {
        const selected_ids: String[] | null = [...selected_place]

        const r = await fetch(PUBLIC_API_URL + "/places/vote", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                "ids": selected_ids
            }),

            headers: {"Content-Type": "application/json"}
        })

        const res = await r.text()
        console.log(res);

    })
    

</script>


<RoomCard 
    external_id={data.room.external_id}
    name={data.room.name}
    created_at={data.room.created_at}
/>
<main class='content'>
    {#each data.places as places}
        <Card id={places.id} name={places.name}></Card>
    {/each}
    <button onclick={vote}>
        Проголосовать
    </button>
</main>

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