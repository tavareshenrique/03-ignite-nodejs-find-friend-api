import { prisma } from '@/lib/prisma'

import {
	PhotoCreateInput,
	PhotoCreateResponse,
	PhotosRepository,
} from '../photos-repository'

export class PrismaPhotosRepository implements PhotosRepository {
	async create({ petId, url }: PhotoCreateInput): Promise<PhotoCreateResponse> {
		const photos = await prisma.photo.create({
			data: {
				pet_id: petId,
				url,
			},
		})

		return {
			id: photos.id,
			url: photos.url,
		}
	}
}
