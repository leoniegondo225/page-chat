// messageHandler.js
export function AddMessage(container, text, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('d-flex', 'align-items-center', 'mb-3');
    
    if (isUser) {
        messageDiv.classList.add('justify-content-end');
        messageDiv.innerHTML = `
            <div class="p-3 bg-warning text-light rounded-3">
                ${text}
            </div>
            <img src="./images/profil1.webp" class="rounded-circle ms-3" width="40" alt="Avatar de l'utilisateur">
        `;
    } else {
        messageDiv.innerHTML = `
            <img src="./images/img2.webp" class="rounded-circle me-3" width="40" alt="Avatar de Jean Marc">
            <div class="p-3 bg-light rounded-3">
                ${text}
            </div>
        `;
    }

    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}





// Sélection des éléments de l'interface utilisateur
const messageContainer = document.getElementById('messageContainer');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');

// Fonction pour envoyer un message
 const sendMessage = () => {
    const messageText = messageInput.value.trim();

    if (messageText) {
        // Ajouter le message de l'utilisateur
        AddMessage(messageContainer, messageText);
        messageInput.value = ''; // Réinitialiser le champ de saisie

        // Simuler une réponse automatique
        setTimeout(() => AddMessage(messageContainer, "Ca va et toi !", false), 1000);
    }
};

// Événement pour le clic sur le bouton d'envoi
sendMessageButton.addEventListener('click', sendMessage);

// Événement pour appuyer sur "Entrée" dans le champ de saisie
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

