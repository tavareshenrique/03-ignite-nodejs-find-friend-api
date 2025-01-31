import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { NotFoundError } from './errors/resource-not-found-error'
import { GetPetUseCase } from './get-pet'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()

		sut = new GetPetUseCase(petsRepository)
	})

	it('should get a pet', async () => {
		const petData = {
			name: faker.animal.dog(),
			about: faker.lorem.paragraph(),
			adopted_in: null,
			adoption_requirements: [faker.lorem.paragraph(), faker.lorem.paragraph()],
			age: 'SENIOR' as const,
			breed: faker.animal.dog(),
			energy_level: 'LOW' as const,
			environment: 'APARTMENT' as const,
			independence_level: 'HIGH' as const,
			size: 'MEDIUM' as const,
		}

		const { id } = await petsRepository.create(petData)

		const { pet } = await sut.execute({
			petId: id,
		})

		expect(pet).toEqual({
			...petData,
			id,
		})
	})

	it('should not get a pet that does not exist', async () => {
		await expect(
			sut.execute({
				petId: faker.string.uuid(),
			}),
		).rejects.toBeInstanceOf(NotFoundError)
	})
})
