export default {
  navbar: ["Richiedere un nuovo arbitrato", "Avviare l'arbitrato"],
  unit: "le persone",
  form: {
    title: "Nota speciale:\nFalsificare e alterare buoni di pagamento è un grave atto illecito，Se si invia la password di richiesta pertinente, prestare attenzione per garantire la sicurezza dei beni personali",
    event: {
      title: "evento arbitrale",
      label: "Prova delle informazioni di testo",
      placeholder: "Descrivere le circostanze e fornire le informazioni necessarie all'arbitro per verificare le circostanze",
      type: ["opposizione arbitrale", "Altro"]
    },
    upload: {
      title: ["Prova di informazioni sull'immagine", "Prove rilevanti con valore legale"],
    },
    arbitrator: {
      title: "aggiungere arbitri",
      default: "predefinito",
    },
    pay: {
      title: "Bisogna pagare",
      explain: {
        start: [
          "illustrare: Dopo l'avvio dell'arbitrato, la piattaforma delegherà",
          "arbitri a decidere",
          "bisogna pagare",
          "Se l'arbitrato viene annullato o l'arbitrato finale vince",
          "Verrà rimborsato sul tuo conto"
        ],
        again: [
          "illustrare: La domanda di riarbitrato deve essere pagata",
          "default dell'arbitro",
          "Un altro arbitro deve pagare"
        ]
      }
    },
    submit: "Sottoscrivi"
  },
  popup: {
    title: "Conferma l'invio e paga",
    text: "Ogni persona può presentare una sola domanda di proroga，Si prega di compilare con attenzione，Sei sicuro di presentare la domanda di proroga e pagamento？",
    checkbox: "ho confermato",
    submit: "OK per inviare e pagare",
    cancel: "fammi pensare ancora"
  }
}