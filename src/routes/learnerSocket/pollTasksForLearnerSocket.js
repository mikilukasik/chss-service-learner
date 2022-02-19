import { playGameSolver } from '../../taskSolvers/playGame/playGameSolver';
import { initPoller } from '../../taskSolvers/taskSolvers';

export const pollTasksForLearnerSocket = ({ learnerSocket, msg }) => {
  const onSocketOpen = (connection) => {
    connection.do('init').then((initResponse) => {
      // below async function only returns once the client is disconnected
      initPoller(Object.assign({ msg, onClose: connection.onClose }, playGameSolver({ connection })));
    });
  };

  learnerSocket.onEvt('open', onSocketOpen);
};
