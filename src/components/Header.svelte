<script lang="ts">
</script>


<div class='header'>
    <a class="header__text" href="/rooms">Header</a>
    <form class="signOutForm" action="/logout" method="POST">
        <button class="signOutButton" type="submit">Sign Out</button>
    </form>
</div>

<style>
    .header__text {
        font-size: 32px;
        text-decoration: none;
        color: black;
    }

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