<template>
    <!-- Column -->
    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

        <!-- Article -->
        <article class="overflow-hidden rounded-lg shadow-lg">

            <a href="#">
                <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black" href="#">
                        Article Title
                    </a>
                </h1>
                <p class="text-grey-darker text-sm">
                    11/1/19
                </p>
            </header>

            <div class="flex max-w-full p-2 md:p-4">
                <p class="text-base font-medium tracking-wide text-gray-600 mt-1">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                    dignissimos repudiandae. Consequuntur minus ipsam repudiandae soluta
                    qui, recusandae obcaecati molestias commodi magnam nisi illo illum
                    quaerat aut maiores! Esse, aperiam!
                </p>
            </div>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                <a class="flex items-center no-underline hover:underline text-black" href="#">
                    <img alt="Placeholder" class="block rounded-full" src="https://picsum.photos/32/32/?random">
                    <p class="ml-2 text-sm">
                        Author Name
                    </p>
                </a>
                <div class="flex">
                    <a class="no-underline text-grey-darker hover:text-red-dark w-10" href="#" title="Download">
                        <svg class="hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
                    </a>

                    <a class="no-underline text-grey-darker hover:text-red-dark w-10" href="#" title="Delete">
                        <svg class="hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
                    </a>

                    <a class="no-underline text-grey-darker hover:text-red-dark w-10" href="#" title="Replace">
                        <svg class="hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </a>
                </div>
            </footer>

        </article>
        <!-- END Article -->

    </div>
    <!-- END Column -->
</template>