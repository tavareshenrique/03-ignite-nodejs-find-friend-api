import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
	const createPetParamsSchema = z.object({
		name: z.string(),
		owner: z.string(),
		email: z.string().email(),
		whatsapp: z.string(),
		password: z
			.string()
			.min(6, { message: 'A Senha deve conter no mínimo 6 caracteres' })
			.max(24, { message: 'A Senha deve conter no máximo 24 caracteres' }),
		address: z.string(),
		zipcode: z
			.string()
			.min(8, {
				message: 'O CEP deve conter no mínimo 8 caracteres',
			})
			.max(8, {
				message: 'O CEP deve conter no máximo 8 caracteres',
			}),
		city: z.string(),
		uf: z
			.string()
			.length(2, {
				message: 'A UF deve conter 2 caracteres',
			})
			.max(2, {
				message: 'A UF deve conter 2 caracteres',
			}),
	})

	const { name, address, owner, email, whatsapp, city, password, uf, zipcode } =
		createPetParamsSchema.parse(request.body)

	try {
		const createOrganizationUseCase = makeCreateOrganizationUseCase()

		const { organization } = await createOrganizationUseCase.execute({
			address,
			city,
			email,
			name,
			owner,
			password,
			uf,
			whatsapp,
			zipcode,
		})

		reply.status(201).send({
			organization,
		})
	} catch (err) {
		if (err instanceof OrganizationAlreadyExistsError) {
			return reply.status(400).send({
				message: err.message,
			})
		}

		throw err
	}
}
