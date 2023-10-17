// function affiche image accueil
const recupimg = await fetch("http://localhost:5678/api/works");
const ListeImg = await recupimg.json();
function generationDesimages(ListeImg) {

    for (let i = 0; i < ListeImg.length; i++) {

        const gallery = ListeImg[i];
        const img_banner = document.createElement("img");
        img_banner.src = gallery.imageUrl;

        const captionp = document.createElement("figcaption");
        captionp.innerText = gallery.title;
        const divImages = document.querySelector(".gallery")
        //
        const mesImages = document.createElement("figure");
        mesImages.classList.add(`js-projet-${ListeImg[i].id}`);
        divImages.appendChild(mesImages);
        mesImages.appendChild(img_banner)
        mesImages.appendChild(captionp);
    }
} generationDesimages(ListeImg)

//call function genererimages


// Function Gestion des tries
//recu btn trie
const All_img = document.querySelector(".tous");
const objet = document.querySelector(".objet");
const appartement = document.querySelector(".apprt");
const hotelEtrestaurant = document.querySelector(".hotr");
//end recup btn trie

//add listerner btn all_img
All_img.addEventListener("click", function () {
    const appt = ListeImg.filter(function (images) {
        return images;
    })
    console.log(appt)
    document.querySelector(".gallery").innerHTML = "";
    generationDesimages(appt);
})
//end btn btn all_img

//add listerner btn trie by objet
objet.addEventListener('click', function () {
    const tousnosimages = ListeImg.filter(function (images) {
        return images.category.name === "Objets";
    })
    console.log(tousnosimages);
    console.log('ok')
    document.querySelector(".gallery").innerHTML = "";
    generationDesimages(tousnosimages);
})
//end btn trie by objet

//add listerner btn trie by appartement

appartement.addEventListener("click", function () {
    const appt = ListeImg.filter(function (images) {
        return images.category.name === "Appartements";
    })
    console.log(appt)
    document.querySelector(".gallery").innerHTML = "";
    generationDesimages(appt);
})
//End btn trie by appartement

//add listerner btn trie by hotel_Et_restaurant

hotelEtrestaurant.addEventListener('click', function () {
    const app = ListeImg.filter(function (images) {
        return images.category.name === "Hotels & restaurants";
    })
    console.log(app)
    document.querySelector(".gallery").innerHTML = "";
    generationDesimages(app);
})
//End btn trie by hotel_Et_restaurant

/* ********************************************* 
                                              Partie module 
                                                            *******************************************/
/******** Module admin *******/

// ***********
/*    Gestion connexion deconnexion  */
//                                              ****************//

const token = localStorage.getItem("token");

const logout = document.querySelector('.logout');
const section_modifier = document.querySelector('.modifier');
const PorFolio = document.querySelector(".trie");
const h2 = document.querySelector("#h2");

//** Modal Admin **/
function ModalAdmin() {
    document.querySelectorAll(".modal_adm").forEach(a => {
        if (token === null) {
            return;
        }
        else {
            a.removeAttribute("aria-hidden")
            a.removeAttribute("style")
            logout.innerHTML = "Logout";
            section_modifier.style.display = "block"
            PorFolio.style.display = "none";
            h2.style.marginBottom = 0;

        }
    });

} ModalAdmin();
// deconnexion
function Exit_admin() {
    localStorage.removeItem('token')
    window.location.href = "login.html"
}
logout.addEventListener("click", Exit_admin);
//End Connexion and Dec

/***********************************
 *                                  Gestion modal gestion gallary admin
 *                                                                     ********************************************/




const DonneAdd = await fetch('http://localhost:5678/api/works');
const DonneModule = await DonneAdd.json();
const Photo_add = document.querySelector('.OnModule_photo')
let id;

async function add_photo(DonneModule) {
    for (let i = 0; i < DonneModule.length; i++) {
        const Mes_gallery = DonneModule[i];

        const img_module = document.createElement("img");
        img_module.src = Mes_gallery.imageUrl;


        // Div supression
        const trash_pic = document.createElement('div');
        Photo_add.appendChild(trash_pic);
        trash_pic.classList.add("move")

        //trash_pic.classList.add(`js-move-${ListeImg[i].id}`);


        const S_delete = document.createElement('i');
        S_delete.classList.add("fa-solid", "fa-trash-can", "Fa-dele");
        // ADD click fa-solid
        const divD_Fa = document.createElement("div")
        trash_pic.appendChild(divD_Fa)
        S_delete.setAttribute("id", DonneModule[i].id)

        //
        divD_Fa.appendChild(S_delete)
        trash_pic.appendChild(img_module)

        const mesImages = document.createElement("figure");
        divD_Fa.classList.add(DonneModule[i].id);
        Photo_add.appendChild(trash_pic);

    }
    Ajout_listerner_Trash()

} add_photo(DonneModule)

//End modale Admin

/********************************************** 
 *                                        Gestion open modal 
 *                                                          ******************************/

let modal = null; 
const openModule = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null;
    target.removeAttribute('aria-hidden')
    target.setAttribute("aria-modal", true)
    modal = target;
    modal.addEventListener('click', closeModal)
    modal.querySelector('.exited').addEventListener("click", closeModal);
    modal.querySelector('.js-modal-stop').addEventListener("click", stopPro);
}
// gestion fermeture modal
const closeModal = (e) => {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    moadal.setAttribute('aria-hidden', 'true')
    moadal.removeAttribute("aria-modal")
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.exited').removeEventListener("click", closeModal);
    modal = null;
}

