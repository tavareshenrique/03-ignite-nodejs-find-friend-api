import {
	PhotoCreateResponse,
	PhotosRepository,
} from '@/repositories/photos-repository'

interface CreatePhotoUseCaseRequest {
	petId: string
	photos: string[]
}

export interface CreatePhotoUseCaseResponse {
	photos: PhotoCreateResponse[]
}

export class CreatePhotosUseCase {
	constructor(private readonly photosRepository: PhotosRepository) {}

	async execute({
		petId,
		photos,
	}: CreatePhotoUseCaseRequest): Promise<CreatePhotoUseCaseResponse> {
		const photosData = await Promise.all(
			photos.map(async (photo) => {
				return this.photosRepository.create({
					petId,
					url: photo,
				})
			}),
		)

		return {
			photos: photosData,
		}
	}
}
