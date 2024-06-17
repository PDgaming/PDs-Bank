<script>
    import { goto } from "$app/navigation";

    function login() {
        goto("/login");
    }
    function register() {
        goto("/register");
    }
</script>

<center><h1>Welcome! to PD's Bank</h1></center>

<button class="btn btn-primary" on:click={login}>Login</button>
<button class="btn btn-primary" on:click={register}>Register</button>
