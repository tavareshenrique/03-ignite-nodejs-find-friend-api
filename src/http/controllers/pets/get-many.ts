import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { NotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetManyPetsUseCase } from '@/use-cases/factories/make-get-many-pets-use-case'

export async function getMany(request: FastifyRequest, reply: FastifyReply) {
	const getPetParamsSchema = z.object({
		city: z.string(),
		uf: z.string().length(2),
		age: z
			.union([z.literal('PUPPY'), z.literal('ADULT'), z.literal('SENIOR')])
			.optional(),
		breed: z.string().optional(),
		energy_level: z
			.union([z.literal('LOW'), z.literal('MEDIUM'), z.literal('HIGH')])
			.optional(),
		environment: z
			.union([
				z.literal('APARTMENT'),
				z.literal('HOUSE_WITH_YARD'),
				z.literal('LARGE_ENVIRONMENT'),
			])
			.optional(),
		independence_level: z
			.union([z.literal('LOW'), z.literal('MEDIUM'), z.literal('HIGH')])
			.optional(),
		size: z
			.union([z.literal('SMALL'), z.literal('MEDIUM'), z.literal('LARGE')])
			.optional(),
	})

	const {
		city,
		uf,
		age,
		breed,
		energy_level,
		environment,
		independence_level,
		size,
	} = getPetParamsSchema.parse(request.query)

	try {
		const getPetUseCase = makeGetManyPetsUseCase()

		const { pets } = await getPetUseCase.execute({
			city,
			uf,
			age,
			breed,
			energy_level,
			environment,
			independence_level,
			size,
		})

		reply.status(200).send({
			pets,
		})
	} catch (err) {
		if (err instanceof NotFoundError) {
			return reply.status(400).send({
				message: err.message,
			})
		}

		throw err
	}
}
