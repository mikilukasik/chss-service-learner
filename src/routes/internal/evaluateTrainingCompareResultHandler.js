import { trainModel } from '../../services/trainingService';

export const evaluateTrainingCompareResultHandler = ({ msg }) => [
  'training:evaluateCompareResult',
  async (task, comms) => {
    const {
      params: { inTraining, fenSet },
      context: { compareTaskId, compareResults },
      parentId,
    } = task;

    console.log({ parentId });

    const { won = 0, lost = 0, played = 0, pieceBalance = 0 } = compareResults[inTraining];
    const willReplaceCurrentBest = pieceBalance + 25 * (won - lost) > played * 2; // TODO: this should be model specific // won > lost * 1.25 && won > played / 2;

    console.log({ won, lost, pieceBalance, willReplaceCurrentBest, inTraining });
    if (willReplaceCurrentBest) {
      await msg.do('training:replaceCurrentBest', { inTraining });
    } else {
      await trainModel({ modelName: inTraining, lessonsParentId: compareTaskId });
    }

    const [, , , model] = inTraining.split('__');
    const { currentBest: cb, inTraining: it } = await msg.do('training:getModelPair', { modelName: model });

    await msg.do('task:createChildTasks', {
      parentId,
      childTasks: [
        {
          command: 'training:runCycle',
          currentBest: cb,
          inTraining: it,
          fenSet,
        },
      ],
      parentUpdate: {
        $inc: {
          'context.cycleCount': 1,
        },
      },
    });

    comms.send('ok');
  },
];
