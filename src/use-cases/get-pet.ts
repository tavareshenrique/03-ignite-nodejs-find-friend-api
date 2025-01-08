import { Pet } from '@prisma/client'

import { PetRepository } from '@/repositories/pets-repository'

interface ICheckInUseCaseRequest {
	petId: string
}

interface PetUseCaseResponse {
	pet: Pet
}

export class PetUseCase {
	constructor(private readonly petsRepository: PetRepository) {}

	async execute({
		petId,
	}: ICheckInUseCaseRequest): Promise<PetUseCaseResponse> {
		const pet = await this.petsRepository.findById(petId)

		if (!pet) {
			throw new Error('Pet not found')
		}

		return {
			pet,
		}
	}
}
