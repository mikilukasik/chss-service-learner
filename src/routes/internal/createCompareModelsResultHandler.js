export const createCompareModelsResultHandler = ({ msg }) => [
  'createTaskResult:models:compare',
  async ({ _id, context: { results, lessons } }, comms) => {
    const payload = { _id, result: { results } };

    if (lessons && lessons.length) payload.result.lessons = lessons;

    await msg.do('task:setResult', payload);
    comms.send('ok');
  },
];
