<script lang="ts">
	import { goto } from "$app/navigation";
	import type { Room } from "../types/rooms";

    let { external_id, name, created_at, owner_id }: Room = $props()
</script>

<div class="flex flex-col grow-10 bg-white hover:bg-gray-100 m-4 rounded-xl" onclick={() => goto("/room/" + external_id)}>
    <p class="m-0">Room</p>
    <p class="m-0" >{name}</p>
    <p class="m-0">{external_id}</p>
    <p class="m-0">{created_at}</p>
</div>


<style>
</style>