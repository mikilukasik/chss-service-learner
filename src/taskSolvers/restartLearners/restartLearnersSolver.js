export const restartLearnersSolver = {
  command: 'learners:restart',
  solver: async ({ task: { _id }, msg, learnerSocket }) => {
    await msg.do('task:setInProgress', { _id });

    for (const connection of learnerSocket.connections) {
      connection.do('reload');
    }

    await msg.do('task:setResult', { _id, result: {} });
  },
};
