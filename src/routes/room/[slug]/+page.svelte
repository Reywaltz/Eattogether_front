<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import Card from "../../../components/Card.svelte";
    import RoomCard from "../../../components/RoomCard.svelte";
	import type { Place } from "../../../types/place";
	import type { Room } from "../../../types/rooms";
	import { selected_places } from "$lib/stores/store.svelte";
	import type { Vote } from "../../../types/vote";
	import { invalidateAll } from "$app/navigation";
	import { Button, Spinner } from "flowbite-svelte";
	import type { User } from "../../../types/user";
	import ResultPlaces from "../../../components/ResultPlaces.svelte";


    interface Result {
        room: Room,
        places: Place[],
        votes: Vote[],
        user: User
    }
    
    interface Props {
        data: Result
    }

    let { data }: Props = $props()
    let show_results = $state(false)

    const fetch_results = (async () => {
        const url = PUBLIC_API_URL + `/votes/${document.URL.split('/').slice(-1)[0]}/result`
        const r = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"}
        })

        return await r.json()
    })

    const vote = (async () => {

        selected_places.value
        let places_ids = [...Object.keys(selected_places.value)]

        const r = await fetch(PUBLIC_API_URL + "/places/vote", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                // TODO пропихивать выбранное время
                "places_ids": places_ids.map((value) => {return parseInt(value)}),
                // TODO убрать обращение по индексу
                "room_id": document.URL.split('/').slice(-1)[0]
            }),

            headers: {"Content-Type": "application/json"}
        })

        selected_places.value = {}
        invalidateAll()
    })
    
    function isPlaceVoted(votes: Vote[], place_id: String) {
        let item = votes.find(x => x.place_id === Number(place_id))?.place_id
        return item ? true : false 
    }
</script>

<main class='flex flex-col bg-green-500'>
    <RoomCard 
        external_id={data.room.external_id}
        name={data.room.name}
        created_at={data.room.created_at}
        owner_id={data.room.owner_id}
    />
    <div class="flex gap-5">
        {#each data.places as places}
            <Card
                id={places.id}
                name={places.name} 
                voted={isPlaceVoted(data.votes, places.id)}
            />
        {/each}
    </div>
    <div class="flex flex-col m-10" >
        <Button class="bg-white disabled:bg-slate-300 m-3 max-w-full" disabled={Object.keys(selected_places.value).length === 0} onclick={vote}>
            Проголосовать
        </Button>
        {#if data.room.owner_id === data.user.id} 
            <Button class="bg-white disabled:bg-slate-300 max-w-full" onclick={() => show_results = !show_results} >                
                Результаты
            </Button>
            {#if show_results}
                {#await fetch_results()}   
                    <div class="flex justify-center m-5">
                        <Spinner class="text-center" size="20"/>
                    </div>
                {:then data_results}
                    <div class="flex">
                        {#each data_results as result}
                            <ResultPlaces name={result.name} vote_count={result.count}/>
                        {/each}
                    </div>
                {/await}
            {/if}
        {/if}
    </div>
</main>

<style>
</style>