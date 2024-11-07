<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import Card from "../../../components/Card.svelte";
    import RoomCard from "../../../components/RoomCard.svelte";
	import type { Place } from "../../../types/place";
	import type { Room } from "../../../types/rooms";
	import { selected_place } from "$lib/stores/store.svelte";
	import type { Vote } from "../../../types/vote";
	import { invalidateAll } from "$app/navigation";
    interface Result {
        room: Room,
        places: Place[],
        votes: Vote[],
    }
    
    interface Props {
        data: Result
    }

    let { data }: Props = $props()
    
    const vote = (async () => {
        const selected_ids: String[] | null = [...selected_place ?? []]

        const r = await fetch(PUBLIC_API_URL + "/places/vote", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                "places_ids": selected_ids.map((value) => {return parseInt(value)}),
                // TODO убрать обращение по индексу
                "room_id": document.URL.split('/').slice(-1)[0]
            }),

            headers: {"Content-Type": "application/json"}
        })

        invalidateAll()
        selected_place?.splice(0, selected_place.length)
        
    })
    
    function isPlaceVoted(votes: Vote[], place_id: String) {
        let item = votes.find(x => x.place_id === Number(place_id))?.place_id
        console.log(item);
        return item ? true : false 
    }

</script>

<RoomCard 
    external_id={data.room.external_id}
    name={data.room.name}
    created_at={data.room.created_at}
/>
<main class='content'>
    {#each data.places as places}
        <Card
            id={places.id}
            name={places.name} 
            voted={isPlaceVoted(data.votes, places.id)}
        />
    {/each}
    <button disabled={selected_place?.length === 0} onclick={vote}>
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