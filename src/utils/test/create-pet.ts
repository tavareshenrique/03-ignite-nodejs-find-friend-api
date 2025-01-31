import { faker } from '@faker-js/faker'
import { FastifyInstance } from 'fastify'
import FormData from 'form-data'
import request from 'supertest'

import { createAndAuthenticateUser } from './create-and-authenticate-user'

export async function createPet(
	app: FastifyInstance,
	tokenParam: string | null = null,
) {
	const { token } = await createAndAuthenticateUser(app)

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

	const petResponse = await request(app.server)
		.post('/pets')
		.set('Authorization', `Bearer ${tokenParam || token}`)
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

	return {
		petResponse,
	}
}
