import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Create Organization (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be crate a organization', async () => {
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

		const response = await request(app.server)
			.post('/organizations')
			.send(organizationData)

		expect(response.status).toBe(201)
	})
})
