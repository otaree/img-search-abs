const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Search } = require('./../models/search');

var searchSeed = [];

for (let i = 0; i < 12; i++) {
    searchSeed.push({
        term: "lol cat",
        when: new Date().toISOString()
    });
}

beforeEach((done) => {
    Search.remove({}).then(() => {
        Search.insertMany(searchSeed).then(() => done());
    });
});

describe('GET /api/latest/imagesearch/', () => {
    it('should return last 10 results', (done) => {
        request(app)
            .get('/api/latest/imagesearch/')
            .expect(200)
            .expect((res) => {
                expect(res.body[0].term).toBe('lol cat');
                expect(res.body.length).toBe(10);
            })
            .end(done);
    });
});