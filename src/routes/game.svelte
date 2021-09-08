<script>
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { goto } from '$app/navigation';
	import allQuestions from '$static/questions.js';

	const initialState = {
		state: 'guess',
		round: 0,
		lives: 100,
		questions: shuffle(allQuestions)
	};
	let { state, round, lives, questions } = initialState;
	let animatedLives = tweened(lives, {
		interpolate: (frm, to) => (t) => Math.floor(frm + (to - frm) * t)
	});
	let guess = 1950;
	let livesLost = 0;

	$: question = questions[round];

	let livesAnimationTimeout, nextButton;

	onMount(() => {
		enterState();
	});

	function correctGuess() {
		guess = Math.max(Math.min(guess, 2021), 1900);
	}

	function shuffle(array) {
		var currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	}

	function next() {
		if (state === 'guess') {
			state = 'review';
			enterState();
		} else if (state === 'review') {
			if (lives > 0) {
				state = 'guess';
				enterState();
				round++;
			} else {
				goto(`/gameover?score=${round.toString()}`);
			}
		}
	}

	function enterState() {
		switch (state) {
			case 'review':
				livesLost = Math.abs(guess - question.year);
				lives = Math.max(0, lives - livesLost);

				livesAnimationTimeout = setTimeout(() => {
					animatedLives.set(lives);
				}, 2500);

				break;
			case 'guess':
				clearTimeout(livesAnimationTimeout);
				break;
		}
	}
</script>

<main class=" flex flex-col px-4">
	<!-- Lives -->
	<div class="flex self-end">
		{#key round}
			<div
				class="flex items-center rounded-lg px-3 py-2 font-semibold bg-gray-200"
				in:scale={{ start: 1.5, opacity: 1 }}
			>
				Score <span class="font-bold ml-2">{round}</span>
			</div>
		{/key}

		<div
			class="flex items-center rounded-lg px-3 py-2 font-semibold bg-green-200 ml-4"
			in:scale={{ start: 1.5, opacity: 1 }}
		>
			Lives <span class="font-bold ml-2">{$animatedLives}</span>
		</div>
	</div>

	<!-- Question -->
	<div class="py-8 flex flex-col justify-center self-stretch" style="min-height: 14rem;">
		<h4 class="text-center mb-2 italic text-gray-500">In what year did the following happen?:</h4>

		<h1 class="text-center font-bold text-2xl italic">
			{question.question}
		</h1>
	</div>

	<!-- Answers -->
	<div class="flex items-center justify-center">
		<!-- Guess -->
		<div class="flex flex-col items-center border-2 border-black p-2 rounded-md">
			<label class=" text-base font-semibold" for="guess">Guess</label>
			<!-- <div class=" bg-gray-100 py-1 px-4 text-xl">1963</div> -->
			<input
				in:scale={{ start: 1.2, opacity: 1 }}
				type="number"
				pattern="[0-9]*"
				class="p-1 text-center w-20 text-xl bg-gray-200 rounded-lg"
				id="guess"
				autocomplete="off"
				placeholder="Year"
				bind:value={guess}
				on:blur={correctGuess}
				disabled={state !== 'guess'}
			/>
		</div>

		{#if state == 'review'}
			<!-- Correct Answer -->
			<div
				class="flex flex-col border-2 rounded-md border-green-700 p-2  items-center ml-2 "
				in:fly={{ delay: 500 }}
			>
				<label for="guess" class="text-base text-green-700 font-semibold">Answer</label>
				<span class="p-1 text-center rounded-lg  w-20 appearance-none text-xl bg-green-200">
					{question.year}
				</span>
			</div>
		{/if}
	</div>

	<!-- Slider or Guess Error -->

	<div class="flex flex-col justify-center h-24  my-4">
		{#if state == 'guess'}
			<div class="flex flex-col mx-4">
				<div class=" relative">
					<span class="absolute left-2 -top-1 text-sm  font-semibold">1900</span>
					<span class="absolute right-2 -top-1 text-sm  font-semibold">2021</span>
				</div>
				<div class="mt-8">
					<input class="w-full p-2 year" type="range" min="1900" max="2021" bind:value={guess} />
					<p class="italic text-xs text-gray-400 text-center mt-8">
						Drag the slider or type answer
					</p>
				</div>
			</div>
		{:else}
			<div class="flex flex-col items-center">
				<span class="text-xl font-semibold " in:fly={{ delay: 1500 }}
					>Margin of error: <span class=" bg-red-200 px-2 py-1 rounded-lg font-bold"
						>{livesLost}</span
					>
					years
				</span>
				<span class="mt-4 font-semibold text-sm" in:fly={{ delay: 2000 }}
					>Lives remaining:
					<span class="bg-green-200 rounded-lg px-2 py-1 font-bold">{$animatedLives}</span>
				</span>
			</div>
		{/if}
	</div>

	<!-- Confirm -->
	<button
		class=" font-semibold px-2 py-4 w-full self-center mt-4 rounded-lg border-2 border-black active:translate-y-1 transition-transform"
		on:click={next}
	>
		{#if state == 'guess'}
			Confirm
		{:else}
			Next
		{/if}
	</button>
</main>

<style>
	.year {
		display: block;
		-webkit-appearance: none;
		background-color: black;
		margin: 0 auto;
		outline: 0;
		padding: 0;
		height: 5px;
		/* margin: 0 auto; */
		width: 95%;
		border-radius: 30px;
	}

	.year::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: #fada61;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 2px solid black;
		cursor: pointer;
	}
</style>
