<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import Login from '$lib/components/login.svelte';
	import { userMan } from '$lib/client/universal/user.svelte';
	import Avatar from '$lib/components/avatar.svelte';
	import ThemeController from '$lib/components/theme_controller.svelte';

	let { children } = $props();

	// svelte-ignore non_reactive_update
	let loginBox: Login;

	function onLogout() {
		userMan.logout();
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="fixed z-20">
	<div class="toast-top toast-end toast top-16">
		{#each toastMan.list as toast (toast[0])}
			{#if toast[1].toastType === 'success'}
				<div class="alert alert-success">
					<span>{toast[1].msg}</span>
				</div>
			{:else if toast[1].toastType === 'warning'}
				<div class="alert alert-warning">
					<span>{toast[1].msg}</span>
				</div>
			{:else}
				<div class="alert alert-info">
					<span>{toast[1].msg}</span>
				</div>
			{/if}
		{/each}
	</div>
</div>

<nav class="fixed top-0 z-10 navbar space-x-4 bg-transparent">
	<div class="flex-1">
		<a class="btn text-xl btn-link" href="/">
			<span class="h-7 w-7 overflow-clip rounded">
				<img class="w-full" src={favicon} alt="LOGO" />
			</span>
			TITLE</a
		>
	</div>
	<ThemeController />
	<div class="min-w-24 flex-none pr-4 text-right">
		{#if userMan.isLoggedIn}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="m-1 cursor-pointer">
					<Avatar placeholder={userMan.username.slice(-4)} />
				</div>
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<ul
					tabindex="0"
					class="dropdown-content menu z-1 mt-2 w-52 rounded-box bg-base-100 p-2 shadow-sm"
				>
					<li>
						<a href="/personal" class="link">
							<i class="icon-[mdi--person]"></i>
							个人中心</a
						>
					</li>
					<li>
						<button class="link link-error" onclick={onLogout}>
							<i class="icon-[mdi--logout]"></i>
							退出登录</button
						>
					</li>
				</ul>
			</div>
		{:else}
			<Login bind:this={loginBox} />
		{/if}
	</div>
</nav>

<main>
	{@render children?.()}
</main>

<footer class="mt-24 footer items-center bg-neutral p-4 text-neutral-content sm:footer-horizontal">
	<aside class="grid-flow-col items-center">
		<i class="icon-[mdi--license]"></i>
		<p>Copyright © {new Date().getFullYear()} - All right reserved</p>
	</aside>
</footer>
