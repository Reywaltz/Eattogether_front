<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Room } from "../types/rooms";

    let { external_id, name, created_at }: Room = $props()
</script>

<div class="room_container" onclick={() => goto("/room/" + external_id)}>
    <p>Room</p>
    <p>{name}</p>
    <p>{external_id}</p>
    <p>{created_at}</p>
</div>


<style>
    .room_container {
        display: flex;
        flex-direction: column;
        flex-grow: 10;
        background-color: #f3f3f3;
        border-radius: 10px;
        margin: 10px
    }

    .room_container:hover {
        background-color: grey; 
    }

    p {
        margin: 0px;
    }
</style>