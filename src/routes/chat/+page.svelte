<script lang="ts">
    import {selected_place_data, socket_messages} from "$lib/stores/store"
	import { onMount } from "svelte";

    let socket: WebSocket;

    function initWebSocket() {
        socket = new WebSocket(
            "ws://192.168.1.78:8000/api/v1/ws"
        )

        socket.onopen = (event) => {
            console.log("Conneted");            
        }

        socket.onclose = (event) => {
            console.log("Closed");
            
        }

        socket.onmessage = (event) => {
            socket_messages.update((curentMessages) => [...curentMessages, event.data])
        }
    }

    function send_message() {
        socket.send(JSON.stringify({
            "username": "Temmy",
            "message": "Hi from client"
        }))
    }

    onMount(() => {
        initWebSocket();
    });

    $: console.log($socket_messages);
    

</script>

<h1>{JSON.stringify($selected_place_data)}</h1>

    
<div class="chat">
    {#each $socket_messages as message}
        <p>{message}</p>
    {/each}
    <button on:click={send_message}>Click me</button>
</div>

<style>
    .chat {
        display: flex;
        color: white;
        max-height: fit-content;
        justify-content: center;
        flex-direction: column;
        background-color: black;
    }
</style>