import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createPet } from '@/utils/test/create-pet'

describe('Create Pet', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should create a new pet', async () => {
		const { petResponse } = await createPet(app)

		expect(petResponse.status).toBe(201)
	})
})
