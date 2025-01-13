import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { NotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
	const getPetParamsSchema = z.object({
		petId: z.string().uuid(),
	})

	const { petId } = getPetParamsSchema.parse(request.params)

	try {
		const getPetUseCase = makeGetPetUseCase()

		const { pet } = await getPetUseCase.execute({
			petId,
		})

		reply.status(200).send({
			pet,
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
