import { FILE_SIZE, IMAGE_TYPES } from '$lib/constants';
import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' }),
	password: z.string({ required_error: 'Password is required' })
});

export const resetPasswordSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email({
		message: 'Email must be a valid email'
	})
});

export const registerUserSchema = z
	.object({
		name: z
			.string({ required_error: 'Name is required' })
			.regex(/^[a-zA-Z ]*$/, { message: 'Name can only contain letters and spaces' })
			.min(2, { message: 'Name must be at least 2 characters' })
			.max(64, { message: 'Name must be less than 64 characters' })
			.trim(),
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters and contain at least one letter, one number and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters and contain at least one letter, one number and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password and Confirm Password must match',
				path: ['password']
			});

			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password and Confirm Password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const projectSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.regex(/^[a-zA-Z ]*$/, { message: 'Name can only contain letters and spaces' })
		.min(2, { message: 'Name must be at least 2 characters' })
		.max(64, { message: 'Name must be less than 64 characters' })
		.trim(),
	tagline: z
		.string({ required_error: 'Tagline is required' })
		.min(1, { message: 'Tagline is required' })
		.max(64, { message: 'Tagline must bet 64 characters or less' })
		.trim(),
	url: z.string({ required_error: 'URL is required' }).url({ message: 'Please enter a valid URL' }),
	description: z
		.string({ required_error: 'Description is required' })
		.min(1, { message: 'Description is required' })
		.max(512, { message: 'Descrioption must be less than 512 characters' })
		.trim(),
	thumbnail: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > FILE_SIZE) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Thumbnail must be less than 5MB'
					});
				}
				if (!IMAGE_TYPES.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `${val.type} is not a valid image type. Supported formats: ${JSON.stringify(
							IMAGE_TYPES.join(', ')
						)}`
					});
				}
			}
		}),
	user: z.string({ required_error: 'User is required' })
});

export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(64, { message: 'Username must be less than 64 characters' })
		.regex(/^[a-zA-Z0-9_]*$/, {
			message: 'Username can only contain letters, numbers and underscores'
		})
		.trim()
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: 'Password is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters and contain at least one letter, one number and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters and contain at least one letter, one number and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password and Confirm Password must match',
				path: ['password']
			});

			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password and Confirm Password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const updateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.regex(/^[a-zA-Z ]*$/, { message: 'Name can only contain letters and spaces' })
		.min(2, { message: 'Name must be at least 2 characters' })
		.max(64, { message: 'Name must be less than 64 characters' })
		.trim(),
	avatar: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > FILE_SIZE) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Avatar must be less than 5MB'
					});
				}
				if (!IMAGE_TYPES.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `${val.type} is not a valid image type. Supported formats: ${JSON.stringify(
							IMAGE_TYPES.join(', ')
						)}`
					});
				}
			}
		})
});
