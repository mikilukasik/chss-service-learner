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
      values: [2, 40, 800],
      defaultValue: 2,
    },
  },
};
