<script lang="ts">
    import { enhance } from "$app/forms";

    let todayDate = new Date().toISOString().slice(0, 10) 

    let selected_date = $state<string>('')


   $effect(() => console.log(selected_date)) 

</script>

<h1>Выберите дату</h1>
<form method="POST" use:enhance>
    <input bind:value={selected_date} name="date" type="date">
    <button type="submit">Выбрать</button>
</form>
