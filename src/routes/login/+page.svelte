<script lang="ts">
	import { enhance } from "$app/forms";

</script>
	<div class="flex justify-center items-center min-h-screen">
		<form class="flex flex-col gap-4 w-full max-w-md" method="POST" action="?/login"
		use:enhance>
			<label for="login"> Login
				<input type="text" name="username" class="w-full bg-gray-200 rounded-md" required>
			</label>
			<label for="password"> Password
				<input type="password" name="password" class="w-full bg-gray-200 rounded-md" required>
			</label>
			<button class="mt-4 hover:bg-red-600 bg-red-500 rounded-lg" type="submit">
				Log in
			</button>
		</form>
	</div>	
<style lang="postcss">

</style>