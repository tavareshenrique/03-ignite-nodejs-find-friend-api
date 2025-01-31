import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationRepository implements OrganizationsRepository {
	async findById(id: string) {
		const organization = await prisma.organization.findUnique({
			where: {
				id,
			},
		})

		return organization
	}

	async findByEmail(email: string) {
		const organization = await prisma.organization.findUnique({
			where: {
				email,
			},
		})

		return organization
	}

	async create(data: Prisma.OrganizationCreateInput) {
		const organization = await prisma.organization.create({
			data: {
				name: data.name,
				owner: data.owner,
				email: data.email,
				whatsapp: data.whatsapp,
				password_hash: data.password_hash,
				address: data.address,
				zipcode: data.zipcode,
				city: data.city,
				uf: data.uf,
			},
		})

		return organization
	}
}
