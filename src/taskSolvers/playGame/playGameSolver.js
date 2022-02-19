export const playGameSolver = ({ connection }) => ({
  command: 'models:playGame',
  solver: async ({ task, msg }) => {
    const { _id } = task;
    await msg.do('task:setInProgress', { _id });

    const result = await connection.do('playModelGame', task);
    // TODO: do not try to abort after this point
    await msg.do('task:setResult', result);
  },
});
