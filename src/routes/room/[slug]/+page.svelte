<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import type { Place, PlaceVotes } from "../../../types/place";
	import type { Room } from "../../../types/rooms";
	import { selected_places } from "$lib/stores/store.svelte";
	import type { Vote } from "../../../types/vote";
	import { invalidateAll } from "$app/navigation";
	import { Button, Spinner, Avatar, Dropdown, Search, DropdownItem, DropdownDivider, Checkbox } from "flowbite-svelte";
	import type { Participant, SearchUserInvite, User } from "../../../types/user";
    import {faker} from '@faker-js/faker'
	import RoomCard from "../../../components/RoomCard.svelte";
	import Card from "../../../components/Card.svelte";
	import ResultPlaces from "../../../components/ResultPlaces.svelte";
    import { ChevronDownOutline, UserRemoveSolid } from 'flowbite-svelte-icons';
    import { page } from '$app/stores'

    interface Result {
        room: Room,
        places: Place[],
        votes: Vote[],
        user: User,
        participants: Participant[]
    }
    
    interface Props {
        data: Result
        searchTerm: any
        checkedUsers: any
    }

    $effect(() => {
        console.log($page.url.pathname);
    })

    let show_results = $state(false)
    let search_results = $state<{"value": SearchUserInvite[] | null}>({"value": null})
    let active_search_result = $state<{"value": number[] | null}>({"value": []})
    let checkedUsers = $state({"value": null})

    let typing_timer: number
    const TYPING_TIMER_EXPIRE = 500

    let { data, searchTerm = $bindable() }: Props = $props()

    const fetch_results = (async () => {
        const url = PUBLIC_API_URL + `/votes/${document.URL.split('/').slice(-1)[0]}/result`
        const r = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"}
        })

        let result: PlaceVotes = await r.json()

        result.items.sort((a, b) => b.count - a.count);
        
        return result
    })

    const vote = (async () => {
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

    const searchUser = (async () => {
        clearTimeout(typing_timer)

        if (searchTerm !== undefined) {
            typing_timer = setTimeout(async () => {
                const r = await fetch(PUBLIC_API_URL + `/users/search?user_search=${searchTerm}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {"Content-Type": "application/json"}
                })

                let result = await r.json() as SearchUserInvite[]
                search_results.value = result
            }, TYPING_TIMER_EXPIRE)
        }
    })

    const toggleCheckbox = ((event: Event) => {
        const target = event.target
        const values = checkedUsers.value
        const target_id = parseInt(target?.id)

        console.log(target_id);

        const index = active_search_result.value?.indexOf(target_id)
        if (index !== -1) {
            active_search_result.value?.splice(index, 1)
            return
        }

        active_search_result.value?.push(target_id)

        console.log(active_search_result)
        
        // if (values !== null && values.id === target.id) {
        //     return true
        // } 

        // return false
    })
    
    function isPlaceVoted(votes: Vote[], place_id: String) {
        let item = votes.find(x => x.place_id === Number(place_id))?.place_id
        return item ? true : false 
    }

    const copyToClipboard = (async () => {
        if (window.isSecureContext && navigator.clipboard) {
            await navigator.clipboard.writeText("AZAZAZA");
        } else {
            document.execCommand('copy', false, "AZAZA")
        }
    })

</script>

<main class='flex flex-col bg-green-500'>
    <RoomCard 
        external_id={data.room.external_id}
        name={data.room.name}
        created_at={data.room.created_at}
        owner_id={data.room.owner_id}
    />
<!-- TODO Ограничить рендер челов после определённого количества -->
    <div class="flex flex-row-reverse mr-5">
        {#each data.participants as participant}
            <Avatar src={faker.image.avatar()} stacked>{participant.username}</Avatar>
        {/each}

        <Button>Пригласить
            <ChevronDownOutline class="text-white dark:text-white" />
        </Button>
        <Dropdown class="overflow-y-auto px-3 pb-3 text-sm h-44" >
            <p>http://google.com</p>
            <DropdownDivider/>

            <div class="flex justify-center w-full" slot="footer" >
                <Button class="w-full m-3" onclick={copyToClipboard}>
                    Скопировать приглашение
                </Button>
            </div>
        </Dropdown>
    </div>
    
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
        <Button class="disabled:bg-slate-500 m-3 max-w-full" disabled={Object.keys(selected_places.value).length === 0} onclick={vote}>
            Проголосовать
        </Button>
        {#if data.room.owner_id === data.user.id} 
            <Button class="max-w-full" onclick={() => show_results = !show_results} >                
                Результаты
            </Button>
            {#if show_results}
                {#await fetch_results()}   
                    <div class="flex justify-center m-5">
                        <Spinner class="text-center" size="20"/>
                    </div>
                {:then data_results}
                    <div class="flex">
                        {#each data_results.items as result}
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