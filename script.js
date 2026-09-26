const mesCours = [
    {
        titre: "Analyse Mathématique",
        matiereNom: "Analyse",
        description: "Limites, continuité et dérivées. Résumé complet.",
        chapitres: [
            { titre: "Chapitre 1 - Limites", fichier: "cours/analyse-chap1.pdf" },
            { titre: "Chapitre 2 - Continuité", fichier: "cours/analyse-chap2.pdf" },
            { titre: "Chapitre 3 - Dérivées", fichier: "cours/analyse-chap3.pdf" },
            { titre: "Résumé complet", fichier: "cours/analyse-resume.pdf" }
        ]
    },
    {
        titre: "Algèbre Mathématique",
        matiereNom: "Algèbre",
        description: "Résumé complet.",
        chapitres: [
            { titre: "Résumé complet", fichier: "cours/algebre-resume.pdf" }
        ]
    },
    {
        titre: "Algorithmique - Structures de données",
        matiereNom: "ASD",
        description: "TD, cours détaillé.",
        chapitres: [
            { titre: "Cours complet", fichier: "cours/algo-cours.pdf" },
            { titre: "TD corrigé", fichier: "coursalgo.pdf" }
        ]
    },
    {
        titre: "Atelier de programmation",
        matiereNom: "Language C",
        description: "Cours détaillé, TP avec corrigé.",
        chapitres: [
            { titre: "Cours détaillé", fichier: "cours/langage-c-cours.pdf" },
            { titre: "TP avec corrigé", fichier: "cours/langage-c-tp.pdf" }
        ]
    },
    {
        titre: "Département de Physique",
        matiereNom: "Électricité électronique",
        description: "Cours complet.",
        chapitres: [
            { titre: "Cours complet", fichier: "cours/prof-zaag.pdf" }
        ]
    },
    {
        titre: "Département de Physique",
        matiereNom: "Propagation et rayonnement",
        description: "Cours complet.",
        chapitres: [
            { titre: "Cours complet", fichier: "cours/propagation.pdf" }
        ]
    },
    {
        titre: "Département de Physique",
        matiereNom: "Système logique",
        description: "Cours complet.",
        chapitres: [
            { titre: "Cours complet", fichier: "cours/syslogique.pdf" }
        ]
    },
    {
        titre: "Français",
        matiereNom: "Technique de communication",
        description: "Cours complet.",
        chapitres: [
            { titre: "Cours complet", fichier: "cours/technique-communication.pdf" }
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
            <span class="matiere">${cours.matiereNom}</span>
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
            ligne.innerHTML = `
                <span class="chapitre-nom">${chap.titre}</span>
                <a href="${chap.fichier}" download>⬇️ Télécharger</a>
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
