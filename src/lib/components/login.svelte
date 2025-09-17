<script lang="ts">
	import { http } from '$lib/client/net/http';
	import { toastMan } from '$lib/client/universal/toast.svelte';
	import { userMan } from '$lib/client/universal/user.svelte';
	import { getByCurrentQueryString } from '$lib/utils';
	import { goto } from '$app/navigation';

	let { ...res } = $props();

	let dialog: HTMLDialogElement;
	let phoneNumber: HTMLInputElement;

	let logging = $state(false);
	let error = $state('');
	let count = $state(0);
	let sendCaptchaButtonText = $derived.by(() => {
		return count === 0 ? '发送验证码' : `${count}秒后重新发送`;
	});

	export function openLoginBox() {
		dialog.showModal();
	}

	async function onSendCaptcha() {
		if (count !== 0 || !phoneNumber.value.trim()) {
			return;
		}

		await http.post('captcha', phoneNumber.value.trim());

		count = 60;
		const id = setInterval(() => {
			if (count === 0) {
				clearInterval(id);
				return;
			}
			count--;
		}, 1_000);
	}

	async function onLogin(ev: Event) {
		ev.preventDefault();

		const form = ev.target as HTMLFormElement;
		const formData = new FormData(form);
		let phoneNumber = formData.get('phoneNumber') as string;
		phoneNumber = phoneNumber.trim();
		if (!phoneNumber) {
			return false;
		}

		let captcha = formData.get('captcha') as string;
		captcha = captcha.trim();
		if (!captcha) {
			return false;
		}

		logging = true;

		error = (await userMan.login(phoneNumber, captcha)) ?? '';
		if (error) {
			toastMan.add('warning', '登录失败，请重试');
		} else {
			toastMan.add('success', '登录成功');
			const redirect = getByCurrentQueryString('redirect');
			if (redirect) {
				goto(redirect);
			}

			dialog?.close();
		}

		logging = false;
	}
</script>

<button class="btn btn-wide btn-primary" {...res} onclick={openLoginBox}>登录</button>
<dialog bind:this={dialog} class="modal">
	<form class="modal-box -mt-30" onsubmit={onLogin}>
		<div class="flex flex-col items-center">
			<div class="flex max-w-80 flex-col gap-2">
				<span class="my-8 text-center text-3xl font-bold">登录</span>

				<label class="validator input">
					<i class="icon-[mdi--cellphone]"></i>
					<input
						bind:this={phoneNumber}
						name="phoneNumber"
						type="tel"
						class="tabular-nums"
						required
						placeholder="请输入手机号"
						pattern="[0-9]*"
						minlength="11"
						maxlength="11"
						title="请输入手机号"
					/>
				</label>
				<p class="validator-hint">请输入 11 位手机号</p>

				<div class="join">
					<div>
						<label class="validator input join-item">
							<i class="icon-[mdi--letters]"></i>
							<input
								type="text"
								name="captcha"
								placeholder="验证码"
								maxlength="4"
								minlength="4"
								required
							/>
						</label>
						<div class="validator-hint hidden">请填写收到的验证码</div>
					</div>
					<button
						class="btn join-item btn-neutral"
						type="button"
						onclick={onSendCaptcha}
						disabled={count !== 0}
					>
						{sendCaptchaButtonText}
					</button>
				</div>
				<p class="text-error">{error}</p>
			</div>
		</div>

		<div class="modal-action">
			<button class="btn btn-outline" onclick={() => dialog?.close()}>关闭</button>
			<button class="btn btn-primary" type="submit" disabled={logging}>登录</button>
		</div>
	</form>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
