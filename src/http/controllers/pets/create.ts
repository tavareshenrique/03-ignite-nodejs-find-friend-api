import fs from 'node:fs'
import path from 'node:path'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { makeCreatePhotosUseCase } from '@/use-cases/factories/make-photos-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createPetSchema = z.object({
		name: z.string(),
		about: z.string(),
		breed: z.string(),
		age: z.union([z.literal('PUPPY'), z.literal('ADULT'), z.literal('SENIOR')]),
		adopted_in: z.date().nullable().optional().default(null),
		size: z.union([
			z.literal('SMALL'),
			z.literal('MEDIUM'),
			z.literal('LARGE'),
		]),
		energy_level: z.union([
			z.literal('LOW'),
			z.literal('MEDIUM'),
			z.literal('HIGH'),
		]),
		environment: z.union([
			z.literal('APARTMENT'),
			z.literal('HOUSE_WITH_YARD'),
			z.literal('LARGE_ENVIRONMENT'),
		]),
		independence_level: z.union([
			z.literal('LOW'),
			z.literal('MEDIUM'),
			z.literal('HIGH'),
		]),
		adoption_requirements: z.string().array(),
	})

	const uploadDir = path.join(process.cwd(), '.uploads')

	const parts = request.parts()
	const photosFile = []
	const formData: { [key: string]: any } = {}

	for await (const part of parts) {
		if (part.type === 'file') {
			const fileName = Date.now() + '-' + part.filename
			const filePath = path.join(uploadDir, fileName)

			await fs.promises.writeFile(filePath, await part.toBuffer())

			photosFile.push(`/.uploads/${fileName}`)
		} else if (part.type === 'field') {
			if (part.fieldname === 'adoption_requirements') {
				formData[part.fieldname] = formData[part.fieldname] || []
				formData[part.fieldname].push(part.value)
			} else {
				formData[part.fieldname] = part.value
			}
		}
	}

	const {
		about,
		adopted_in,
		adoption_requirements,
		age,
		breed,
		energy_level,
		environment,
		independence_level,
		name,
		size,
	} = createPetSchema.parse(formData)

	const createPetUseCase = makeCreatePetUseCase()

	const { pet } = await createPetUseCase.execute({
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
		organization_id: request.user.organization.sub,
	})

	const createPhotosUseCase = makeCreatePhotosUseCase()

	const { photos } = await createPhotosUseCase.execute({
		petId: pet.id,
		photos: photosFile,
	})

	reply.status(201).send({
		pet,
		photos,
	})
}
