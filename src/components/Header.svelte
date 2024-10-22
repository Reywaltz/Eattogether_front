<script lang="ts">
</script>


<div class='header'>
    <h1>Header</h1>
    <form class="signOutForm" action="/logout" method="POST">
        <button class="signOutButton" type="submit">Sign Out</button>
    </form>
</div>

<style>
    .header {
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
        background-color: brown;
    }

    .signOutForm {
        display: flex;
        justify-content: center;
    }

</style>