import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()

		sut = new CreatePetUseCase(petsRepository)
	})

	it('should create a pet', async () => {
		const { pet } = await sut.execute({
			name: faker.animal.dog(),
			about: faker.lorem.paragraph(),
			adopted_in: null,
			adoption_requirements: [faker.lorem.paragraph(), faker.lorem.paragraph()],
			age: 'SENIOR',
			breed: faker.animal.dog(),
			energy_level: 'LOW',
			environment: 'APARTMENT',
			independence_level: 'HIGH',
			size: 'MEDIUM',
			organization_id: faker.string.uuid(),
		})

		expect(pet.id).toEqual(expect.any(String))
	})
})
