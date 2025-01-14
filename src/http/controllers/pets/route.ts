import { FastifyInstance } from 'fastify'

import { create } from './create'
import { get } from './get'

export async function petsRoutes(app: FastifyInstance) {
	app.get('/pets/:petId', get)

	app.post('/pets', create)
}
