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
        <div class="mb-5">
            <div v-if="mode === 'bought'">
                <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="mode = 'sold'">
                    Mes achats
                </button>
            </div>
            <div v-else>
                <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="mode = 'bought'">
                    Mes ventes
                </button>
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
        mode: 'bought'
    }),
    async fetch() {
        this.user = JSON.parse(localStorage.user)
        await this.GetBoughtAdvert() 
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
        mode() {
            if(this.mode === 'bought') {
                this.SearchBoughtAdvert()
            } else {
                this.SearchSelltAdvert()
            }
                
        },
        searchQuery() {
            if(this.mode === 'bought') {
                if(this.searchQuery === undefined || this.searchQuery === "") {
                    this.GetBoughtAdvert()
                } else {
                    this.SearchBoughtAdvert()
                } 
            } else if(this.mode === 'sold') {
                if(this.searchQuery === undefined || this.searchQuery === "") {
                    this.GetSoldAdvert()
                } else {
                    this.SearchSelltAdvert()
                } 
            }
                
        }
    },
    methods: {
        async GetBoughtAdvert() {
            this.adverts = (await axios.get(process.env.url + 'advert/bought/' + this.user.id_user)).data
            this.count = this.adverts.length
        },
        async GetSoldAdvert() {
            this.adverts = (await axios.get(process.env.url + 'advert/sold/' + this.user.id_user)).data
            this.count = this.adverts.length
        },
        async SearchBoughtAdvert() {
            if (this.searchQuery === undefined || this.searchQuery === "") {
                this.GetBoughtAdvert() 
            } else {
                this.adverts = (await axios.get(process.env.url + 'advert/bought/'+ this.user.id_user + '/query/' + this.searchQuery)).data
                this.count = this.adverts.length
            }
        },
        async SearchSelltAdvert() {
            if (this.searchQuery === undefined || this.searchQuery === "") {
                this.GetSoldAdvert()
            } else {
                this.adverts = (await axios.get(process.env.url + 'advert/sold/' + this.user.id_user + '/query/' + this.searchQuery)).data
                this.count = this.adverts.length
            }
        }
    }
}
</script>

<style>

</style>