import '@fastify/jwt'

declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: {
			organization: {
				sub: string
			}
		}
	}
}
