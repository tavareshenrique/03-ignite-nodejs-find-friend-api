import { Levels, PetAge, PetEnvironment } from '@prisma/client'

import { Pet, PetRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
	name: string
	about: string
	breed: string
	age: PetAge
	adopted_in: Date
	size: Levels
	energy_level: Levels
	environment: PetEnvironment
	independence_level: Levels
	adoption_requirements: string[]
	organization_id: string
}

interface CreatePetUseCaseResponse {
	pet: Pet
}

export class CreatePetUseCase {
	constructor(private readonly petsRepository: PetRepository) {}

	async execute({
		name,
		about,
		breed,
		age,
		size,
		adopted_in,
		energy_level,
		environment,
		independence_level,
		adoption_requirements,
		organization_id,
	}: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
		const pet = await this.petsRepository.create({
			name,
			about,
			breed,
			age,
			size,
			adopted_in,
			energy_level,
			environment,
			independence_level,
			adoption_requirements,
			organization_id,
		})

		return {
			pet,
		}
	}
}
