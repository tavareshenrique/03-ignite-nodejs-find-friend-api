import {
	Pet as PrismaPet,
	PetAge,
	PetEnvironment,
	PetLevels,
	PetSize,
	Prisma,
} from '@prisma/client'

export type Pet = Omit<PrismaPet, 'organization_id'>

interface FindManyParams {
	city: string
	uf: string
	breed?: string
	age?: PetAge
	size?: PetSize
	independence_level?: PetLevels
	energy_level?: PetLevels
	environment?: PetEnvironment
}

export interface PetRepository {
	findById(id: string): Promise<Pet | null>
	findMany({
		city,
		uf,
		breed,
		age,
		size,
		independence_level,
		energy_level,
		environment,
	}: FindManyParams): Promise<Pet[] | null>
	create(pet: Prisma.PetCreateInput): Promise<Pet>
}
