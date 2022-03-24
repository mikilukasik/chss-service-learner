export const restartLearnersSolver = {
  command: 'learners:restart',
  solver: async ({ task: { _id }, msg, learnersControllerSocket }) => {
    await msg.do('task:setInProgress', { _id });

    for (const connection of learnersControllerSocket.connections) {
      connection.do('reload');
    }

    await msg.do('task:setResult', { _id, result: {} });
  },
};
