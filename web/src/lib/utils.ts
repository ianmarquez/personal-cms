const { randomBytes } = await import('node:crypto');

export const generateUsername = (name: string) => {
	const id = randomBytes(2).toString('hex');
	return `${name.replaceAll(' ', '_').slice(0, 5)}${id}`.toLowerCase();
};