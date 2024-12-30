<script lang="ts">
	import { i18n } from "$lib/i18n";
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";
	import { ParaglideJS } from "@inlang/paraglide-sveltekit";
	import { ModeWatcher } from "mode-watcher";
	import "../app.css";

	let { data, children } = $props();
</script>

<QueryClientProvider client={data.queryClient}>
	<ParaglideJS {i18n}>
		<ModeWatcher />
		<main class="antialiased">
			{@render children?.()}
		</main>
		<SvelteQueryDevtools />
	</ParaglideJS>
</QueryClientProvider>
