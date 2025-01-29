import {
	Pet as PrismaPet,
	PetAge,
	PetEnvironment,
	PetLevels,
	PetSize,
} from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { Pet, PetRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetRepository {
	async findById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				breed: true,
				about: true,
				age: true,
				size: true,
				independence_level: true,
				energy_level: true,
				environment: true,
				adopted_in: true,
				adoption_requirements: true,
				organization_id: false,
				organization: {
					select: {
						id: true,
						name: true,
						city: true,
						uf: true,
					},
				},
			},
		})

		return pet
	}

	async findMany({
		city,
		uf,
		breed,
		age,
		size,
		independence_level,
		energy_level,
		environment,
	}: {
		city: string
		uf: string
		breed?: string
		age?: PetAge
		size?: PetSize
		independence_level?: PetLevels
		energy_level?: PetLevels
		environment?: PetEnvironment
	}): Promise<Pet[] | null> {
		const pets = await prisma.pet.findMany({
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
			include: {
				organization: {
					select: {
						city: true,
						uf: true,
					},
				},
			},
		})

		return pets
	}

	async create(pet: Omit<PrismaPet, 'id'>): Promise<Pet> {
		const createdPet = await prisma.pet.create({
			data: pet,
			select: {
				id: true,
				name: true,
				breed: true,
				about: true,
				age: true,
				size: true,
				independence_level: true,
				energy_level: true,
				environment: true,
				adoption_requirements: true,
				adopted_in: true,
				organization_id: false,
				organization: {
					select: {
						id: true,
						name: true,
						owner: true,
						email: true,
						whatsapp: true,
						address: true,
						zipcode: true,
						city: true,
						uf: true,
					},
				},
			},
		})

		return createdPet
	}
}
