import { faker } from '@faker-js/faker'
import FormData from 'form-data'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Get Many Pets', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should retrieve multiple pets based on query parameters', async () => {
		const { token, address } = await createAndAuthenticateUser(app)

		const pet = {
			name: faker.animal.dog(),
			about: faker.lorem.paragraph(),
			adoption_requirements: [faker.lorem.paragraph(), faker.lorem.paragraph()],
			age: 'SENIOR',
			breed: faker.animal.dog(),
			energy_level: 'LOW',
			environment: 'APARTMENT',
			independence_level: 'HIGH',
			size: 'MEDIUM',
			organization_id: faker.string.uuid(),
		}

		const form = new FormData()

		const formHeaders = form.getHeaders()

		await request(app.server)
			.post('/pets')
			.set('Authorization', `Bearer ${token}`)
			.set(formHeaders)
			.field('name', pet.name)
			.field('about', pet.about)
			.field('adoption_requirements', JSON.stringify(pet.adoption_requirements))
			.field('age', pet.age)
			.field('breed', pet.breed)
			.field('energy_level', pet.energy_level)
			.field('environment', pet.environment)
			.field('independence_level', pet.independence_level)
			.field('size', pet.size)
			.field('organization_id', pet.organization_id)

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
