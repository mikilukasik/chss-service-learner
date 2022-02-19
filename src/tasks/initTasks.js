import { compareModelsTask } from './compareModelsTask';
import { playModelGameTask } from './playModelGameTask';
import { restartLearnersTask } from './restartLearnersTask';

export const initTasks = async ({ msg }) => {
  await msg.do('task:define', compareModelsTask);
  await msg.do('task:define', playModelGameTask);
  await msg.do('task:define', restartLearnersTask);
};
