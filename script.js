const mesCours = [
    {
        titre: " Mathématique",
        matiereNom: "Analyse",
        description: ".",
        chapitres: [
            { titre: "", fichier: "" },
            { titre: "", fichier: "" },
            { titre: "", fichier: "" },
            { titre: "", fichier: "" }
        ]
    },
    {
        titre: "Mathématique",
        matiereNom: "Algèbre",
        description: "",
        chapitres: [
            { titre: "", fichier: "" }
        ]
    },
    {
        titre: "Algorithmique - Structures de données",
        matiereNom: "ASD",
        description: "",
        chapitres: [
            { titre: "notion de base ", fichier: "coursalgo.pdf" },
            { titre: " ", fichier: "" }
        ]
    },
    {
        titre: "Atelier de programmation",
        matiereNom: "Language C",
        description: "",
        chapitres: [
            { titre: "", fichier: "" },
            { titre: "", fichier: "" }
        ]
    },
    {
        titre: "Département de Physique",
        matiereNom: "Électricité électronique",
        description: "",
        chapitres: [
            { titre: "", fichier: "" }
        ]
    },
    {
        titre: "Département de Physique",
        matiereNom: "Propagation et rayonnement",
        description: "",
        chapitres: [
            { titre: "", fichier: "" }
        ]
    },
    {
        titre: "Département de Physique",
        matiereNom: "Système logique",
        description: "",
        chapitres: [
            { titre: "", fichier: "" }
        ]
    },
    {
        titre: "Français",
        matiereNom: "Technique de communication",
        description: "",
        chapitres: [
            { titre: "", fichier: "" }
        ]
    }
];

const grille = document.getElementById('coursesGrid');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const modal = document.getElementById('modal');
const modalMatiere = document.getElementById('modalMatiere');
const modalTitre = document.getElementById('modalTitre');
const modalDescription = document.getElementById('modalDescription');
const modalListe = document.getElementById('modalListe');
const modalFermer = document.getElementById('modalFermer');

// Construit dynamiquement les options du filtre à partir des données,
// pour qu'il ne puisse jamais être désynchronisé avec mesCours.
function initFiltre() {
    const matieres = [...new Set(mesCours.map(c => c.matiereNom))].sort();
    matieres.forEach(matiere => {
        const option = document.createElement('option');
        option.value = matiere;
        option.textContent = matiere;
        filterSelect.appendChild(option);
    });
}

// Affiche une liste de cours dans la grille
function afficherCours(liste) {
    grille.innerHTML = '';

    if (liste.length === 0) {
        grille.innerHTML = '<p class="vide">Aucun cours trouvé 😕</p>';
        return;
    }

    liste.forEach(cours => {
        const carte = document.createElement('div');
        carte.className = 'carte';
        carte.tabIndex = 0;
        carte.setAttribute('role', 'button');

        const nbChapitres = cours.chapitres.length;
        const compteur = nbChapitres > 0
            ? `${nbChapitres} document${nbChapitres > 1 ? 's' : ''}`
            : 'Bientôt disponible';

        carte.innerHTML = `
            <h3>${cours.titre}</h3>
            <p>${cours.description}</p>
            <span class="compteur">📄 ${compteur}</span>
        `;

        const ouvrir = () => ouvrirModal(cours);
        carte.addEventListener('click', ouvrir);
        carte.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                ouvrir();
            }
        });

        grille.appendChild(carte);
    });
}

// Ouvre le modal avec la liste des chapitres/fichiers du cours choisi
function ouvrirModal(cours) {
    modalMatiere.textContent = cours.matiereNom;
    modalTitre.textContent = cours.titre;
    modalDescription.textContent = cours.description;

    modalListe.innerHTML = '';

    if (cours.chapitres.length === 0) {
        modalListe.innerHTML = '<p class="vide">Aucun document disponible pour l\'instant.</p>';
    } else {
        cours.chapitres.forEach(chap => {
            const ligne = document.createElement('div');
            ligne.className = 'chapitre-ligne';

            const lienHTML = chap.fichier
                ? `<a href="${chap.fichier}" download>⬇️ Télécharger</a>`
                : `<span class="indisponible">Bientôt disponible</span>`;

            ligne.innerHTML = `
                <span class="chapitre-nom">${chap.titre || ''}</span>
                ${lienHTML}
            `;
            modalListe.appendChild(ligne);
        });
    }

    modal.classList.add('ouvert');
    modalFermer.focus();
    document.body.style.overflow = 'hidden';
}

