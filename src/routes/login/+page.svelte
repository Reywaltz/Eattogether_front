<script lang="ts">
	import { enhance } from "$app/forms";
	import {Button} from 'flowbite-svelte'
</script>
	<div class="flex justify-center items-center min-h-screen">
		<form class="flex flex-col gap-4 w-full max-w-md" method="POST" action="?/login"
		use:enhance>
			<label for="login"> Логин
				<input type="text" name="username" class="w-full bg-gray-200 rounded-md" required>
			</label>
			<label for="password"> Password
				<input type="password" name="password" class="w-full bg-gray-200 rounded-md" required>
			</label>
			<Button color='red' type="submit">Войти</Button>
		</form>
	</div>	
<style lang="postcss">

</style>