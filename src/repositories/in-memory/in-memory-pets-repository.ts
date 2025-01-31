import { randomUUID } from 'node:crypto'

import {
	PetAge,
	PetEnvironment,
	PetLevels,
	PetSize,
	Prisma,
} from '@prisma/client'

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

	async findMany({
		breed,
		age,
		size,
		independence_level,
		energy_level,
		environment,
	}: {
		breed?: string
		age?: PetAge
		size?: PetSize
		independence_level?: PetLevels
		energy_level?: PetLevels
		environment?: PetEnvironment
	}): Promise<Pet[]> {
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

		return pets
	}

	async create(pet: Prisma.PetCreateInput): Promise<Pet> {
		const newPet = {
			id: randomUUID(),
			about: pet.about,
			adopted_in: null,
			adoption_requirements: Array.isArray(pet.adoption_requirements)
				? pet.adoption_requirements
				: [],
			age: pet.age,
			breed: pet.breed,
			energy_level: pet.energy_level,
			environment: pet.environment,
			independence_level: pet.independence_level,
			name: pet.name,
			size: pet.size,
		}

		this.pets.push(newPet)

		return newPet
	}
}
