import { updateProfileSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.user?.id || !locals.pb.authStore.isValid) {
			throw redirect(303, '/login');
		}

		const body = await request.formData();
		const userAvatar = body.get('avatar');
		if (userAvatar instanceof File && userAvatar.size === 0) {
			body.delete('avatar');
		}

		const { formData, errors } = await validateData<{
			name: string;
			avatar: File;
		}>(body, updateProfileSchema);

		const { avatar, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			const { name, avatar } = await locals.pb
				.collection('users')
				.update(locals?.user?.id, serialize(formData));
			locals.user.name = name;
			locals.user.avatar = avatar;
		} catch (err: unknown) {
			console.log('Error', err);
			throw error(400, 'Something went wrong updating your profile');
		}

		return {
			success: true
		};
	}
};
