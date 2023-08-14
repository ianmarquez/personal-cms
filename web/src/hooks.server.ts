import { PUBLIC_ENVIRONMENT } from '$env/static/public';
import { pb } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	event.locals.pb = pb;
	if (event.locals.pb.authStore.isValid) {
		try {
			await event.locals.pb.collection('users').authRefresh();
		} catch (_) {
			event.locals.pb.authStore.clear();
		}
	}
	event.locals.user = structuredClone(pb.authStore.model);

	const response = await resolve(event);
	let cookie = event.locals.pb.authStore.exportToCookie({ httpOnly: PUBLIC_ENVIRONMENT === 'dev' });
	response.headers.append('set-cookie', cookie);
	return response;
};
