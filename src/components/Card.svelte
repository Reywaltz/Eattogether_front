<script lang="ts">
	import { goto } from '$app/navigation';
    import logo from '$lib/assets/i.webp'
    import {selected_place} from "$lib/stores/store"

    export let name;
    export let id = '0';

    let current = ''

    function select_item(this) {
        selected_place.set(this.id)
        goto("/place")
    }

</script>


<div class='placeWrapper'>
    <img class='image' alt='place' src={logo}>
    <p class='title'>{name}</p>
    <button id={id} class:selected={current === name} on:click={select_item}>
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

    .selected {
        color: purple;
    }

    button {
        width: 100%;
    }

</style>