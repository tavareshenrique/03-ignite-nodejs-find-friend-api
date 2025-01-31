import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

import { CreateOrganizationUseCase } from './create-organization'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
	beforeEach(() => {
		organizationsRepository = new InMemoryOrganizationsRepository()

		sut = new CreateOrganizationUseCase(organizationsRepository)
	})

	it('should be able to register', async () => {
		const organizationData = {
			name: faker.company.name(),
			owner: faker.person.firstName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			whatsapp: faker.phone.number(),
			address: faker.location.streetAddress(),
			zipcode: faker.location.zipCode(),
			city: faker.location.city(),
			uf: faker.location.state({ abbreviated: true }),
		} as const

		const { organization } = await sut.execute(organizationData)

		expect(organization.id).toEqual(expect.any(String))
	})

	it('should not be able to register with the same email', async () => {
		const organizationData = {
			name: faker.company.name(),
			owner: faker.person.firstName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			whatsapp: faker.phone.number(),
			address: faker.location.streetAddress(),
			zipcode: faker.location.zipCode(),
			city: faker.location.city(),
			uf: faker.location.state({ abbreviated: true }),
		} as const

		await sut.execute(organizationData)

		await expect(sut.execute(organizationData)).rejects.toBeInstanceOf(
			OrganizationAlreadyExistsError,
		)
	})
})
