import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

import { GetManyPetsUseCase } from '../get-many-pets'

export function makeGetManyPetsUseCase() {
	const petsRepository = new PrismaPetsRepository()
	const useCase = new GetManyPetsUseCase(petsRepository)

	return useCase
}
