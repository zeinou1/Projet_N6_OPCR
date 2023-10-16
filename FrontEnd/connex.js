/* Partie login */


const Btn_submit = document.querySelector('#submit')
Btn_submit.addEventListener("click", function (e) {
    e.preventDefault();
    const User_email = document.querySelector('#email').value;
    const User_password = document.querySelector('#password').value;
    const Donnee_user = {
        email: User_email,
        password: User_password,
    };

    //  api 
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Donnee_user),
    })
        .then(response => response.json())

        .then(data => {
            if (data.token) {
                window.location.href = "index.html";
                localStorage.setItem("token", data.token);
              
            } else {
                console.log('Problème de connexion')
                alert("Mot de passe invalid");
            }
        })
        .catch(error => {
            console.error("Erreur d'authentification : " + error);
        });
});
//End login