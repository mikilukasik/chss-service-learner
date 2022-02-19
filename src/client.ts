import { msgClient as msg } from '../msg/src/client';
import { playModelGameHandler } from './client/playModelGameHandler';
import { reloadHandler } from './client/reloadHandler';

console.info('Starting learner..');

const learnerSocket: any = msg.ws(`ws://${self.location.hostname}:3300/learnerSocket`);

setInterval(() => {
  const indicator = document.getElementById('indicator');
  indicator.innerHTML = indicator.innerHTML ? '' : '.';
}, 1000);

learnerSocket.on('init', (data: any, comms: any) => {
  console.log('initializing..');
  comms.send({ success: true });
});

learnerSocket.on(...playModelGameHandler({ msg, learnerSocket }));
learnerSocket.on(...reloadHandler);
