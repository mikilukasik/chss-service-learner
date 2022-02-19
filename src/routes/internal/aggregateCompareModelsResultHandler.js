export const aggregateCompareModelsResultHandler = [
  'aggregateTaskResult:models:compare',
  async (
    {
      parentTask: {
        params: { model1, model2 },
      },
      childTask: {
        result,
        params: { black, white, startingFen },
      },
    },
    comms,
  ) => {
    const update = {
      $pull: { 'context.unsolvedStartingFens': `${startingFen} ${white}` },
      $inc: {
        [`context.results.${model1}.played`]: 1,
        [`context.results.${model2}.played`]: 1,
      },
    };

    switch (result.result) {
      case 0:
        update.$inc[`context.results.${model1}.drew`] = 1;
        update.$inc[`context.results.${model2}.drew`] = 1;
        break;
      case 1:
        update.$inc[`context.results.${white}.won`] = 1;
        update.$inc[`context.results.${black}.lost`] = 1;
        break;
      case -1:
        update.$inc[`context.results.${black}.won`] = 1;
        update.$inc[`context.results.${white}.lost`] = 1;
        break;
    }

    update.$inc[`context.results.${white}.pieceBalance`] = result.pieceBalance;
    update.$inc[`context.results.${black}.pieceBalance`] = -result.pieceBalance;

    comms.send(update);
  },
];