const stopPro = (e) => {
    e.stopPropagation();
}
//End Close modal admin

/********************************************
 *                                 Suppression projet
 *                                  ************************************************* */
function Ajout_listerner_Trash() {

    let recovery_id_delete = document.querySelectorAll(".Fa-dele");
    for (let i = 0; i < recovery_id_delete.length; i++) {
        recovery_id_delete[i].addEventListener("click", function (event) {
            const id = event.target.id;
            fetch(`http://localhost:5678/api/works/`);
            console.log('test')
            console.log(id)
            const response = fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (response.ok) {
                        console.log(`Projet ${id} supprimé avec succès`)
                        alert(`Projet Id ${id} supprimeé`)
                        //actualisation_des_pages()

                    }
                    else if (!response.ok) {
                        console.log('Suppression non autorisée ')
                    }
                })
                // Envoie erreur si promesse non respectée
                .catch(error => {
                    console.error('Erreur de suppression:', error);
                })

        })

    }


}

// End del projet

function actualisation_des_pages(i) {
    const ProjetAdminActu = document.querySelector(`.js-move-${i}`);
    ProjetAdminActu.style.display = "none";

    const ActuProjetAccueil = document.querySelector(`.js-projet-${i}`);
    ActuProjetAccueil.style.display = "none";
}


let modal2 = null
const open_Modal_add_projet = function (e) {
    e.preventDefault()
    const add_projet = document.querySelector(e.target.getAttribute('href'))
    add_projet.style.display = null
    modal2 = add_projet;
    modal2.addEventListener('click', closeModal_add_projet)
    modal2.querySelector('.js-close-add-projet').addEventListener('click', closeModal_add_projet)
    modal2.querySelector('.js-stop_modal').addEventListener('click', stopProp)

}

//Gestion fermeture modal 2 Add Pic

const closeModal_add_projet = (e) => {
    if (modal2 === null) return
    e.preventDefault();
    modal2.style.display = "none"
    modal2.setAttribute('aria-hidden', 'true')
    modal2.addEventListener('click', closeModal_add_projet)
    modal2.querySelector('.js-close-add-projet').removeEventListener('click', closeModal_add_projet)
    modal2 = null
}
const stopProp = function (e) {
    e.stopPropagation();
}
document.querySelectorAll('.js-modal-add-projet').forEach(a => {
    a.addEventListener('click', open_Modal_add_projet)
    a.addEventListener('click', closeModal)
})

document.querySelectorAll('.js-modale').forEach(a => {
    a.addEventListener('click', closeModal_add_projet);
    a.addEventListener('click', openModule);
})
// End close module2


// Affichage image

const see_image = (e) => {
    const file_selected = e.target.files[0];
    const img = document.createElement("img")
    const div = document.createElement("div")
    div.classList.add("afficher")
    const div_body = document.querySelector(".add_photo-form")
    div_body.appendChild(div)
    div.appendChild(img)
    if (file_selected.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file_selected);
    } else {
        img.src = "";
    }
}
document.querySelectorAll('.add_photo').forEach(input => {
    input.addEventListener('change', see_image)
});
// End Affichage image

/************************************** 
 *                                     Ajout Projet
 *                                                *******************************************/



const formula_Add_projet = document.querySelector('.modal_add_photo');
formula_Add_projet.addEventListener("submit", async (e, id) => {
    e.preventDefault();
    const image_url = document.querySelector(".add_photo").files[0];
    const titre_image = document.querySelector(".add_titre_photo").value;
    const ID_cate = document.querySelector(".add_categorie").value;
    const input = document.querySelector(id)
    //console.log('test')
    if (image_url === undefined || titre_image === "" || ID_cate === "") {
        const input = document.querySelector('#titre')
        const cate_gor = document.querySelector("#catgorie")
        const pc = document.querySelector("#errorc")
        const p = document.querySelector("#error")
        const photo = document.querySelector(".add_photo-form")
        input.classList.add("erreur")
        cate_gor.classList.add('erreur')
        photo.classList.add('erreur')
        p.innerHTML = "Veuillez rentrer le titre de l'image !"
        pc.innerHTML = `Veuillez choisir une catégorie ! `
    } else if (image_url !== null && titre_image !== null && ID_cate === "") {
        const input = document.querySelector('#titre')
        const cate_gor = document.querySelector("#catgorie")
        const pc = document.querySelector("#errorc")
        const p = document.querySelector("#error")
        const photo = document.querySelector(".add_photo-form")

        p.innerHTML = "Veuillez rentrer le titre de l'image !"
        pc.innerHTML = `Veuillez choisir une catégorie ! `


    } else {
        const Data = new FormData();
        Data.append('title', titre_image)
        Data.append('image', image_url)
        Data.append('category', ID_cate)


        console.log(Array.from(Data))
        await fetch(`http://localhost:5678/api/works/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: Data
        })
            .then(response => {
                if (response.ok) {
                    console.log("Projet ajouté avec succès")
                    alert("Bravo votre projet a été ajouté avec succès")
                } else if (!response.ok) {
                    console.log('Ajout non autorisée ')
                    alert(`Ajout non autorisée!`)

                }
            })
            // Envoie erreur si promesse non respectée
            .catch(error => {
                console.error('Erreur token :', error);
            })

    }
});
// End ajout Projet



