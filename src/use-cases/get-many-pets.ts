import { PetAge, PetEnvironment, PetLevels, PetSize } from '@prisma/client'

import { Pet, PetRepository } from '@/repositories/pets-repository'

import { NotFoundError } from './errors/resource-not-found-error'

interface GetManyPetsUseCaseRequest {
	city: string
	uf: string
	breed?: string
	age?: PetAge
	size?: PetSize
	independence_level?: PetLevels
	energy_level?: PetLevels
	environment?: PetEnvironment
}

interface GetManyPetsUseCaseResponse {
	pets: Pet[]
}

export class GetManyPetsUseCase {
	constructor(private readonly petsRepository: PetRepository) {}

	async execute({
		city,
		uf,
		age,
		breed,
		energy_level,
		environment,
		independence_level,
		size,
	}: GetManyPetsUseCaseRequest): Promise<GetManyPetsUseCaseResponse> {
		const pets = await this.petsRepository.findMany({
			city,
			uf,
			age,
			breed,
			energy_level,
			environment,
			independence_level,
			size,
		})

		if (!pets) {
			throw new NotFoundError("Pet's")
		}

		return {
			pets,
		}
	}
}
