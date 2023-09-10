import type { ProjectsResponse } from '$lib/types/pocketbase-types';
import { error, redirect, type Actions, fail } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { validateData } from '$lib/utils';
import { updateProjectSchema } from '$lib/schemas';

export const load: PageServerLoad = ({ locals, params }) => {
	const projectId = params.projectId;
	const getProject = async (projectId: string) => {
		if (!locals.pb.authStore.isValid || locals.user === null) {
			throw redirect(303, '/login');
		}

		try {
			const project = structuredClone(
				await locals.pb.collection('projects').getOne<ProjectsResponse>(projectId)
			);
			if (locals.user.id === project.user) {
				return project;
			} else {
				throw error(403, 'You are not authorized to edit this project');
			}
		} catch (err: any) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(
				err.status || 400,
				err.message || 'An error has occurred fethching project with id:' + projectId
			);
		}
	};
	return {
		project: getProject(projectId)
	};
};

export const actions: Actions = {
	updateProject: async ({ request, locals, params }) => {
		const body = await request.formData();
		if (!params.projectId) throw error(400, 'Project ID is required');

		const thumb = body.get('thumbnail') as File;
		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData<UpdateProjectFormData>(
			body,
			updateProjectSchema
		);

		if (errors) {
			delete formData.thumbnail;
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('projects').update(params.projectId, body);
		} catch (err: any) {
			console.error(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(
				err.status || 400,
				err.message || 'An error has occurred updating project with id:' + params.projectId
			);
		}

		throw redirect(303, `/my/projects`);
	},
	deleteThumbnail: async ({ params, locals }) => {
		if (!params.projectId) throw error(400, 'Project ID is required');

		try {
			await locals.pb.collection('projects').update(params.projectId, {
				thumbnail: null
			});
		} catch (err: any) {
			console.log(err);
			if (err instanceof ClientResponseError) {
				throw error(err.status, err.message);
			}
			throw error(
				err.status || 400,
				err.message || 'An error has occurred thumbnail of project with id:' + params.projectId
			);
		}
		return {
			success: true
		};
	},
	cancelChanges: async () => {
		throw redirect(303, '/my/projects/');
	}
};
