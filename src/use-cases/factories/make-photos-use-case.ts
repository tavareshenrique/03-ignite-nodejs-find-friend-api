import { PrismaPhotosRepository } from '@/repositories/prisma/prisma-photos-repository'

import { CreatePhotosUseCase } from '../create-photos'

export function makeCreatePhotosUseCase() {
	const photosRepository = new PrismaPhotosRepository()

	const useCase = new CreatePhotosUseCase(photosRepository)

	return useCase
}
