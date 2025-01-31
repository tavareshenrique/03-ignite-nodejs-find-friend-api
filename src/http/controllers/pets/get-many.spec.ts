import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createPet } from '@/utils/test/create-pet'

describe('Get Many Pets', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should retrieve multiple pets based on query parameters', async () => {
		const { token, address } = await createAndAuthenticateUser(app)

		await createPet(app, token)

		const response = await request(app.server)
			.get('/pets')
			.query({ city: address.city, uf: address.uf })
			.set('Authorization', `Bearer ${token}`)

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('pets')
		expect(response.body.pets).toBeInstanceOf(Array)
		expect(response.body.pets.length).toBeGreaterThan(0)
	})

	it('should return an empty array if no pets match the criteria', async () => {
		const response = await request(app.server)
			.get('/pets')
			.query({ city: 'NonExistentCity', uf: 'ZZ' })

		expect(response.status).toBe(400)
	})
})
