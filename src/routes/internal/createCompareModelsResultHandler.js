export const createCompareModelsResultHandler = ({ msg }) => [
  'createTaskResult:models:compare',
  async ({ _id, context: { results, unsolvedStartingFens } }, comms) => {
    await msg.do('task:setResult', { _id, result: { results, unsolvedStartingFens } });
    comms.send('ok');
  },
];
