<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import Card from "../../../components/Card.svelte";
    import RoomCard from "../../../components/RoomCard.svelte";
	import type { Place } from "../../../types/place";
	import type { Room } from "../../../types/rooms";
	import { selected_places } from "$lib/stores/store.svelte";
	import type { Vote } from "../../../types/vote";
	import { goto, invalidateAll } from "$app/navigation";
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
        const r = await fetch(PUBLIC_API_URL + "/places/vote", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                "places_ids": selected_places.value.map((value) => {return parseInt(value)}),
                // TODO убрать обращение по индексу
                "room_id": document.URL.split('/').slice(-1)[0]
            }),

            headers: {"Content-Type": "application/json"}
        })

        selected_places.value.splice(0, selected_places.value.length)
        invalidateAll()
        
    })
    
    function isPlaceVoted(votes: Vote[], place_id: String) {
        let item = votes.find(x => x.place_id === Number(place_id))?.place_id
        return item ? true : false 
    }

    $effect(() => console.log($inspect(selected_places.value)));
    $effect(() => console.log(selected_places.value.length));

</script>

<RoomCard 
    external_id={data.room.external_id}
    name={data.room.name}
    created_at={data.room.created_at}
/>
<main class='flex flex-wrap justify-start gap-3 m-8 bg-green-500'>
    {#each data.places as places}
        <Card
            id={places.id}
            name={places.name} 
            voted={isPlaceVoted(data.votes, places.id)}
        />
    {/each}
    <button class="bg-white disabled:bg-slate-300" disabled={selected_places.value.length === 0} onclick={vote}>
        Проголосовать
    </button>
    <button class="bg-white"onclick={goto(`${window.location.pathname}/date`)}>
        Следующий этап
    </button>
</main>

<style>
</style>