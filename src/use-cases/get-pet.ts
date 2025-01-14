import { Pet, PetRepository } from '@/repositories/pets-repository'

import { NotFoundError } from './errors/resource-not-found-error'

interface GetPetUseCaseRequest {
	petId: string
}

interface PetUseCaseResponse {
	pet: Pet
}

export class GetPetUseCase {
	constructor(private readonly petsRepository: PetRepository) {}

	async execute({ petId }: GetPetUseCaseRequest): Promise<PetUseCaseResponse> {
		const pet = await this.petsRepository.findById(petId)

		if (!pet) {
			throw new NotFoundError('Pet')
		}

		return {
			pet,
		}
	}
}
