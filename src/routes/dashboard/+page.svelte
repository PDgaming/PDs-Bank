<script>
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    let userData = null;
    async function getUserData() {
        const accountId = window.sessionStorage.getItem("ID");

        const { data, error } = await supabase
            .from("Users")
            .select()
            .eq("ID", accountId);

        if (error) {
            console.log(error);
        } else {
            userData = data[0];
        }
    }
    onMount(getUserData);
</script>

<center>
    <h1>Welcome to your dashboard!!</h1>
</center>

{#if userData}
    First Name: {userData?.FirstName || "Loading..."}<br />
    Last Name: {userData?.LastName || "Loading..."}<br />
    Email: {userData?.Email || "Loading..."}<br />
    Balance: {userData?.Balance}
{/if}
