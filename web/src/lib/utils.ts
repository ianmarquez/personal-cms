const { randomBytes } = await import('node:crypto');
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { ZodEffects, ZodError, ZodObject } from 'zod';

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

export const validateData = async <T>(
	formData: FormData,
	schema: ZodEffects<any> | ZodObject<any>
) => {
	const body = Object.fromEntries(formData) as T;
	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err: any) {
		const error = err as ZodError;
		const errors = error.flatten();
		console.log(errors);
		return {
			formData: body,
			errors
		};
	}
};
