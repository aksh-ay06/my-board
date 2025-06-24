const ioClient = require('socket.io-client');
let server;
let url;

beforeAll(() => {
  process.env.PORT = 0;
  server = require('../app');
  const { port } = server.address();
  url = `http://localhost:${port}`;
});

afterAll(done => {
  server.close(done);
});

function connect(boardId = 'test') {
  return new Promise(resolve => {
    const client = ioClient(url, { query: { boardId } });
    client.on('connect', () => resolve(client));
  });
}

test('broadcasts drawing events to all clients in the same board', async () => {
  const client1 = await connect('board1');
  const client2 = await connect('board1');

  const beginData = { x: 0, y: 0 };
  const drawData = { x: 1, y: 1 };
  const redoData = { action: 'undo' };

  const beginPromise = new Promise(resolve => client2.once('beginPath', resolve));
  client1.emit('beginPath', beginData);
  await expect(beginPromise).resolves.toEqual(beginData);

  const drawPromise = new Promise(resolve => client2.once('drawStroke', resolve));
  client1.emit('drawStroke', drawData);
  await expect(drawPromise).resolves.toEqual(drawData);

  const redoPromise = new Promise(resolve => client2.once('redoUndo', resolve));
  client1.emit('redoUndo', redoData);
  await expect(redoPromise).resolves.toEqual(redoData);

  client1.disconnect();
  client2.disconnect();
});

test('does not broadcast events across boards', async () => {
  const a1 = await connect('boardA');
  const a2 = await connect('boardA');
  const b1 = await connect('boardB');

  const waitPromise = new Promise(resolve => {
    const timer = setTimeout(() => resolve('timeout'), 100);
    b1.once('beginPath', () => {
      clearTimeout(timer);
      resolve('received');
    });
  });

  a1.emit('beginPath', { x: 0, y: 0 });

  await expect(waitPromise).resolves.toBe('timeout');

  a1.disconnect();
  a2.disconnect();
  b1.disconnect();
});
