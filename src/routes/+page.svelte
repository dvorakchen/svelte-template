<script lang="ts">
	import MarginNavTop from '$lib/components/margin_nav_top.svelte';
</script>

<MarginNavTop />

<p>
	<button class="btn">Default</button>
	<button class="btn btn-primary">
		<span class="icon-[mdi--home]"></span>
		Primary</button
	>
	<button class="btn btn-secondary">Secondary</button>
	<button class="btn btn-accent">Accent</button>
	<button class="btn btn-warning">Warning</button>
	<button class="btn btn-error">Error</button>
	<button class="btn btn-neutral">Neutral</button>
	<button class="btn btn-info">Info</button>
	<button class="btn btn-success">Success</button>
</p>
<p>
	<button class="btn btn-outline">Default</button>
	<button class="btn btn-outline btn-primary">Default</button>
	<button class="btn btn-outline btn-secondary">Secondary</button>
	<button class="btn btn-outline btn-accent">Accent</button>
	<button class="btn btn-outline btn-warning">Warning</button>
	<button class="btn btn-outline btn-error">Error</button>
	<button class="btn btn-outline btn-neutral">Neutral</button>
	<button class="btn btn-outline btn-info">Info</button>
	<button class="btn btn-outline btn-success">Success</button>
</p>

<div class="p-1">
	<div class="dropdown">
		<div tabindex="0" role="button" class="btn m-1 bg-base-100">Dropdown 1</div>
		<ul
			tabindex="0"
			class="dropdown-content menu z-1 w-52 rounded-box border bg-base-100 p-2 shadow-sm"
		>
			<li><a>Item 1</a></li>
			<li><a>Item 2</a></li>
		</ul>
	</div>

	<div class="dropdown">
		<div tabindex="0" role="button" class="btn m-1 bg-base-200">Dropdown 2</div>
		<ul
			tabindex="0"
			class="dropdown-content menu z-1 w-52 rounded-box border bg-base-200 p-2 shadow-sm"
		>
			<li><a>Item 1</a></li>
			<li><a>Item 2</a></li>
		</ul>
	</div>

	<div class="dropdown">
		<div tabindex="0" role="button" class="btn m-1 bg-base-300">Dropdown 3</div>
		<ul
			tabindex="0"
			class="dropdown-content menu z-1 w-52 rounded-box border bg-base-300 p-2 shadow-sm"
		>
			<li><a>Item 1</a></li>
			<li><a>Item 2</a></li>
		</ul>
	</div>
</div>

<p>
	<input type="text" class="input" placeholder="input" />
</p>

<p>
	<input type="checkbox" checked class="toggle toggle-primary" />
	<input type="checkbox" checked class="toggle toggle-secondary" />
	<input type="checkbox" checked class="toggle toggle-accent" />
	<input type="checkbox" checked class="toggle toggle-neutral" />
	<input type="checkbox" checked class="toggle toggle-info" />
	<input type="checkbox" checked class="toggle toggle-success" />
	<input type="checkbox" checked class="toggle toggle-warning" />
	<input type="checkbox" checked class="toggle toggle-error" />
</p>

<p>
	<input type="radio" name="radio-1" class="radio" checked />
	<input type="radio" name="radio-1" class="radio" />
	<input type="radio" name="radio-4" class="radio radio-primary" checked />
	<input type="radio" name="radio-4" class="radio radio-primary" />
	<input type="radio" name="radio-5" class="radio radio-secondary" checked />
	<input type="radio" name="radio-5" class="radio radio-secondary" />
</p>

<style>
	p {
		padding: 1rem;
	}
</style>
