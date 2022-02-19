import { compareModelsSolver } from './compareModels/compareModelsSolver';
import { restartLearnersSolver } from './restartLearners/restartLearnersSolver';

export const initPoller = async ({ msg, onClose = () => {}, learnerSocket, command, solver }) => {
  const blank = () => {
    console.log('blank');
  };
  let sendAbort = blank;
  let task = null;
  let keepPolling = true;

  onClose(async () => {
    // learner client disconnected, abort any ongoing do towards taskmanager
    keepPolling = false;

    sendAbort();
  });

  while (keepPolling) {
    task = null;
    try {
      task = await msg.do('task:getNext', { filters: { command } }, (comms) => {
        sendAbort = () => comms.data({ command: 'abort' });
      });
      sendAbort = () => msg.do('task:requeue', { _id: task._id });
    } catch (e) {
      console.log(`${command} poller got an error: ${e.message}`);
      continue;
    }

    await solver({ msg, task, learnerSocket });
    sendAbort = blank;
  }
};

export const taskSolvers = ({ msg, learnerSocket }) => {
  initPoller(Object.assign({ msg }, compareModelsSolver));
  initPoller(Object.assign({ msg, learnerSocket }, restartLearnersSolver));
};
