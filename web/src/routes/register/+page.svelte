<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>sign In</a
		> if you already have an account.
	</p>
	<form class="flex flex-col items-center space-y-2 w-full pt-4 max-w-md" method="POST">
		<div class="form-control w-full">
			<label for="name" class="label font-medium pb-1">
				<span class="label-text">Name</span>
			</label>
			<input type="text" name="name" class="input input-bordered w-full" />
		</div>
		<div class="form-control w-full">
			<label for="email" class="label font-medium pb-1">
				<span class="label-text">Email</span>
			</label>
			<input type="text" name="email" class="input input-bordered w-full" />
		</div>
		<div class="form-control w-full">
			<label for="password" class="label font-medium pb-1">
				<span class="label-text">Password</span>
			</label>
			<input type="password" name="password" class="input input-bordered w-full" />
		</div>
		<div class="form-control w-full">
			<label for="passwordConfirm" class="label font-medium pb-1">
				<span class="label-text">Confirm Password</span>
			</label>
			<input type="password" name="passwordConfirm" class="input input-bordered w-full" />
		</div>
		<div class="w-full max-w-md pt-2">
			<button class="btn btn-primary w-full" type="submit">Register</button>
		</div>
	</form>
</div>
