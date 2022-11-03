export default {
  form: {
    title: 'Authentication',
    name: {
      label: 'name',
      placeholder: 'please enter your real name',
      message: 'At least three letters in length',
    },
    phone: {
      label: 'phone',
      placeholder: 'Please enter the phone number',
      message: 'please enter a valid phone number',
    },
    id: {
      label: 'ID number',
      placeholder: 'Please enter the ID number',
      message: 'Please enter the correct ID number',
    },
  },
  portrait: {
    title: 'Sample image',
    text: 'Upload ID card face',
    button: 'Click to upload portrait face',
    tip: [
      '*Please follow the sample picture to upload the ID card portrait face photo',
      'After the ID photo you uploaded is partially blurred, it will be reviewed by different nodes.',
    ],
  },
  national: {
    title: 'Sample image',
    text: 'Upload your ID card and national emblem',
    button: 'Click to upload the national emblem',
    tip: [
      '*Please follow the sample image to upload a photo of your ID card and national emblem',
    ],
  },
  handHeld: {
    title: 'Sample image',
    text: 'Upload a passport photo',
    button: 'Click to upload a passport photo',
    tip: [
      '*Please follow the sample image to upload a photo of a holding ID card',
    ],
  },
  next: 'Next step',
  submit: {
    button: 'submit',
    error: 'Please resubmit',
  },
  validate: {
    error: 'ID number has been authenticated',
  },
};
