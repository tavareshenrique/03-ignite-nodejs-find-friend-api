import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organizations-repository'

import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
	const organizationsRepository = new PrismaOrganizationRepository()

	const useCase = new AuthenticateUseCase(organizationsRepository)

	return useCase
}
