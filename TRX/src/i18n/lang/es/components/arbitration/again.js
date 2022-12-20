export default {
  navbar: ['Solicitar nuevo arbitraje', 'iniciar el arbitraje'],
  unit: 'gente',
  form: {
    title: 'Nota especial:\nLa falsificación y alteración de comprobantes de pago es un acto ilegal grave，Si envía la contraseña de consulta relevante, preste atención para garantizar la seguridad de los activos personales.',
    event: {
      title: 'evento de arbitraje',
      label: 'matriz de información de texto',
      placeholder: 'Describa las circunstancias y proporcione la información necesaria para que el árbitro verifique las circunstancias.',
      type: ['objeción de arbitraje', 'otro']
    },
    upload: {
      title: ['Prueba de información de imagen', 'Prueba pertinente con efecto legal'],
    },
    arbitrator: {
      title: 'Añadir un árbitro',
      default: 'defecto',
    },
    pay: {
      title: 'Pagadero',
      explain: {
        start: [
          'ilustrar: Una vez iniciado el arbitraje, la plataforma delegará',
          'árbitros para decidir',
          'necesito pagar',
          'Si el arbitraje se cancela o finalmente se gana el arbitraje',
          'Será reembolsado a su cuenta'
        ],
        again: [
          'ilustrar: La solicitud de nuevo arbitraje se pagará',
          'Incumplimiento del árbitro',
          'Se paga un árbitro adicional'
        ]
      }
    },
    submit: 'enviar'
  },
  popup: {
    title: 'Confirmar envío y pago',
    text: 'Cada persona solo puede presentar una solicitud de prórroga，Por favor complete cuidadosamente，¿Está seguro de presentar la solicitud de prórroga y pagar？',
    checkbox: 'he confirmado',
    submit: 'OK para enviar y pagar',
    cancel: 'déjame pensar de nuevo'
  }
}