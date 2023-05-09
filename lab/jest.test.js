const axios = require('axios');

test('GET /devices should return a list of all devices', async () => {
  const response = await axios.get('http://localhost:5000/devices');
  expect(response.status).toBe(200);
  expect(response.data).toBeInstanceOf(Array);
});

test('GET /ac should return a list of all AC devices', async () => {
  const response = await axios.get('http://localhost:5000/ac');
  expect(response.status).toBe(200);
  expect(response.data).toBeInstanceOf(Array);
  expect(response.data[0].category).toBe('ac');
});

test('GET /security should return a list of all security devices', async () => {
  const response = await axios.get('http://localhost:5000/security');
  expect(response.status).toBe(200);
  expect(response.data).toBeInstanceOf(Array);
  expect(response.data[0].category).toBe('security');
});

test('GET /light should return a list of all light devices', async () => {
  const response = await axios.get('http://localhost:5000/light');
  expect(response.status).toBe(200);
  expect(response.data).toBeInstanceOf(Array);
  expect(response.data[0].category).toBe('light');
});
