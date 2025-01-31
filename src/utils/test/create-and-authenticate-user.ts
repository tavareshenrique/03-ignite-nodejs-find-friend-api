import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(app: FastifyInstance) {
	const password = faker.internet.password()

	const organizationData = {
		name: faker.company.name(),
		owner: faker.person.firstName(),
		email: faker.internet.email(),
		whatsapp: faker.phone.number(),
		address: faker.location.streetAddress(),
		password_hash: await hash(password, 8),
		zipcode: faker.location.zipCode({
			format: '########',
		}),
		city: faker.location.city(),
		uf: faker.location.state({ abbreviated: true }),
	}

	await prisma.organization.create({
		data: organizationData,
	})

	const authResponse = await request(app.server).post('/sessions').send({
		email: organizationData.email,
		password,
	})

	const { token } = authResponse.body

	return { token }
}
