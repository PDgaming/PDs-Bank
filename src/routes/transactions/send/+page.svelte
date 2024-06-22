<script>
    import { supabase } from "$lib/supabaseClient";

    async function send() {
        //@ts-ignore
        const enternedBalance = parseInt(
            document.getElementById("balance").value,
            10,
        );
        //@ts-ignore
        const enteredPublicKey = document.getElementById("publicKey").value;

        if (enteredPublicKey && enternedBalance) {
            const { data, error } = await supabase.from("Users").select();
            if (error) {
                console.log(error);
                alert(
                    "There was an error in getting the data from our database. Please try again later",
                );
            } else {
                let userId = parseInt(window.sessionStorage.getItem("ID"), 10);
                for (const row of data) {
                    let id = row.ID;
                    let publicKeyFromDb = row.PublicKey;
                    let balanceFromDb = row.Balance;
                    const allUsers = [id, publicKeyFromDb, balanceFromDb];

                    if (allUsers[0] == userId) {
                        if (allUsers[2] < enternedBalance) {
                            alert("Funds not available to transfer");
                        } else {
                            try {
                                try {
                                    await supabase
                                        .from("Users")
                                        .update({
                                            Balance:
                                                allUsers[2] - enternedBalance,
                                        })
                                        .eq("ID", userId);
                                } catch {
                                    alert("Debit Not Sucessfull.");
                                }
                            } catch {
                                alert("Transaction Not Successfull.");
                            }
                        }
                    }
                    if (allUsers[1] == enteredPublicKey) {
                        try {
                            await supabase
                                .from("Users")
                                .update({
                                    Balance: allUsers[2] + enternedBalance,
                                })
                                .eq("ID", allUsers[0]);
                            alert("Transaction Successfull!!");
                        } catch {
                            alert("Credit Not Sucessfull.");
                        }
                    }
                }
            }
        } else {
            alert("Please enter all values");
        }
    }
</script>

<form>
    <input id="balance" type="number" placeholder="Balance" />
    <input id="publicKey" placeholder="Receiver's Public Key" />
    <button on:click={send}>Send</button>
</form>
