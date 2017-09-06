export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true,
  },
  {
    key: 'selections',
    types: ['object', 'function'],
    required: true,
  },
  {
    key: 'end',
    types: ['boolean'],
    required: false,
  },
];
