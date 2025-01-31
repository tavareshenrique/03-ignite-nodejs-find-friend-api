import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticated (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to authenticated', async () => {
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

		const response = await request(app.server).post('/sessions').send({
			email: organizationData.email,
			password: organizationData.password,
		})

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual({
			token: expect.any(String),
		})
	})
})
