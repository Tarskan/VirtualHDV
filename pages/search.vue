<template>
    <div class="flex flex-col">
        <div class="card-box">
            <div class="flex pl-4 pr-4 pt-5 pb-5">
                <form class="flex">
                    <label for="search" class="mr-2 ml-2 w-24">Recherche :</label>

                    <input id="search" type="text" name="search" class="shadow appearance-none border rounded w-full py-2 px-3 ml-2 leading-tight focus:outline-none focus:shadow-outline">
                    <button class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Rechercher</button>
                </form>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="card-box p-4">
                <div class="flex pl-4 pr-4 pt-5 pb-5">
                    <p>pagination</p>
                </div>
            </div>
            <div class="card-box p-4 h-24 min-h-full">
                <div class="flex sm:flex-wrap pl-4 pr-4 pt-5 pb-5">
                    <p>liste de produit</p>
                </div>
            </div>
            <div class="card-box p-4">
                <div class="flex pl-4 pr-4 pt-5 pb-5">
                    <p>pagination</p>
                </div>
            </div>
        </div>
    </div>
</template>