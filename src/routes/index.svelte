<script>
	import { goto } from '$app/navigation';
</script>

<main class="p-4 flex flex-col">
	<h1 class="text-3xl self-center font-bold my-16">Guess the year game</h1>
	<h2 class=" font-semibold mb-2">Instructions</h2>
	<p class="ml-4">
		Guess the year that the famous event happened. Answers range between 1900-2021.
	</p>

	<h2 class=" font-semibold mt-8 mb-2">Playing Time</h2>
	<p class="ml-4">1-2 minutes.</p>

	<button
		class=" font-semibold px-2 py-4 w-32 self-center mt-8 rounded-lg border-2 border-black"
		on:click={() => goto('/game')}>Start Game</button
	>
</main>
