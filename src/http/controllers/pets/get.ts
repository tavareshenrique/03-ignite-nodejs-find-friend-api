import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
	const getPetParamsSchema = z.object({
		petId: z.string().uuid(),
	})

	const getPetUseCase = makeGetPetUseCase()

	const { petId } = getPetParamsSchema.parse(request.params)

	const { pet } = await getPetUseCase.execute({
		petId,
	})

	reply.status(200).send({
		pet,
	})
}
