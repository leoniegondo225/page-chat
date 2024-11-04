

//Inscription des utilisateurs
export const Inscription = () => {
    let InscriptionSubmit = document.getElementById("InscriptionSubmit")
    let viewPassword = document.getElementById("viewPassword")
    let btnModal = document.getElementById("btnModal")
    let password = document.getElementById("password")

    //Afficher et masquer le mot de passe
    viewPassword.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text"
            viewPassword.innerHTML = `<i class="fa fa-eye-slash"></i>`
        } else {
            password.type = "password"
            viewPassword.innerHTML = `<i class="fa fa-eye"></i>`
        }
    })

    //Exutons notre formulaire
    InscriptionSubmit.addEventListener("submit", (e) => {
        e.preventDefault() // preventDefault() empêche que la page soit rafraichi lorsque on soumet le formulaire

        let message = document.getElementById("message")
        let btnSubmit = document.getElementById("btnSubmit")
        let nom = document.getElementById("nom").value
        let prenom = document.getElementById("prenom").value
        let email = document.getElementById("email").value
        let contact = document.getElementById("contact").value


        //On fait patienter l'utilisateur
        btnSubmit.classList.replace("btn-warning", "btn-primary")
        btnSubmit.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Traitement en cours...`

        message.innerHTML = "" //On vide d'abord le message d'erreur
        message.style.display = "none"

        //On test si les champs sont bien rempli
        let test = (nom !== "" && prenom !== "" && email !== "" && contact !== "" && password.value !== "") ? true : false

        console.log(nom)
        if (!test) {
            //On attentd 2ms avant d'afficher l'erreur
            setTimeout(() => {
                message.innerHTML = "Veuillez remplir tous les champs"
                message.style.display = "block"
                btnSubmit.classList.replace("btn-primary", "btn-warning")
                btnSubmit.innerHTML = "Créer un compte"
            }, 1000);
        } else {
            //On recupére les données dans le localStorage
            let table = JSON.parse(localStorage.getItem("utilisateurs")) || []

            //Générons les id des utilisateurs en utilisant la fonction Math.random()
            let id = Math.random().toString(30)
            //On stock les données en localStorage
            table.push({ id, nom, prenom, email, contact, password: password.value })
            localStorage.setItem("utilisateurs", JSON.stringify(table))

            setTimeout(() => {
                btnModal.click() //Ouvre le modal de success
                btnSubmit.classList.replace("btn-primary", "btn-warning")
                btnSubmit.innerHTML = "Créer un compte"
                InscriptionSubmit.reset() //La propriété reset permet de vider le formulaire
            }, 2000)
        }
    })
}





//Connexion
export const connexion = () => {
    let loginSubmit = document.getElementById("loginSubmit")
    let viewPassword = document.getElementById("viewPassword")
    let password = document.getElementById("password")

    //Afficher et masquer le mot de passe
    viewPassword.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text"
            viewPassword.innerHTML = `<i class="fa fa-eye-slash"></i>`
        } else {
            password.type = "password"
            viewPassword.innerHTML = `<i class="fa fa-eye"></i>`
        }
    })

    //Exutons notre formulaire
    loginSubmit.addEventListener("submit", (e) => {
        e.preventDefault() // preventDefault() empêche que la page soit rafraichi lorsque on soumet le formulaire

        let message = document.getElementById("message")
        let btnSubmit = document.getElementById("btnSubmit")
        let email = document.getElementById("email").value

        //On fait patienter l'utilisateur
        btnSubmit.classList.replace("btn-warning", "btn-primary")
        btnSubmit.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Traitement en cours...`

        message.innerHTML = "" //On vide d'abord le message d'erreur
        message.style.display = "none"

        //On test si les champs sont bien rempli
        let test = (email !== "" && password.value !== "") ? true : false

        if (!test) {
            //On attentd 2ms avant d'afficher l'erreur
            setTimeout(() => {
                message.innerHTML = "Email et mot de passe requis"
                message.style.display = "block"
                btnSubmit.classList.replace("btn-primary", "btn-warning")
                btnSubmit.innerHTML = "Se connecter"
            }, 1000);
        } else {
            //On recupére les données dans le localStorage
            let table = JSON.parse(localStorage.getItem("utilisateurs")) || []


            if (table && table.length > 0) {
                //On test si les valeurs saisis correspondent à ce que nous avons dans la BD
                let testUser = table.find(index => index.email === email && index.password === password.value)
                if (testUser !== undefined) {
                    localStorage.setItem("userID", testUser.id) //On sauvegarde l'id de l'utilisateur en local pour tester si il est déjà connecté
                    location.href = "/chat.html" //On redirige l'utilisateur vers la page chat.html lorsque la connexion est reussi
                } else {
                    setTimeout(() => {
                        message.innerHTML = "Email ou mot passe incorrect"
                        message.style.display = "block"
                        btnSubmit.classList.replace("btn-warning", "btn-primary")
                        btnSubmit.innerHTML = "Se connecter"
                    }, 2000)
                }
            } else {
                //Le tableau est vide
                setTimeout(() => {
                    message.innerHTML = "Ce compte n'existe pas"
                    message.style.display = "block"
                    btnSubmit.classList.replace("btn-primary", "btn-warning")
                    btnSubmit.innerHTML = "Se connecter"
                }, 2000)
            }
        }
    })
}