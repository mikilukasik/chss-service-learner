export const playModelGameHandler = ({ msg, learnerSocket }: { msg: any; learnerSocket: any }) => [
  'playModelGame',
  async (task: any, comms: any) => {
    const {
      params: { startingFen, black, white },
      _id,
    } = task;
    await new Promise((r) => setTimeout(r, 20));

    comms.send({ _id, result: { result: -1, pieceBalance: -5 } });
  },
];
