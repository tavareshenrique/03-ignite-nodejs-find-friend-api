import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { NotFoundError } from './errors/resource-not-found-error'
import { GetManyPetsUseCase } from './get-many-pets'

let petsRepository: InMemoryPetsRepository
let sut: GetManyPetsUseCase

describe('Get Many Pet Use Case', () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository()

		sut = new GetManyPetsUseCase(petsRepository)
	})

	it('should be able to get many pets', async () => {
		const petData1: Prisma.PetCreateInput = {
			name: faker.animal.dog(),
			about: faker.lorem.paragraph(),
			adopted_in: null,
			adoption_requirements: [faker.lorem.paragraph(), faker.lorem.paragraph()],
			age: 'PUPPY' as const,
			breed: faker.animal.dog(),
			energy_level: 'LOW' as const,
			environment: 'APARTMENT' as const,
			independence_level: 'HIGH' as const,
			size: 'MEDIUM' as const,
			organization: {
				create: {
					name: faker.company.name(),
					city: faker.location.city(),
					uf: faker.location.state({ abbreviated: true }),
					address: faker.location.streetAddress(),
					owner: faker.person.firstName(),
					email: faker.internet.email(),
					whatsapp: faker.phone.number(),
					zipcode: faker.location.zipCode(),
					password_hash: faker.internet.password(),
				},
			},
		}

		const petData2: Prisma.PetCreateInput = {
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
			organization: {
				create: {
					name: faker.company.name(),
					city: faker.location.city(),
					uf: faker.location.state({ abbreviated: true }),
					address: faker.location.streetAddress(),
					owner: faker.person.firstName(),
					email: faker.internet.email(),
					whatsapp: faker.phone.number(),
					zipcode: faker.location.zipCode(),
					password_hash: faker.internet.password(),
				},
			},
		}

		await Promise.all([
			petsRepository.create(petData1),
			petsRepository.create(petData2),
		])

		const { pets } = await sut.execute({
			city: petData1.organization.create!.city,
			uf: petData1.organization.create!.uf,
			age: 'PUPPY',
		})

		expect(pets).toHaveLength(1)
	})

	it('should not be able to get many pets', async () => {
		await expect(
			sut.execute({
				city: faker.location.city(),
				uf: faker.location.state({ abbreviated: true }),
			}),
		).rejects.toBeInstanceOf(NotFoundError)
	})
})
