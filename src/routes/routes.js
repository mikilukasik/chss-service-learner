import { aggregateCompareModelsResultHandler } from './internal/aggregateCompareModelsResultHandler';
import { aggregateCompareTrainingModelsResultHandler } from './internal/aggregateCompareTrainingModelsResultHandler';
import { createCompareModelsResultHandler } from './internal/createCompareModelsResultHandler';
import { evaluateTrainingCompareResultHandler } from './internal/evaluateTrainingCompareResultHandler';
import { pollTasksForLearnerSocket } from './learnerSocket/pollTasksForLearnerSocket';

const trainerSocketAwaiters = [];
let _trainerSocket;
export const getTrainerSocket = () =>
  new Promise((r) => {
    if (_trainerSocket) return r(_trainerSocket);
    trainerSocketAwaiters.push(r);
  });

export const initRoutes = ({ msg }) => {
  msg.on(...aggregateCompareModelsResultHandler);
  msg.on(...aggregateCompareTrainingModelsResultHandler);
  msg.on(...createCompareModelsResultHandler({ msg }));
  msg.on(...evaluateTrainingCompareResultHandler({ msg }));

  const learnersControllerSocket = msg.ws('/learnersControllerSocket');

  const learnerSocket = msg.ws('/learnerSocket');
  learnerSocket.onEvt('open', (connection) => {
    console.log(`Learner client connected: ${connection.cookies.get('CHSS_CLIENT_ID')}`);
  });

  _trainerSocket = msg.ws('/trainerSocket');
  while (trainerSocketAwaiters.length) trainerSocketAwaiters.pop()(_trainerSocket);

  pollTasksForLearnerSocket({ learnerSocket, msg });

  return { learnerSocket, learnersControllerSocket };
};
