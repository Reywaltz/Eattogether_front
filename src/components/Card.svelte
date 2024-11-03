<script lang="ts">
    import logo from '$lib/assets/i.webp'
	import { selected_place } from '$lib/stores/store.svelte';

    let isSelected = $state<boolean>(false)

    interface Props {
        name: string;
        id: string;
    }

    let { id, name }: Props = $props();

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
        <input type="checkbox" class=selectedCheckbox checked={isSelected}>
    {/if}
    <img class='image' alt='place' src={logo}>
    <p class='title'>{name}</p>
    <button id={id} onclick={select_place}>
        Выбрать
    </button>
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