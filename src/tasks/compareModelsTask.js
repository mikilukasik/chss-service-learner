import { fenSetNames } from '../utils/fenSets';

export const compareModelsTask = {
  command: 'models:compare',
  argShape: {
    model1: {
      type: 'select',
      required: true,
      dynamicValues: {
        source: 'msgService',
        command: 'getAllModelNames',
      },
    },
    model2: {
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
      defaultValue: 2,
    },
  },
};
