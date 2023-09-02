const { randomBytes } = await import('node:crypto');
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const generateUsername = (name: string) => {
	const id = randomBytes(2).toString('hex');
	return `${name.replaceAll(' ', '_').slice(0, 5)}${id}`.toLowerCase();
};

export const getImageUrl = (
	collectionId: string,
	recordId: string,
	fileName: string,
	size = '0x0'
) => `${PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
