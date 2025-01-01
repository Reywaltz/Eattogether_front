<script lang="ts">
	import { Avatar, Search } from "flowbite-svelte";
	import { PUBLIC_API_URL } from "$env/static/public";
	import type { SearchUserInvite } from "../../../../types/user.js";
	import { faker } from "@faker-js/faker";
	import { Checkbox } from "svelte-5-ui-lib";
    
    
    let searchTerm = $state("")
    let search_results = $state<{"value": SearchUserInvite[] | null}>({"value": null}) 
    let selected_ids = $state({"value": []})

    $effect(() => {
        console.log(selected_ids)
    })

    
    const searchUser = (async () => {
        const url = PUBLIC_API_URL + `/users/search?user_search=${searchTerm}`
        const r = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"}
        })

        let result = await r.json() as SearchUserInvite[]
        search_results.value = result

        console.log(search_results.value);
    })

    const toggle = ((event: Event) => {
        const index = selected_ids.value?.indexOf(event.currentTarget.id)
        console.log(index);
        if (index !== -1) {
            selected_ids.value?.splice(index, 1)
            console.log(selected_ids.value);
            return
        }

        selected_ids.value.push(event.currentTarget.id)

        console.log(selected_ids.value);
    })

</script>


<div class="flex flex-row justify-center items-center m-10">
    <Search bind:value={searchTerm} onkeyup={searchUser}/>
</div>

{#each search_results.value as results}
    <div id={results.id} class="flex flex-row items-center min-h-200 m-4 hover:bg-gray-300" onclick={toggle}>
        <Checkbox id={results.id} checked={() => selected_ids.value.indexOf(results.id) != -1 ? true : false}/>
        <Avatar src={faker.image.url()}/>
        <p class="ml-3">{results.name}</p>
    </div>
{/each}


 <!-- <Dropdown class="overflow-y-auto px-3 pb-3 text-sm h-44" >
            <div slot="header" class="p-3">
                <Search onkeyup={searchUser} size="md" bind:value={searchTerm}/>
            </div>
            
            <DropdownDivider/> -->
            <!-- TODO добавить loader для загрузки  -->
            <!-- {#if search_results.value !== null} -->
                <!-- {#each search_results.value as results} -->
                    <!-- <h1>{JSON.stringify(results)}</h1> -->
                    <!-- <h1>{results.name}</h1> -->
                    <!-- <div onclick={toggleCheckbox}> -->
                        <!-- <DropdownItem id={results.id} class="flex items-center text-base font-semibold gap-2"> -->
                    <!-- <DropdownItem id={results.id} class="flex items-center text-base font-semibold gap-2 selected:bg-red-400" onclick={toggleCheckbox}>
                        <Avatar src={results.image} size="xs"/>{results.name}
                    </DropdownItem> -->
                    <!-- </div> -->
                <!-- {/each}
            {/if}
            <div class="flex justify-center w-full" slot="footer" >
            <Button class="w-full m-3">
                Пригласить
            </Button>
            </div>
        </Dropdown> -->