function fermerModal() {
    modal.classList.remove('ouvert');
    document.body.style.overflow = '';
}

modalFermer.addEventListener('click', fermerModal);
modal.addEventListener('click', e => {
    if (e.target === modal) fermerModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('ouvert')) fermerModal();
});

// Filtre selon le texte recherché et la matière sélectionnée
function filtrer() {
    const texte = searchInput.value.trim().toLowerCase();
    const matiere = filterSelect.value;

    const resultats = mesCours.filter(cours => {
        const okTexte = cours.titre.toLowerCase().includes(texte) ||
                         cours.description.toLowerCase().includes(texte) ||
                         cours.matiereNom.toLowerCase().includes(texte);
        const okMatiere = matiere === 'all' || cours.matiereNom === matiere;
        return okTexte && okMatiere;
    });

    afficherCours(resultats);
}

searchInput.addEventListener('input', filtrer);
filterSelect.addEventListener('change', filtrer);

initFiltre();
afficherCours(mesCours);
/* ============================================================
   FORUM ÉTUDIANT — sans mot de passe
   ============================================================ */

const FORUM_STORAGE_KEY = "forum_messages";

const forumPseudo = document.getElementById('forumPseudo');
const forumMessage = document.getElementById('forumMessage');
const forumPublierBtn = document.getElementById('forumPublierBtn');
const forumMessages = document.getElementById('forumMessages');

function lireMessages() {
    try {
        return JSON.parse(localStorage.getItem(FORUM_STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function sauverMessages(messages) {
    localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(messages));
}

function chargerMessages() {
    const messages = lireMessages();
    forumMessages.innerHTML = '';

    if (messages.length === 0) {
        forumMessages.innerHTML = '<p class="forum-vide">Aucun message pour l\'instant. Sois la première à écrire ! ✨</p>';
        return;
    }

    messages.slice().reverse().forEach(msg => {
        const div = document.createElement('div');
        div.className = 'message';

        const date = new Date(msg.date);
        const dateStr = date.toLocaleString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        div.innerHTML = `
            <button class="message-supprimer" title="Supprimer">✕</button>
            <div class="message-entete">
                <span class="message-auteur">${echapperHTML(msg.auteur)}</span>
                <span class="message-date">${dateStr}</span>
            </div>
            <div class="message-texte">${echapperHTML(msg.texte)}</div>
        `;

        div.querySelector('.message-supprimer').addEventListener('click', () => {
            const pseudoActuel = forumPseudo.value.trim() || "Anonyme";
            if (msg.auteur !== pseudoActuel) {
                alert("Tu ne peux supprimer que tes propres messages.");
                return;
            }
            if (confirm("Supprimer ce message ?")) {
                const nouveaux = lireMessages().filter(m => m.id !== msg.id);
                sauverMessages(nouveaux);
                chargerMessages();
            }
        });

        forumMessages.appendChild(div);
    });
}

forumPublierBtn.addEventListener('click', () => {
    const auteur = forumPseudo.value.trim() || "Anonyme";
    const texte = forumMessage.value.trim();

    if (!texte) {
        alert("Écris un message avant de publier 😊");
        return;
    }

    const messages = lireMessages();
    messages.push({
        id: Date.now() + "_" + Math.random().toString(36).slice(2, 8),
        auteur: auteur,
        texte: texte,
        date: new Date().toISOString()
    });
    sauverMessages(messages);

    forumMessage.value = '';
    chargerMessages();
});

function echapperHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

chargerMessages();

