import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }): LayoutData => {
	console.log(locals.user);
	if (locals.user) {
		return {
			user: locals.user
		};
	}

	return {
		user: null
	};
};
