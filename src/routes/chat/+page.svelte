<script lang="ts">
	import { env } from "$env/dynamic/public";
	import {  onMount } from "svelte";
	import type { SocketMessage } from "../../types/message";

    let socket: WebSocket
    let socket_messages = $state<SocketMessage[]>([])
    
    onMount(() => {    
        socket = new WebSocket(env.PUBLIC_API_URL + "/ws");
        socket.onopen = (event) => {
            console.log("Conneted");            
        }
    
        socket.onclose = (event) => {
            console.log("Closed");
        }
    
        socket.onmessage = (event) => {
            socket_messages.push(event.data)
        }

        socket.onclose = (event) => {
            socket.close()
        }
    })

    function send_message() {
        socket.send(JSON.stringify({
            "username": "Temmy",
            "message": "Hi from client"
        }))
    }

</script>

    
<div class="flex text-white max-h-fit justify-center flex-col bg-black">
    {#each socket_messages as message}
        <p>{message}</p>
    {/each}
    <button onclick={send_message}>Click me</button>
</div>

<style>
</style>