export default {
  navbar: 'Apply for an extension',
  form: {
    title:
      'To apply for an extension, one of the following conditions must be met',
    status: [
      'Insufficient time to present evidence',
      'Verified information is still under review',
      'Insufficient evidence to make a judgment',
      'Part of the evidence is incomplete',
    ],
    explain: {
      title: 'Instructions for applying for extension',
      placeholder:
        'Please describe the instructions for requesting an extension',
    },
    time: {
      title: 'Application for extension',
      day: 'day',
    },
    pay: {
      label: 'Payable',
      text: 'Note: The application for extension will be paid according to the extension time',
    },
    submit: {
      button: 'submit',
      loading: 'submitting…',
      success: 'Submitted successfully',
      fail: 'Submission Failed!',
    },
  },
  popup: {
    title: 'Confirm submission and payment',
    text: 'Each person can only submit an extension application, please fill it out carefully, are you sure to submit the extension application and pay?',
    checkbox: 'I have confirmed',
    submit: 'OK to submit and pay',
    cancel: 'let me think again',
  },
};
