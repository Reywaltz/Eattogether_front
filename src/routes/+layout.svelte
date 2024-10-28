<script>
	// TODO FIX TYPES AFTER MIGRATING TO RUNES
	import Header from "../components/Header.svelte";
	let { children } = $props();

</script>
<Header/>
{@render children()}