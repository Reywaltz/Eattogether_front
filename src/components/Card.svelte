<script lang="ts">
    import logo from '$lib/assets/i.webp'
	import { selected_places } from '$lib/stores/store.svelte';
	import { faker } from '@faker-js/faker';
	import { Button, Datepicker } from 'flowbite-svelte';

    interface Props {
        id: string;
        name: string;
        voted: boolean;
    }
    
    let { id, name, voted}: Props = $props();
    
    let today = new Date()
    let isSelected = $state<boolean>(voted)
    let selectedDate = $state<{"value": Date | null}>({"value": null})
    let clicked = $state(false)

    function select_place(event: Event) {
        const target = event.target as HTMLButtonElement
        
        if (selected_places.value[target.id]) {
            
            delete selected_places.value[target.id]
            isSelected = !isSelected

        } else {
            if (selectedDate.value === null) {
                return
            }
            selected_places.value[target.id] = {
                "place_id": target.id,
                "selected_date": selectedDate.value
            }
            isSelected = !isSelected
        }
    }

    async function clearChoice(event: Event) {
        const target = event.target as HTMLButtonElement
        let id = target.id
        isSelected = !isSelected;
        clicked = !clicked
        selectedDate.value = null
        delete selected_places.value[id]
    }

</script>


<div class='flex flex-col items-center max-h-fit max-w-64 m-3 hover:bg-red-500 transion duration-300'>
    {#if isSelected && !voted}
        <input type="checkbox" class="checked:accent-purple-500 absolute z-10" checked={true}>
    {/if}
    <img class='m-w-12 pt-5 rounded-xl' alt='place' src={logo}>
    <p class='text-center text-4xl m-0'>{name}</p>
    {#if !voted}
        {#if selectedDate.value !== null && selectedDate.value < today}
            <p class="m-5">Выберите дату не ранее, чем сегодняшний день</p>
        {/if}
        <div class="w-full m-2">
            <Datepicker
                bind:value = {selectedDate.value}
                placeholder="Выберите удобную дату"
                showActionButtons
                autohide={false}
                on:clear={() => selectedDate.value = null}
                on:apply={(event: CustomEvent) => selectedDate.value = event.detail}
            />
        </div>
        <Button class="w-full mb-2" 
            id={id}
            disabled={(selectedDate.value === null || selectedDate.value < today) || (isSelected)}
            onclick={select_place}>Выбрать
        </Button>
        <Button id={id} class="w-full" 
            onclick={clearChoice}
            disabled={!isSelected && !voted}
            >Убрать
        </Button>
        
    {:else}
        <p>Уже проголосовали</p>
    {/if}   
</div>


<style>
</style>