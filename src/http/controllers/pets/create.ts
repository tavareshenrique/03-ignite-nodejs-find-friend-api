import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createPetParamsSchema = z.object({
		name: z.string(),
		about: z.string(),
		breed: z.string(),
		age: z.union([z.literal('PUPPY'), z.literal('ADULT'), z.literal('SENIOR')]),
		adopted_in: z.date().nullable(),
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
		adoption_requirements: z.array(z.string()),
	})

	const {
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
	} = createPetParamsSchema.parse(request.body)

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

	reply.status(201).send({
		pet,
	})
}
