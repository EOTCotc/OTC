export default {
  form: {
    title: 'Autenticación',
    name: {
      label: 'Nombre',
      placeholder: 'por favor ingrese su nombre real',
      message: 'tener al menos tres letras de largo'
    },
    phone: {
      label: 'Número de teléfono',
      placeholder: 'Por favor ingrese el número de teléfono',
      message: 'Por favor ingrese un número de teléfono válido'
    },
    id: {
      label: 'número de licencia',
      placeholder: 'Por favor ingrese el número de identificación',
      message: 'Por favor, introduzca el número de identificación correcto'
    },
  },
  portrait: {
    title: 'Imagen de muestra',
    text: 'Cargue la cara de la tarjeta de identificación',
    button: 'Haga clic para cargar la cara del retrato',
    tip: [
      '*Siga la imagen de muestra para cargar la foto de la cara del retrato de la tarjeta de identificación',
      'Después de que la foto de identificación que subiste esté parcialmente borrosa，Será auditado por diferentes nodos。'
    ]
  },
  national: {
    title: 'Imagen de muestra',
    text: 'Subir el escudo nacional del DNI',
    button: 'Click para subir el escudo nacional',
    tip: [
      '*Cargue una foto del emblema nacional de la tarjeta de identificación de acuerdo con la imagen de ejemplo'
    ]
  },
  handHeld: {
    title: 'Imagen de muestra',
    text: 'Sube una foto de pasaporte',
    button: 'Haga clic para cargar una foto de pasaporte',
    tip: [
      '*Siga la imagen de muestra para cargar una foto de la celebración de su tarjeta de identificación'
    ]
  },
  next: 'Próximo paso',
  submit: {
    button: 'enviar',
    error: 'Vuelva a enviar'
  },
  validate: {
    error: 'El número de documento ha sido autenticado'
  },
}