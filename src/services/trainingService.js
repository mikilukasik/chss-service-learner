import { getTrainerSocket } from '../routes/routes';

export const trainModel = async ({ modelName, lessonsParentId }) => {
  const trainerSocket = await getTrainerSocket();

  // TODO: use the fastest client that's willing to run TF. use a better way to wait for a connection. task maybe?
  const getConnection = async () => {
    const connection = trainerSocket.connections[0];
    if (connection) return connection;

    console.log('waiting for trainer client to connect...');
    await new Promise((r) => setTimeout(r, 3000));
    return getConnection();
  };

  const connection = await getConnection();
  await connection.do('trainModel', { modelName, lessonsParentId });
};
