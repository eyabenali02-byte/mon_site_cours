const mesCours = [
    {
        titre: "Analyse Mathématique",
        matiereNom: "Analyse",
        description: "Limites, continuité et dérivées. Résumé complet.",
        fichier: "cours/analyse-chap1.pdf"
    },
    {
        titre: "Algèbre Mathématique",
        matiereNom: "Algèbre",
        description: "Résumé complet.",
        fichier: "cours/algebre-chap1.pdf"
    },
    {
        titre: "Algorithmique - Structures de données",
        matiereNom: "ASD",
        description: "TD, cours détaillé.",
        fichier: "cours/algo.pdf"
    },
    {
        titre: "Atelier de programmation",
        matiereNom: "Language C",
        description: "Cours détaillé, TP avec corrigé.",
        fichier: "cours/langage-c.pdf"
    },
    {
        titre: "Département de Physique",
        matiereNom: "Électricité électronique",
        description: "Cours complet.",
        fichier: "cours/prof-zaag.pdf"
    },
    {
        titre: "Département de Physique",
        matiereNom: "Propagation et rayonnement",
        description: "Cours complet.",
        fichier: "cours/propagation.pdf"
    },
    {
        titre: "Département de Physique",
        matiereNom: "Système logique",
        description: "Cours complet.",
        fichier: "cours/syslogique.pdf"
    },
    {
        titre: "Français",
        matiereNom: "Technique de communication",
        description: "Cours complet.",
        fichier: "cours/technique-communication.pdf"
    }
];

const grille = document.getElementById('coursesGrid');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');

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

        const lienHTML = cours.fichier
            ? `<a href="${cours.fichier}" download>⬇️ Télécharger</a>`
            : `<span class="indisponible">Bientôt disponible</span>`;

        carte.innerHTML = `
            <span class="matiere">${cours.matiereNom}</span>
            <h3>${cours.titre}</h3>
            <p>${cours.description}</p>
            ${lienHTML}
        `;
        grille.appendChild(carte);
    });
}

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
