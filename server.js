import { initTasks } from './src/tasks/initTasks';
import { taskSolvers } from './src/taskSolvers/taskSolvers';

const msgService = require('./msg/src/service');
const { initRoutes } = require('./src/routes/routes');

const SERVICE_NAME = 'chss-service-learner';
const PORT = 4250;
const MSG_GATEWAY_ADDRESS = '0.0.0.0:3300';

export default () => {
  const msg = msgService({
    PORT,
    serviceName: SERVICE_NAME,
    gatewayAddress: MSG_GATEWAY_ADDRESS,
  });

  msg
    .connect()
    .then(() => {
      // console.log('MSG connected: ' + SERVICE_NAME);
      const { learnerSocket } = initRoutes({ msg });
      initTasks({ msg });
      taskSolvers({ msg, learnerSocket });
    })

    .catch(console.error);
};
