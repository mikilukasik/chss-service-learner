export const createCompareModelsResultHandler = ({ msg }) => [
  'createTaskResult:models:compare',
  async ({ _id, context: { results } }, comms) => {
    await msg.do('task:setResult', { _id, result: { results } });
    comms.send('ok');
  },
];
