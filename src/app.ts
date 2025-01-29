import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { organizationsRoutes } from './http/controllers/organizations/route'
import { petsRoutes } from './http/controllers/pets/route'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
})

app.register(multipart, {
	limits: {
		fileSize: 10 * 1024 * 1024, // 10 MB
	},
})

app.register(fastifyCookie)

app.register(petsRoutes)
app.register(organizationsRoutes)

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Validation error.',
			issues: error.format(),
		})
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error)
	} else {
		// TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry/Airbrake
	}

	return reply.status(500).send({
		message: 'Internal server error.',
	})
})
