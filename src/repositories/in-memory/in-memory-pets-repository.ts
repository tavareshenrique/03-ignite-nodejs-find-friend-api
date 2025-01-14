import { randomUUID } from 'node:crypto'

import { PetAge, PetEnvironment, PetLevels, PetSize } from '@prisma/client'

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
		size?: PetSize,
		independence_level?: PetLevels,
		energy_level?: PetLevels,
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

	async create(pet: Omit<Pet, 'id'>): Promise<Pet> {
		const newPet = {
			...pet,
			id: randomUUID(),
		}

		this.pets.push(newPet)

		return newPet
	}
}
