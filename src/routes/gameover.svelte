<script>
	import { scale } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let score = atob($page.query.get('score'));
</script>

<main class=" flex flex-col px-4">
	<div class="py-8 flex flex-col justify-center self-stretch">
		<h1 class="text-center font-bold text-2xl italic">Game Over</h1>
	</div>

	<!-- Answers -->
	<div class="flex items-center justify-center">
		<!-- Guess -->
		<div class="flex flex-col items-center border-2 border-black p-2 rounded-md">
			<label class=" text-base font-semibold" for="guess">Score</label>
			<!-- <div class=" bg-gray-100 py-1 px-4 text-xl">1963</div> -->
			<input
				in:scale={{ start: 1.2, opacity: 1 }}
				type="number"
				pattern="[0-9]*"
				class="p-1 text-center w-20 text-xl bg-gray-200"
				id="guess"
				autocomplete="off"
				placeholder="Year"
				disabled={true}
				value={score}
			/>
		</div>
	</div>

	<!-- Confirm -->
	<button
		class=" font-semibold px-2 py-4 w-full self-center mt-8 rounded-lg border-2 border-black active:translate-y-1 transition-transform"
		on:click={() => goto('/game')}
	>
		New Game
	</button>
</main>
