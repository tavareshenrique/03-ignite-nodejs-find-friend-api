import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
// S.U.T = System Under Test
let sut: AuthenticateUseCase

let password = ''

let organizationData: {
	name: string
	owner: string
	email: string
	password_hash: string
	whatsapp: string
	address: string
	zipcode: string
	city: string
	uf: string
}

describe('Authenticate Use Case', () => {
	beforeEach(async () => {
		organizationsRepository = new InMemoryOrganizationsRepository()
		sut = new AuthenticateUseCase(organizationsRepository)

		password = faker.internet.password()

		organizationData = {
			name: faker.company.name(),
			owner: faker.person.firstName(),
			email: faker.internet.email(),
			password_hash: await hash(password, 6),
			whatsapp: faker.phone.number(),
			address: faker.location.streetAddress(),
			zipcode: faker.location.zipCode(),
			city: faker.location.city(),
			uf: faker.location.state({ abbreviated: true }),
		} as const
	})

	it('should be able to authenticate', async () => {
		await organizationsRepository.create(organizationData)

		const { organization } = await sut.execute({
			email: organizationData.email,
			password,
		})

		expect(organization.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async () => {
		await organizationsRepository.create(organizationData)

		await expect(
			sut.execute({
				email: 'johndoe@example.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
