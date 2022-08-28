import request from 'supertest'
import app from '../../quiz-server/app.js'

describe('fetch api', () => {
    it("starts quiz" , async () => {
	const res = await request(app).get('/api/quiz/start')

	expect(res.statusCode).toEqual(200)
    })
})
