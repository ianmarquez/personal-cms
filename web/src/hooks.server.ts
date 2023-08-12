import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import { pb } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh();
		} catch (err) {
			console.error(err);
			pb.authStore.clear();
		}
	}

	event.locals.pb = pb;
	event.locals.user = structuredClone(pb.authStore.model);

	const response = await resolve(event);
	response.headers.set(
		'set-cookie',
		pb.authStore.exportToCookie({ httpOnly: PUBLIC_ENVIRONMENT === 'dev' })
	);

	return response;
};
