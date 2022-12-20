export default {
  navbar: 'Solicitar una extensión',
  form: {
    title: 'Para solicitar una prórroga, se debe cumplir una de las siguientes condiciones',
    status: [
      'Tiempo insuficiente para presentar pruebas',
      'La información de verificación aún está en proceso de revisión.',
      'Evidencia insuficiente,sin juicio',
      'Parte de la evidencia está incompleta.'
    ],
    explain: {
      title: 'Instrucciones de extensión de la aplicación',
      placeholder: 'Describa las instrucciones para solicitar una prórroga',
    },
    time: {
      title: 'Solicitud de prórroga',
      day: 'cielo'
    },
    pay: {
      label: 'Pagadero',
      text: 'ilustrar: La solicitud de prórroga está sujeta a pago según el tiempo de prórroga'
    },
    submit: {
      button: 'enviar',
      loading: 'sumisión…',
      success: 'Enviado satisfactoriamente',
      fail: 'Envío fallido！'
    }
  },
  popup: {
    title: 'Confirmar enviar y pagar',
    text: 'Solo se puede presentar una solicitud de prórroga por persona，Por favor complete cuidadosamente，¿Está seguro de presentar la solicitud de prórroga y pagar？',
    checkbox: 'he confirmado',
    submit: 'OK para enviar y pagar',
    cancel: 'déjame pensar de nuevo'
  },
}