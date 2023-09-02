import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }): LayoutData => {
	if (locals.user) {
		return {
			user: locals.user
		};
	}

	return {
		user: null
	};
};
