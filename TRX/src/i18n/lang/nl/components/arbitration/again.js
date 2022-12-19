export default {
  navbar: ["Opnieuw arbitrage aanvragen", "Start arbitrage"],
  unit: "mensen",
  form: {
    title: "Speciale opmerking:\nHet vervalsen en wijzigen van betalingsbewijzen is een ernstige onrechtmatige daad，Als u het relevante querywachtwoord indient, let dan op de veiligheid van persoonlijke bezittingen",
    event: {
      title: "arbitrage evenement",
      label: "Tekst informatiebewijs",
      placeholder: "Beschrijf de omstandigheden en verstrek de informatie die de arbiter nodig heeft om de omstandigheden te verifiëren",
      type: ["arbitrage bezwaar", "ander"]
    },
    upload: {
      title: ["Foto informatie bewijs", "Relevante bewijzen met rechtskracht"],
    },
    arbitrator: {
      title: "arbiters toevoegen",
      default: "standaard",
    },
    pay: {
      title: "Moet betalen",
      explain: {
        start: [
          "illustreren: Nadat de arbitrage is gestart, zal het platform delegeren",
          "arbiters beslissen",
          "moet betalen",
          "Als de arbitrage wordt geannuleerd of de uiteindelijke arbitrage wint",
          "Wordt teruggestort op je rekening"
        ],
        again: [
          "illustreren: Verzoek om herarbitrage wordt betaald",
          "arbiter in gebreke",
          "Een extra arbiter moet betalen"
        ]
      }
    },
    submit: "indienen"
  },
  popup: {
    title: "Bevestig verzenden en betalen",
    text: "Elke persoon kan slechts één verlengingsaanvraag indienen，Gelieve zorgvuldig in te vullen，Weet u zeker dat u de aanvraag voor verlenging indient en betaalt？",
    checkbox: "ik heb bevestigd",
    submit: "OK om in te dienen en te betalen",
    cancel: "laat me nog eens nadenken"
  }
}