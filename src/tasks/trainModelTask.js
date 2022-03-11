import { fenSetNames } from '../utils/fenSets';

export const trainModelTask = {
  command: 'model:train',
  infinite: true,
  argShape: {
    model: {
      type: 'select',
      required: true,
      dynamicValues: {
        source: 'msgService',
        command: 'getAllModelNames',
      },
    },
    fenSet: {
      type: 'select',
      required: true,
      values: fenSetNames,
      defaultValue: 800,
    },
  },
};
