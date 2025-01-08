import { Levels, Pet, PetAge, PetEnvironment } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { PetRepository } from '../pets-repository'

export class PrismaCheckInsRepository implements PetRepository {
	async findById(id: string) {
		const pet = prisma.pet.findUnique({
			where: {
				id,
			},
		})

		return pet
	}

	findMany(
		city: string,
		uf: string,
		breed?: string,
		age?: PetAge,
		size?: Levels,
		independence_level?: Levels,
		energy_level?: Levels,
		environment?: PetEnvironment,
	): Promise<Pet[] | null> {
		const pets = prisma.pet.findMany({
			where: {
				breed,
				age,
				size,
				independence_level,
				energy_level,
				environment,
				adopted_in: null,
				organization: {
					city,
					uf,
				},
			},
		})

		return pets
	}
}
