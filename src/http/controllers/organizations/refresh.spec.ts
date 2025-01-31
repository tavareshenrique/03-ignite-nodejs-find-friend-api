import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to refresh token', async () => {
		const organizationData = {
			name: faker.company.name(),
			owner: faker.person.firstName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			whatsapp: faker.phone.number(),
			address: faker.location.streetAddress(),
			zipcode: faker.location.zipCode({
				format: '########',
			}),
			city: faker.location.city(),
			uf: faker.location.state({ abbreviated: true }),
		} as const

		await request(app.server).post('/organizations').send(organizationData)

		const authResponse = await request(app.server).post('/sessions').send({
			email: organizationData.email,
			password: organizationData.password,
		})

		const cookies = authResponse.get('Set-Cookie')!

		const response = await request(app.server)
			.patch('/token/refresh')
			.set('Cookie', cookies)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual({
			token: expect.any(String),
		})
		expect(response.get('Set-Cookie')![0]).toEqual(
			expect.stringContaining('refreshToken='),
		)
	})
})
