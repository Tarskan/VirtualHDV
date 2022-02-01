<template>
    <div class="flex flex-col">
        <div class="card-box">
            <div class="flex flex-row flex-wrap pl-4 pr-4 pt-5 pb-5">
                <form class="flex flex-grow">
                    <label for="search" class="mr-2 pt-2 ml-2 w-32">Recherche</label>

                    <input id="search" type="text" name="search" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                    <button class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Rechercher</button>
                </form>
                <div class="flex mt-3 md:mt-3 lg:mt-0 sm:m-auto">
                    <button class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Créé une annonce</button>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="card-box p-4">
                <div class="flex">
                    <ex-pagination
                        v-if="count > size"
                        class="mb-4"
                        :page="page"
                        :total="count"
                        :size="size"
                    />
                </div>
            </div>
            <div v-for="advert in adverts"
                :key="advert.id"> 
                <div class="card-box p-4 h-24 min-h-full">
                    <h2>{{advert.name}}</h2>
                    <p>{{advert.description}}</p>
                    <p class="text-right">Prix : {{advert.prix}}</p>
                </div>
            </div>
            <div class="card-box p-4">
                <div class="flex">
                    <ex-pagination
                        v-if="count > size"
                        class="mb-4"
                        :page="page"
                        :total="count"
                        :size="size"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        menuTogle: true,
        size: 10,
        count: 11,
        page: 1,
        adverts: undefined,
        user: {
            pseudo: 'Tarskan',
            adress: 'test',
            city: 'Wattignies',
            lastname: 'Six',
            firstname: 'Tristan',
            Autority: '',
            id_user: 1
        }
    }),
    fetch() {
        this.MyAnnounce()
    },
    methods: {
         async MyAnnounce(){
            const url = '/api/advert/search/'+ this.user.id_user
            this.adverts = await this.$axios.$get(url)
        }
    }
}
</script>

<style>

</style>