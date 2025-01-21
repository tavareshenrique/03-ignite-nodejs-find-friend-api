import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organizations-repository'

import { CreatePetUseCase } from '../create-organization'

export function makeCreateOrganizationUseCase() {
	const organizationRepository = new PrismaOrganizationRepository()
	const useCase = new CreatePetUseCase(organizationRepository)

	return useCase
}
