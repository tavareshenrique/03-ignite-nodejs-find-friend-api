import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { PetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const useCase = new PetUseCase(petsRepository)

	return useCase
}
