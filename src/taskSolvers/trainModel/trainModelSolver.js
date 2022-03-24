export const trainModelSolver = {
  command: 'model:train',
  solver: async ({ task, msg }) => {
    const {
      _id,
      params: { fenSet, model },
    } = task;

    await msg.do('task:setInProgress', { _id });

    const { currentBest, inTraining } = await msg.do('training:getModelPair', { modelName: model });

    await msg.do('task:createChildTasks', {
      parentId: _id,
      childTasks: [
        {
          command: 'training:runCycle',
          currentBest,
          inTraining,
          fenSet,
        },
      ],
      parentUpdate: {
        $inc: {
          'context.cycleCount': 1,
        },
      },
    });
  },
};
