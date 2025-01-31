import { randomUUID } from 'node:crypto'

import { Photo } from '@prisma/client'

import { PhotoCreateInput, PhotosRepository } from '../photos-repository'

export class InMemoryPhotosRepository implements PhotosRepository {
	public photos: Photo[] = []

	async create({ petId, url }: PhotoCreateInput) {
		const photo = {
			id: randomUUID(),
			pet_id: petId,
			url,
			created_at: new Date(),
		}

		this.photos.push(photo)

		return photo
	}
}
