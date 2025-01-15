import { FastifyInstance } from 'fastify'

import { create } from './create'
import { get } from './get'
import { getMany } from './get-many'

export async function petsRoutes(app: FastifyInstance) {
	app.get('/pets/:petId', get)
	app.get('/pets', getMany)

	app.post('/pets', create)
}
