export interface PhotoCreateInput {
	url: string
	petId: string
}

export interface PhotoCreateResponse {
	id: string
	url: string
}

export interface PhotosRepository {
	create({ petId, url }: PhotoCreateInput): Promise<PhotoCreateResponse>
}
