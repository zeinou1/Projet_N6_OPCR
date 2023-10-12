/* Partie login */

// Écoutez l'événement de soumission du formulaire
export const ButtonSubmit = document.querySelector('#submit')
ButtonSubmit.addEventListener("click", function (e) {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    // Récupérez les valeurs des champs email et mot de passe
    const email = emailInput.value;
    const password = passwordInput.value;

    // Créez un objet de données d'authentification
    const authData = {
        email: email,
        password: password,
    };

    // Effectuez une requête POST vers votre API Swagger pour l'authentification
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    })
        .then(response => response.json())

        .then(data => {
            // Vérifiez si la réponse contient un token ou des informations d'authentification
            if (data.token) {
                // Stockez le token dans le stockage local pour une utilisation ultérieure (à des fins de démonstration)
                localStorage.setItem("token", data.token);

                // Redirigez l'utilisateur vers la page d'accueil ou une autre page sécurisée
                window.location.href = "index.html";

            } else {
                // Affichez un message d'erreur si l'authentification a échoué
                alert("Erreur d' authentification ");
            }
        })
        .catch(error => {
            console.error("Erreur d'authentification : " + error);
        });
});
//End login