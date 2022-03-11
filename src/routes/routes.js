import { aggregateCompareModelsResultHandler } from './internal/aggregateCompareModelsResultHandler';
import { createCompareModelsResultHandler } from './internal/createCompareModelsResultHandler';
import { pollTasksForLearnerSocket } from './learnerSocket/pollTasksForLearnerSocket';
import { sampleRequestHandler } from './learnerSocket/sampleRequestHandler';

export const initRoutes = ({ msg }) => {
  // msg.static('/learner/', 'public');

  msg.on(...aggregateCompareModelsResultHandler);
  msg.on(...createCompareModelsResultHandler({ msg }));

  const learnerSocket = msg.ws('/learnerSocket');
  learnerSocket.on(...sampleRequestHandler);

  pollTasksForLearnerSocket({ learnerSocket, msg });

  return { learnerSocket };
};
