export default {
  navbar: ["demander un nouvel arbitrage", "Initier l'arbitrage"],
  unit: "人",
  form: {
    title: "Rappel spécial :\nLa falsification et la modification de bons de paiement constituent un acte illégal grave. Si vous soumettez des mots de passe de demande pertinents, veillez à garantir la sécurité de vos biens personnels",
    event: {
      title: "Événement d'arbitrage",
      label: "Preuve d'informations textuelles",
      placeholder: "Décrire les circonstances et fournir les informations nécessaires à l'arbitre pour vérifier les circonstances",
      type: ["objection d'arbitrage", "autre"]
    },
    upload: {
      title: ["Preuve d'informations sur l'image", "Preuves pertinentes ayant force de loi"],
    },
    arbitrator: {
      title: "Ajouter un arbitre",
      default: "défaut",
    },
    pay: {
      title: "Besoin de payer",
      explain: {
        start: [
          "Description : Après avoir lancé l'arbitrage, la plateforme déléguera",
          "arbitres pour décider",
          "besoin de payer",
          "Si l'arbitrage est annulé ou si l'arbitrage est finalement gagné",
          "Sera remboursé sur votre compte"
        ],
        again: [
          "Remarque : La demande de réarbitrage nécessite un paiement",
          "défaut de l'arbitre",
          "Un arbitre supplémentaire est payable"
        ]
      }
    },
    submit: "nous faire parvenir"
  },
  popup: {
    title: "Confirmez l'envoi et payez",
    text: "Chaque personne ne peut soumettre qu'une seule demande d'extension, veuillez la remplir attentivement, êtes-vous sûr de soumettre cette demande d'extension et de payer ?",
    checkbox: "j'ai confirmé",
    submit: "OK pour soumettre et payer",
    cancel: "laisse-moi repenser"
  }
}