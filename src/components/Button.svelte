<script lang="ts">

    type ButtonTypes = 'submit'|'reset'|'button'|null;
    
    export let className = ""
    export let type = "button"

</script>


<div class="container">
    <button class={className} type={type}>Log in</button>
</div>

<style>
    button {
        background-color: var(--color, #1E90FF);
        width: 100%
    }
</style>