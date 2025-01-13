import { Levels, PetAge, PetEnvironment } from '@prisma/client'

import { Pet, PetRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetRepository {
	public pets: Pet[] = []

	async findById(id: string): Promise<Pet | null> {
		const pet = this.pets.find((pet) => pet.id === id)

		if (!pet) {
			return null
		}

		return pet
	}

	async findMany(
		city: string,
		uf: string,
		breed?: string,
		age?: PetAge,
		size?: Levels,
		independence_level?: Levels,
		energy_level?: Levels,
		environment?: PetEnvironment,
	): Promise<Pet[] | null> {
		const pets = this.pets.filter((pet) => {
			if (breed && pet.breed !== breed) {
				return false
			}

			if (age && pet.age !== age) {
				return false
			}

			if (size && pet.size !== size) {
				return false
			}

			if (independence_level && pet.independence_level !== independence_level) {
				return false
			}

			if (energy_level && pet.energy_level !== energy_level) {
				return false
			}

			if (environment && pet.environment !== environment) {
				return false
			}

			return true
		})

		return Promise.resolve(pets)
	}
}
