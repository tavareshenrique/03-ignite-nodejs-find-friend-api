import { faker } from '@faker-js/faker'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPhotosRepository } from '@/repositories/in-memory/in-memory-photos-repository'

import { CreatePhotosUseCase } from './create-photos'

let photosRepository: InMemoryPhotosRepository
let sut: CreatePhotosUseCase

describe('Create Photos Case', () => {
	beforeEach(() => {
		photosRepository = new InMemoryPhotosRepository()

		sut = new CreatePhotosUseCase(photosRepository)
	})

	it('should be able to add photos', async () => {
		const petId = faker.string.uuid()
		const photos = [faker.internet.url(), faker.internet.url()]

		const response = await sut.execute({
			petId,
			photos,
		})

		expect(response.photos).toHaveLength(2)
	})
})
