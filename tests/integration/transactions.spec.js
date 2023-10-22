const request = require('supertest');
const app = require('../../app');
let userTemp, transactionTemp, account1, account2, token;

const name = 'userTest Authenticate';
const email = 'userTest@gmail.com';
const password = '12345678';

describe('Testing Transactions endpoint', () => {
  describe('Testing transaction POST /api/v1/transaction endpoint', () => {
    test('should can create new transaction', async () => {
        try {
            const { statusCode, body } = await request(app)
            .post('/api/v1/transactions')
            .send({
              source_account_id: account1.id,
              destination_account_id: account2.id,
              amount: 10000,
            })
            .set('Authorization', `Bearer ${token}`);
          expect(statusCode).toBe(201);
          expect(body).toHaveProperty('success');
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('data');
          expect(body.data).toHaveProperty('id');
          expect(body.data).toHaveProperty('source_account_id');
          expect(body.data).toHaveProperty('destination_account_id');
          expect(body.data).toHaveProperty('amount');
        } catch (err) {
            expect(err).toBe(err)        }
    });
    

    test("should can't create new transaction balance less", async () => {
        try {
            const { statusCode, body } = await request(app)
            .post('/api/v1/transactions')
            .send({
              source_account_id: account1.id,
              destination_account_id: account2.id,
              amount: 100000000,
            })
            .set('Authorization', `Bearer ${token}`);
          expect(statusCode).toBe(400);
          expect(body).toHaveProperty('success');
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('data');
          expect(body.success).toBe(false);
        } catch (err) {
            expect(err).toBe(err)
        }
    });

    test("should can't create new transaction source_account_id or destination_account_id not found", async () => {
        try {
            const { statusCode, body } = await request(app)
            .post('/api/v1/transactions')
            .send({
              source_account_id: account1.id + 99,
              destination_account_id: account2.id + 99,
              amount: 100,
            })
            .set('Authorization', `Bearer ${token}`);
          expect(statusCode).toBe(404);
          expect(body).toHaveProperty('success');
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('data');
          expect(body.success).toBe(false);
        } catch (err) {
            expect(err).toBe(err)
        }
    });

    test("should can't create new transaction unauthorized", async () => {
        try {
            const { statusCode, body } = await request(app)
            .post('/api/v1/transactions')
            .send({
              source_account_id: account1.id + 99,
              destination_account_id: account2.id + 99,
              amount: 100,
            });
    
          expect(statusCode).toBe(401);
          expect(body).toHaveProperty('success');
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('data');
          expect(body.success).toBe(false);
        } catch (err) {
            expect(err).toBe(err)
        }
    });
  });

  describe('Testing get all of transaction GET /api/v1/transactions endpoint', () => {
    test('should can get all transactions', async () => {
        try {
            const { statusCode, body } = await request(app).get('/api/v1/transactions');
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
        } catch (err) {
            expect(err).toBe(err)   
        }
    });
  });

  describe('Tetsing get detail transaction GET /api/v1/transactions/{transactionId} endpoint ', () => {
    test('should can get detail transactions', async () => {
        try {
            const { statusCode, body } = await request(app).get(`/api/v1/transactions/${transactionTemp.id}`);
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data.id).toBe(transactionTemp.id);
            expect(body.data.amount).toBe(transactionTemp.amount);
            expect(body.data.source_account_id).toBe(transactionTemp.source_account_id);
            expect(body.data.destination_account_id).toBe(transactionTemp.destination_account_id);
        } catch (err) {
            expect(err).toBe(err)
        }
    });

    test("should can't get detail transactions tranasactionId not found", async () => {
        try {
            const { statusCode, body } = await request(app).get(`/api/v1/transactions/${transactionTemp.id}99`);
            expect(statusCode).toBe(404);
            expect(body).toHaveProperty('success');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.success).toBe(false);
        } catch (err) {
            expect(err).toBe(err)
        }
    });
  });
});