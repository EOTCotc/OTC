export default {
  unit: 'people',
  public: {
    person: {
      title: 'Arbitrator announcement',
      createDate: 'application time',
      count: 'Arbitration times',
    },
    case: {
      title: 'Arbitration announcement',
      result: 'Arbitration result',
      text: [
        'The total number of arbitrators who participated in the arbitration judgment',
        'Submit evidence by both parties',
        'Arbitrators ruled that plaintiff Fang won',
      ],
      detail: 'Details',
    },
  },
  my: {
    title: 'my arbitration case',
  },
  message: 'information',
  dialog: {
    button: 'go to processing',
    text: ['Have', 'Judgment is about to expire'],
  },
  popup: {
    text: [
      'Received a request for re-evidence',
      'Received a request for an extension of time for arbitration',
    ],
    cancel: 'deal with later',
    confirm: 'go to processing',
  },
  loading: {
    text: 'Loading…',
    fail: 'Failed to load!',
  },
};
