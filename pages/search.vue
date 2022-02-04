<template>
    <div class="flex flex-col">
        <div class="card-box">
            <div class="pl-4 pr-4 pt-5 pb-5">
                <form class="flex">
                    <label for="search" class="mr-2 pt-2 ml-2 w-28">Recherche</label>

                    <input id="search" v-model="searchQuery" type="text" name="search" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                    <button class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" @click.prevent="SearchAdvert">Rechercher</button>
                </form>
            </div>
        </div>
        <div class="flex flex-col">
            <div v-if="count > size" class="card-box p-4">
                <div class="flex">
                    <ex-pagination
                        v-if="count > size"
                        class="mb-4"
                        :page="page"
                        :total="count"
                        :size="size"
                        @page="(p) => page = p"
                    />
                </div>
            </div>
            <div v-for="advert in pagination"
                :key="advert.id"> 
                <div class="card-box p-4 h-24 min-h-full">
                    <h2>{{advert.name}}</h2>
                    <p>{{advert.description}}</p>
                    <p class="text-right">Prix : {{advert.prix}}</p>
                </div>
            </div>
            <div v-if="count > size" class="card-box p-4">
                <div class="flex">
                    <ex-pagination
                        v-if="count > size"
                        class="mb-4"
                        :page="page"
                        :total="count"
                        :size="size"
                        @page="(p) => page = p"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        menuTogle: true,
        size: 5,
        previous: 0,
        count: undefined,
        page: 1,
        adverts: undefined,
        user: {
            pseudo: 'Tarskan',
            adress: 'test',
            city: 'Wattignies',
            lastname: 'Six',
            firstname: 'Tristan',
            Autority: ''
        },
        searchQuery: undefined
    }),
    computed: {
        pagination() {
            if(this.adverts) {
                return this.adverts.slice((this.page-1)*this.size, this.page*this.size)
            } else {
                return undefined
            }
        }
    },
    async fetch() {
        if(this.$route.query.query !==undefined) {
            this.searchQuery = this.$route.query.query
            await this.SearchAdvert()
        } else {
            await this.GetAdvert()
        }     
    },
    methods: {
        async GetAdvert() {
            this.adverts = (await axios.get('http://localhost:8081/api/advert')).data
            this.count = this.adverts.length
        },
        async SearchAdvert() {
            if (this.searchQuery === undefined || this.searchQuery === "") {
                this.GetAdvert() 
            } else {
                const request = 'http://localhost:8081/api/advert/search/name/' + this.searchQuery
                this.adverts = (await axios.get(request)).data
                this.count = this.adverts.length
            }
        }
    }
}
</script>

<style>

</style>