import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

import { OrganizationsRepository } from '@/repositories/organizations-repository'

import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface CreateOrganizationUseCaseRequest {
	name: string
	owner: string
	email: string
	whatsapp: string
	password: string
	address: string
	zipcode: string
	city: string
	uf: string
}

interface CreateOrganizationUseCaseResponse {
	organization: Organization
}

export class CreatePetUseCase {
	constructor(
		private readonly organizationsRepository: OrganizationsRepository,
	) {}

	async execute({
		name,
		owner,
		email,
		password,
		whatsapp,
		address,
		zipcode,
		city,
		uf,
	}: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
		const password_hash = await hash(password, 6)

		const organizationWithSameEmail =
			await this.organizationsRepository.findByEmail(email)

		if (organizationWithSameEmail) {
			throw new OrganizationAlreadyExistsError()
		}

		const organization = await this.organizationsRepository.create({
			name,
			owner,
			email,
			password_hash,
			whatsapp,
			address,
			zipcode,
			city,
			uf,
		})

		return {
			organization,
		}
	}
}
