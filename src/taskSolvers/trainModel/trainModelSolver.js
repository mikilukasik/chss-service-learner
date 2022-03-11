export const trainModelSolver = {
  command: 'model:train',
  solver: async ({ task, msg }) => {
    const {
      _id,
      params: { fenSet, model },
    } = task;

    await msg.do('task:setInProgress', { _id });

    const { currentBest, inTraining } = await msg.do('training:createModelPair', { modelName: model });

    console.log({ currentBest, inTraining });

    // const childTasks = [];
    // getStartingFens({ fenSet })
    //   .map((startingFen) => [
    //     {
    //       command: 'models:playGame',
    //       startingFen,
    //       black: model1,
    //       white: model2,
    //     },
    //     {
    //       command: 'models:playGame',
    //       startingFen,
    //       black: model2,
    //       white: model1,
    //     },
    //   ])
    //   .flat();

    // await msg.do('task:createChildTasks', {
    //   parentId: _id,
    //   childTasks,
    //   onChildTasksComplete: {
    //     command: 'createTaskResult:models:compare',
    //   },
    //   childTaskResultAggregator: {
    //     command: 'aggregateTaskResult:models:compare',
    //   },
    //   // parentUpdate: {
    //   // $push: {
    //   //   'context.unsolvedStartingFens': {
    //   //     $each: childTasks.map(({ startingFen, white }) => `${startingFen} ${white}`),
    //   //   },
    //   // },
    //   // },
    // });

    // await msg.do('task:setInProgress', { _id });
  },
};
