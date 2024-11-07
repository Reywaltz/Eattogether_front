<script lang="ts">
    import logo from '$lib/assets/i.webp'
	import { selected_place } from '$lib/stores/store.svelte';

    interface Props {
        id: string;
        name: string;
        voted: boolean;
    }
    
    let { id, name, voted}: Props = $props();
    
    let isSelected = $state<boolean>(voted)

    function select_place(event: Event) {
        const target = event.target as HTMLButtonElement
        if (selected_place?.includes(target.id)) {
            let index = selected_place.indexOf(target.id)
            selected_place.splice(index)
            isSelected = !isSelected
        } else {
            selected_place?.push(target.id)
            isSelected = !isSelected
        }
    }

</script>


<div class='placeWrapper'>
    {#if isSelected}
        <input type="checkbox" class=selectedCheckbox checked={true}>
    {/if}
    <img class='image' alt='place' src={logo}>
    <p class='title'>{name}</p>
    {#if !voted}
        <button id={id} onclick={select_place}>
            Выбрать
        </button>
    {:else}
        <p>Уже проголосовали</p>
    {/if}   
</div>


<style>
    .image {
        max-width: 250px;
        padding-top: 20px;
        border-radius: 12px;
    }

    .title {
        text-align: center;
        font-size: 36px;
        margin: 0px;
    }

    .placeWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: fit-content;
        max-width: 250px;
        margin: 10px;
    }
    
    .placeWrapper:hover {
        color: red;
        transition: 0.3s
    }

    .selectedCheckbox {
        color: purple;
        position: absolute;
        z-index: 1;
        top: 207px;
    }

    button {
        width: 100%;
    }

</style>