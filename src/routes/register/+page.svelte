<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    async function generateUUID() {
        if (
            typeof window !== "undefined" &&
            window.crypto &&
            window.crypto.randomUUID
        ) {
            return window.crypto.randomUUID();
        } else {
            console.log(
                "crypto.randomUUID not supported. Using a fallback method.",
            );
            // Fallback for older browsers (explained below)
            const randomPart = Math.random().toString(36).substring(2, 15);
            return `${randomPart}`;
        }
    }
    async function getPrivateKey() {
        const privateKey = await generateUUID();
        return privateKey;
    }
    async function getPublicKey() {
        const publicKey = await generateUUID();
        return publicKey;
    }

    async function register() {
        //@ts-ignore
        const firstName = document.getElementById("firstName").value;
        //@ts-ignore
        const lastName = document.getElementById("lastName").value;
        //@ts-ignore
        const email = document.getElementById("email").value;
        //@ts-ignore
        const password = document.getElementById("password").value;

        const privateKey = await getPrivateKey();
        const publicKey = await getPublicKey();

        if (firstName && lastName && email && password) {
            const { data } = await supabase.from("Users").insert({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Password: password,
                Balance: 0,
                PrivateKey: privateKey,
                PublicKey: publicKey,
            });
            goto("/login");
        } else {
            alert("Please enter all values");
        }
    }
</script>

<center>
    <div class="container">
        <h1>Register</h1>
        <form>
            <div id="loginForm">
                <input
                    class="firstName"
                    id="firstName"
                    placeholder="First Name"
                /><br />
                <input
                    class="lastName"
                    id="lastName"
                    placeholder="Last Name"
                /><br />
                <input class="firstName" id="email" placeholder="Email" /><br />
                <input
                    type="password"
                    class="passwordInput"
                    id="password"
                    placeholder="Password"
                />
                <button id="RegisterButton" on:click={register}>Register</button
                ><br />
                <a href="/">Go Back to Home Page</a>
            </div>
        </form>
    </div>
</center>

<style>
    .container,
    div {
        text-align: center;
    }
    button {
        cursor: pointer;
    }
    .container {
        margin-top: 200px;
        background-color: #1e1f20;
        padding: 20px;
        border-radius: 30px;
    }
    h1 {
        font-size: 50px;
        color: white;
    }
    button,
    input {
        font-size: 20px;
    }

    input {
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .firstName,
    .lastName {
        margin-right: 40px;
        margin-left: 30px;
        margin-bottom: 30px;
        width: 76%;
    }
    .passwordInput {
        margin-right: 40px;
        margin-left: 30px;
        margin-bottom: 50px;
        width: 76%;
    }

    button {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        transition: background-color 0.2s;
        width: 400px;
        margin-bottom: 10px;
    }

    button:hover {
        background-color: #0056b3;
    }

    a {
        text-decoration: none;
        color: #007bff;
    }
</style>
