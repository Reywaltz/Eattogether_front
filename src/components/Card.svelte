<script lang="ts">
	import { goto } from '$app/navigation';
    import logo from '$lib/assets/i.webp'
    import {selected_place} from "$lib/stores/store"

    interface Props {
        name: string;
        id: string;
    }

    let { id, name }: Props = $props();

    let current = ''

    function select_item(this: any) {
        selected_place.set(this.id)
        //TODO navigate to concrete
        goto("/place")
    }

</script>


<div class='placeWrapper'>
    <img class='image' alt='place' src={logo}>
    <p class='title'>{name}</p>
    <button id={id} class:selected={current === name} onclick={select_item}>
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