<script lang="ts">
	import { PUBLIC_API_URL } from "$env/static/public";
	import { selected_place } from "$lib/stores/store.svelte";
	import Card from "../components/Card.svelte";
    
	import type { PlaceList } from "../types/place";

    interface Props {
        data: PlaceList;
    }

    let { data }: Props = $props();

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

    // $effect(() => console.log($inspect(selected_place)))

</script>
<main class='content'>
    {#if data.items === null}
        LOADING
    {:else}
        {#each data.items as items}
            <Card id={items.id} name={items.name}/>
        {/each}
        <button onclick={vote}>
            Проголосовать
        </button>
    {/if}
    
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