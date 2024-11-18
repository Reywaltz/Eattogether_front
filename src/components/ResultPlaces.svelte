<script lang="ts">
    import logo from '$lib/assets/i.webp'

    let {name, vote_count} = $props()

</script>


<div class='flex flex-col items-center max-h-fit max-w-64 m-3 hover:bg-red-500 transion duration-300'>
    <p class="text-center text-4xl m-0">{name}</p>
    <img class="sm-w-12 pt-5 rounded-xl" src={logo} alt="logo">
    <p class="text-center text-4xl m-0">{vote_count}</p>
</div>