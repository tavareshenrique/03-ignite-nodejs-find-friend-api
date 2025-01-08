import { FastifyInstance } from 'fastify'

import { get } from './get'

export async function petsRoutes(app: FastifyInstance) {
	app.post('/pets/:petId', get)
}
