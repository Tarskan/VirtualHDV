<template>
    <div class="flex flex-col">
        <div class="card-box">
            <div class="pl-4 pr-4 pt-5 pb-5">
                <form class="flex">
                    <label for="search" class="mr-2 pt-2 ml-2 w-28">Recherche</label>

                    <input id="search" v-model="searchQuery" type="text" name="search" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
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
                :key="advert.id_advert">
                <nuxt-link :to="'/advert?query=' + advert.id_advert">
                    <div class="card-box p-4 min-h-full">
                        <h2>{{advert.name}}</h2>
                        <img class="object-scale-down h-48 w-96 mt-5 mb-5 rounded mx-auto" 
                        :src="advert.url"
                        alt="Photo de l'annonce">
                        <p class="break-all">{{advert.description}}</p>
                        <p class="text-right">Prix : {{advert.prix}} {{currency}}</p>
                    </div>
                </nuxt-link>
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
            id_user: undefined,
            pseudo: undefined,
            adress: undefined,
            city: undefined,
            email: undefined,
            last_name: undefined,
            first_name: undefined,
            url: undefined
        },
        searchQuery: undefined,
        currency: '€',
    }),
    async fetch() {
        this.user = JSON.parse(localStorage.user)
        if(this.$route.query.query !== undefined) {
            this.searchQuery = this.$route.query.query
            await this.SearchAdvert()
        } else {
            await this.GetAdvert()
        }     
    },
    computed: {
        pagination() {
            if(this.adverts) {
                return this.adverts.slice((this.page-1)*this.size, this.page*this.size)
            } else {
                return undefined
            }
        }
    },
    watch: {
        searchQuery() {
            this.SearchAdvert()
        }
    },
    methods: {
        async GetAdvert() {
            this.adverts = (await axios.get(process.env.url + 'advert/' + this.user.id_user)).data
            this.count = this.adverts.length
        },
        async SearchAdvert() {
            if (this.searchQuery === undefined || this.searchQuery === "") {
                this.GetAdvert() 
            } else {
                const request = process.env.url + 'advert/search/name/' + this.searchQuery + '/without/' + this.user.id_user
                this.adverts = (await axios.get(request)).data
                this.count = this.adverts.length
            }
        }
    }
}
</script>

<style>

</style>