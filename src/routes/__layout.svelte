<script>
	import '../app.postcss';
</script>

<svelte:head>
	<title>Guess the Year game</title>
	<script
		defer
		data-domain="guess-the-year.alexcretu.com"
		src="https://plausible.io/js/plausible.js"></script>
</svelte:head>

<div
	class=" container max-w-sm border-gray-100 mx-auto box-border sm:mt-16 shadow-xl px-4 py-8 rounded-lg"
>
	<slot />
</div>
