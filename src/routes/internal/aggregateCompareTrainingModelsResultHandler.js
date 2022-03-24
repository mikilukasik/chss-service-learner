export const aggregateCompareTrainingModelsResultHandler = [
  'aggregateTaskResult:training:models:compare',
  async ({ /* parentTask, */ childTask }, comms) => {
    // const {
    //   params: { currentBest, inTraining }, //: { model1, model2 },
    // } = parentTask;

    const {
      result: { results: compareResults },
      _id: compareTaskId,
      params: { collectLessonFor: lessonFor },
    } = childTask;

    const update = {
      $set: {
        context: {
          compareTaskId,
          compareResults,
          lessonFor,
        },
      },
    };

    comms.send(update);
  },
];
