<script lang="ts">
	import { enhance } from "$app/forms";

</script>
	<div class="wrapper">
		<form class="form" method="POST" action="?/login"
		use:enhance>
			<label for="login"> Login
				<input type="text" name="username" class="username" required>
			</label>
			<label for="password"> Password
				<input type="password" name="password" class="password" required>
			</label>
			<button type="submit">Log in</button>
		</form>
	</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	.form {
		display: flex;
		position: relative;
		flex-direction: column;
		gap: 10px;
		max-width: 50%;
	}

	.username {
		width: 100%;
		height: 24px;
	}
	
	.password {
		width: 100%;
		height: 24px;
	}
</style>
