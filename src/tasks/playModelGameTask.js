export const playModelGameTask = {
  command: 'models:playGame',
  argShape: {
    white: {
      type: 'select',
      required: true,
      dynamicValues: {
        source: 'msgService',
        command: 'getAllModelNames',
      },
    },
    black: {
      type: 'select',
      required: true,
      dynamicValues: {
        source: 'msgService',
        command: 'getAllModelNames',
      },
    },
    startingFen: {
      type: 'textInput',
      required: true,
      defaultValue: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    },
  },
};
