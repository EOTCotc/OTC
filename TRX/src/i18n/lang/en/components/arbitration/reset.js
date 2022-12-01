export default {
  navbar: 'Initiate re-evidence',
  form: {
    condition: {
      title:
        'One of the following conditions must be met to initiate re-evidence',
      status: [
        'Insufficient evidence for judgment',
        'Some evidence is incomplete',
      ],
    },
    reason: {
      title: 'Instructions for applying for extension',
      placeholder:
        'Please describe the instructions for requesting an extension',
    },
    submit: {
      button: 'submitbmit',
      loading: 'submitting…',
      success: 'Submitted successfully',
      fail: 'Submission Failed',
    },
  },
};
