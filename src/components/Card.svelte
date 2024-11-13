<script lang="ts">
    import logo from '$lib/assets/i.webp'
	import { selected_places } from '$lib/stores/store.svelte';

    interface Props {
        id: string;
        name: string;
        voted: boolean;
    }
    
    let { id, name, voted}: Props = $props();
    
    let isSelected = $state<boolean>(voted)

    function select_place(event: Event) {
        const target = event.target as HTMLButtonElement
        
        if (selected_places.value.includes(target.id)) {
            let index = selected_places.value.indexOf(target.id)
            
            selected_places.value.splice(index)
            isSelected = !isSelected
        } else {
            selected_places.value.push(target.id)
            isSelected = !isSelected
        }
    }    
</script>


<div class='flex flex-col items-center max-h-fit max-w-64 m-3 hover:bg-red-500 transion duration-300'>
    {#if isSelected && !voted}
        <input type="checkbox" class="checked:accent-purple-500 absolute z-10" checked={true}>
    {/if}
    <img class='m-w-12 pt-5 rounded-xl' alt='place' src={logo}>
    <p class='text-center text-4xl m-0'>{name}</p>
    {#if !voted}
        <button class="w-full bg-white" id={id} onclick={select_place}>
            Выбрать
        </button>
    {:else}
        <p>Уже проголосовали</p>
    {/if}   
</div>


<style>
</style>