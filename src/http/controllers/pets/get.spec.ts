import { faker } from '@faker-js/faker'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { createPet } from '@/utils/test/create-pet'

describe('Get Pet', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should retrieve an existing pet', async () => {
		const { petResponse } = await createPet(app)

		expect(petResponse.status).toBe(201)

		const petId = petResponse.body.pet.id

		const response = await request(app.server).get(`/pets/${petId}`)

		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('pet')
		expect(response.body.pet.id).toBe(petId)
	})

	it('should return 400 if pet is not found', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const response = await request(app.server)
			.get(`/pets/${faker.string.uuid()}`)
			.set('Authorization', `Bearer ${token}`)

		expect(response.status).toBe(400)
		expect(response.body).toHaveProperty('message')
	})
})
