export default {
  navbar: ["Solicitar nova arbitragem", "Iniciar arbitragem"],
  unit: "pessoas",
  form: {
    title: "Nota especial:\nFalsificar e alterar comprovantes de pagamento é um ato ilegal grave，Se você enviar a senha de consulta relevante, preste atenção para garantir a segurança de bens pessoais",
    event: {
      title: "evento de arbitragem",
      label: "Prova de informações de texto",
      placeholder: "Descrever as circunstâncias e fornecer as informações necessárias para que o árbitro verifique as circunstâncias",
      type: ["objeção de arbitragem", "outro"]
    },
    upload: {
      title: ["Prova de informações de imagem", "Provas relevantes com força legal"],
    },
    arbitrator: {
      title: "adicionar árbitros",
      default: "predefinição",
    },
    pay: {
      title: "Precisa pagar",
      explain: {
        start: [
          "ilustrar: Iniciada a arbitragem, a plataforma delegará",
          "árbitros para decidir",
          "precisa pagar",
          "Se a arbitragem for cancelada ou a arbitragem final vencer",
          "Será devolvido em sua conta"
        ],
        again: [
          "ilustrar: O pedido de nova arbitragem será pago",
          "padrão do árbitro",
          "Um árbitro adicional precisa pagar"
        ]
      }
    },
    submit: "enviar"
  },
  popup: {
    title: "Confirme o envio e pague",
    text: "Cada pessoa só pode enviar um pedido de extensão，Por favor, preencha cuidadosamente，Tem certeza de enviar o pedido de extensão e pagar？",
    checkbox: "Eu confirmei",
    submit: "OK para enviar e pagar",
    cancel: "deixe-me pensar novamente"
  }
}