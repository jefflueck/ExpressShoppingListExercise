process.env.NODE_ENV = 'test';
// npm packages
const request = require('supertest');
// app imports
const app = require('./app');

let items = require('./fakeDb');

let item = { name: 'golden wrapper', price: 1000.0 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items = [];
});

describe('GET /items', async function () {
  test('should return all items', async function () {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(items);
  });
});

describe('GET /items/:name', async function () {
  test('Gets a single item', async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(item);
  });
  test('Returns 404 if item not found', async function () {
    const response = response(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe('POST /items', async function () {
  test('Adds a new item', async function () {
    const response = await request(app)
      .post('/items')
      .send({ name: 'peas', price: 1.0 });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty('name');
    expect(response.body.item).toHaveProperty('price');
    expect(response.body.item.name).toEqual('peas');
    expect(response.body.item.price).toEqual(1.0);
  });
});

describe('PATCH /items/:name', async function () {
  test('Updates an item', async function () {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({ name: 'carrots', price: 2.0 });
    expect(response.statusCode).toBe(200);
    expect(response.body.item.name).toBe('carrots');
    expect(response.body.item.price).toBe(2.0);
  });
});

describe('DELETE /items/:name', async function () {
  test('Deletes an item', async function () {
    const response = await request(app).delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(`${item.name} deleted`);
  });
});
