import {
	Levels,
	Pet as PrismaPet,
	PetAge,
	PetEnvironment,
} from '@prisma/client'

export type Pet = Omit<PrismaPet, 'organization_id'>

export interface PetRepository {
	findById(id: string): Promise<Pet | null>
	findMany(
		city: string,
		uf: string,
		breed?: string,
		age?: PetAge,
		size?: Levels,
		independence_level?: Levels,
		energy_level?: Levels,
		environment?: PetEnvironment,
	): Promise<Pet[] | null>
}
