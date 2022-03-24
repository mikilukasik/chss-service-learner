export const runTrainingCycleSolver = {
  command: 'training:runCycle',
  solver: async ({ task, msg }) => {
    const {
      _id,
      params: { fenSet, currentBest, inTraining },
    } = task;

    await msg.do('task:createChildTasks', {
      parentId: _id,
      childTasks: [
        {
          command: 'models:compare',
          model1: currentBest,
          model2: inTraining,
          collectLessonFor: inTraining,
          fenSet,
        },
      ],
      onChildTasksComplete: {
        command: 'training:evaluateCompareResult',
      },
      childTaskResultAggregator: {
        command: 'aggregateTaskResult:training:models:compare',
      },
      // parentUpdate: {
      //   $set: {
      //     'context.cycleCount': 1,
      //   },
      // },
    });

    await msg.do('task:setInProgress', { _id });
  },
};
