// 👇 MODIFIE CETTE LISTE avec TES cours
const mesCours = [
    {
        titre: "-Analyse Mathématique-",
        matiereNom: "Analyse ",
        description: "Limites, continuité et dérivées. Résumé complet.",
        fichier: "cours/analyse-chap1.pdf"
    },
    {
        titre: "-Algébre  Mathématique-",
        matiereNom: "Algébre",
        description: " Résumé complet.",
        fichier: "cours/analyse-chap1.pdf"
    },
    {
        titre: "Algorithmique - Structures de données",
        matiereNom: "ASD",
        description: " TD,Cours détaillé.",
        fichier: "coursalgo.pdf"
    },
    {
        titre: "-Atelier de programmation-",
        matiereNom: " Language C ",
        description: " Cours détaillé? Tp avec corrigée .",
        fichier: "cours/algo.pdf"
    },
    {
        titre: "- Département de Physique -",
        matiereNom: "Electricité éléctronique ",
        description: ".",
        fichier: "cours/prof-zaag.pdf"
    },
    {
        titre: "- Département de Physique -",
        matiereNom: "Propagation et rayonnement ",
        description: ".",
        fichier: "cours/propagation.pdf"
    },
    {
        titre: "- Département de Physique -",
        matiereNom: "Systéme logique ",
        description: ".",
        fichier: "cours/syslogique.pdf"
    },
    {
        titre: "-Français-",
        matiereNom: "Technique de communication",
        description: ".",
        fichier: "cours/C.pdf"
    }

];

// Fonction pour afficher les cours
function afficherCours(liste) {
    const grille = document.getElementById('coursesGrid');
    grille.innerHTML = '';

    if (liste.length === 0) {
        grille.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Aucun cours trouvé 😕</p>';
        return;
    }

    liste.forEach(cours => {
        const carte = document.createElement('div');
        carte.className = 'carte';
        carte.innerHTML = `
            <span class="matiere">${cours.matiereNom}</span>
            <h3>${cours.titre}</h3>
            <p>${cours.description}</p>
            <a href="${cours.fichier}" download>⬇️ Télécharger</a>
        `;
        grille.appendChild(carte);
    });
}

// Filtrer les cours
function filtrer() {
    const texte = document.getElementById('searchInput').value.toLowerCase();
    const matiere = document.getElementById('filterSelect').value;

    const resultats = mesCours.filter(c => {
        const okTexte = c.titre.toLowerCase().includes(texte) ||
                        c.description.toLowerCase().includes(texte);
        const okMatiere = matiere === 'all' || c.matiere === matiere;
        return okTexte && okMatiere;
    });

    afficherCours(resultats);
}

// Écouter les changements
document.getElementById('searchInput').addEventListener('input', filtrer);
document.getElementById('filterSelect').addEventListener('change', filtrer);

// Afficher au démarrage
afficherCours(mesCours);
