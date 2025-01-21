import '@fastify/jwt'

declare module '@fastify/jwt' {
	interface FastifyJWT {
		organization: {
			sub: string
		}
	}
}
