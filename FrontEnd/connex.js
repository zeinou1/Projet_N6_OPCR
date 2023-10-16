/* Partie login */

export const ButtonSubmit = document.querySelector('#submit')
ButtonSubmit.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const email = emailInput.value;
    const password = passwordInput.value;

    const authData = {
        email: email,
        password: password,
    };

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    })
        .then(response => response.json())

        .then(data => {
            if (data.token) {
                localStorage.setItem("token", data.token);

                window.location.href = "index.html";

            } else {
                alert("Erreur d' authentification ");
            }
        })
        .catch(error => {
            console.error("Erreur d'authentification : " + error);
        });
});
//End login