export default {
  navbar: ['Apply for re-arbitration', 'Initiate arbitration'],
  unit: 'people',
  form: {
    title:
      'Special reminder:\nForging and altering payment vouchers is a serious illegal act. If you submit relevant inquiry passwords, please pay attention to ensure the safety of personal assets',
    event: {
      title: 'Arbitration event',
      label: 'Text information proof',
      placeholder:
        'Describe the circumstances and provide the information necessary for the arbitrator to verify the circumstances',
      type: ['Arbitration Objection', 'Other'],
    },
    upload: {
      title: [
        'Picture information evidence',
        'Relevant evidence with legal effect',
      ],
    },
    arbitrator: {
      title: 'Add an arbitrator',
      default: 'default',
    },
    pay: {
      title: 'Payable',
      explain: {
        start: [
          'Description: After the arbitration is initiated, the platform will appoint',
          'arbitrators will make a judgment',
          'Payment is required',
          'If the arbitration is cancelled or the arbitration is finally won',
          'It will be returned to your account',
        ],
        again: [
          'Description: Application for re-arbitration needs to be paid',
          'The arbitrator defaults',
          'Additional arbitrator needs to be paid',
        ],
      },
    },
    submit: 'submit',
  },
  popup: {
    title: 'Confirm submission and payment',
    text: 'Each person can only submit an extension application, please fill it out carefully, are you sure to submit the extension application and pay?',
    checkbox: 'I have confirmed',
    submit: 'OK to submit and pay',
    cancel: 'let me think again',
  },
};
