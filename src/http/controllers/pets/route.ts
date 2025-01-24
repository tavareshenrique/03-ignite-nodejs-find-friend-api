import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { get } from './get'
import { getMany } from './get-many'

export async function petsRoutes(app: FastifyInstance) {
	app.get('/pets/:petId', get)
	app.get('/pets', getMany)

	/** Authenticated Bellow */
	app.post('/pets', { onRequest: [verifyJWT] }, create)
}
