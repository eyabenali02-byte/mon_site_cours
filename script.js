const mesCours = [
  { 
    matiere: "ASD", 
    titre: "Algorithmique & Structures de données", 
    chapitres: [
      { nom: "Chapitre 1 - Introduction", fichier: "algo_ch1.pdf" },
      { nom: "Chapitre 2 - Les variables", fichier: "algo_ch2.pdf" },
      { nom: "Chapitre 3 - Les conditions", fichier: "algo_ch3.pdf" },
      { nom: "Chapitre 4 - Les boucles", fichier: "algo_ch4.pdf" },
      { nom: "Chapitre 5 - Les tableaux", fichier: "algo_ch5.pdf" },
      { nom: "Chapitre 6 - Les fonctions", fichier: "algo_ch6.pdf" },
      { nom: "Chapitre 7 - Tri et recherche", fichier: "algo_ch7.pdf" },
      { nom: "Chapitre 8 - Récursivité", fichier: "algo_ch8.pdf" }
    ] 
  }
];

// NE TOUCHE PAS EN DESSOUS
const container = document.getElementById("liste-cours");
mesCours.forEach(cours => {
  let html = `<div style="border:1px solid #ddd; padding:15px; margin:15px; border-radius:10px;">
    <h2>${cours.matiere} - ${cours.titre}</h2>`;
  
  cours.chapitres.forEach(ch => {
    html += `<p>${ch.nom} <a href="${ch.fichier}" download style="background:#007bff; color:white; padding:5px 10px; text-decoration:none; border-radius:5px; margin-left:10px;">Télécharger</a></p>`;
  });
  
  html += `</div>`;
  container.innerHTML += html;
});
