// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: import('pocketbase').default;
			user: import('pocketbase').default['authStore']['model'];
		}
		// interface PageData {}
		// interface Platform {}
	}
	declare class LayoutData {
		user: import('pocketbase').default['authStore']['model'];
	}
	declare class RegisterUserFormData {
		email: string;
		password: string;
		passwordConfirm: string;
		name: string;
		username: string;
	}
	declare class LoginFormData {
		email: string;
		password: string;
	}
	declare class ResetPasswordFormData {
		email: string;
	}
	declare class ProjectFormData {
		name: string;
		tagline: string;
		url: string;
		description: string;
		thumbnail?: File;
		user: import('pocketbase').default['authStore']['model'];
	}
}

export {};
