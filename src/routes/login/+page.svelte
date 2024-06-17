<script>
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabaseClient";

    async function login() {
        //@ts-ignore
        const email = document.getElementById("email").value;
        //@ts-ignore
        const password = document.getElementById("password").value;

        let accountFound = false;
        if (email && password) {
            const { data, error } = await supabase
                .from("Users")
                .select("ID, Email, Password");

            if (error) {
                console.log(error);
            } else {
                for (const row of data) {
                    if (row.Email == email && row.Password == password) {
                        accountFound = true;
                        const accountId = row.ID;
                        window.sessionStorage.setItem("ID", accountId);
                        break;
                    }
                }
            }
            if (accountFound) {
                alert("Login Sucessfull!!");
                goto("/dashboard");
            }
        } else {
            alert("Please enter all values");
        }
    }
</script>

<center>
    <div class="container">
        <h1>Login</h1>
        <form>
            <div id="loginForm">
                <input class="email" id="email" placeholder="Email" /><br />
                <input
                    type="password"
                    class="passwordInput"
                    id="password"
                    placeholder="Password"
                />
                <button id="loginButton" on:click={login}>Login</button><br />
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
    .email {
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
