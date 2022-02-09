<template>
    <div class="flex flex-col">
        <div class="card-box">
            <div class="flex flex-row flex-wrap pl-4 pr-4 pt-5 pb-5">
                <form class="flex flex-grow">
                    <label for="search" class="mr-2 pt-2 ml-2 w-32">Recherche</label>

                    <input v-model="query" id="search" type="text" name="search" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                </form>
                <div class="flex mt-3 md:mt-3 lg:mt-0 sm:m-auto">
                    <button 
                        class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit" 
                        @click="showCreate = true">
                            Créé une annonce
                    </button>
                </div>
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
        <ex-modal v-if="showCreate" :popup="true" :scroll="true" @close="showCreate = false">
            <h3 class="text-blue mb-4 mt-0">
                Création d'annonce
            </h3>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Nom de l'annonce :
                </label>
                <input id="name" v-model="advertSent.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nom de l'annonce">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
                    Image de l'annonce :
                </label>
                <input 
                    id="image" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    ref="file"
                    type="file"
                    placeholder="Nom de l'annonce">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">
                    Description :
                </label>
                <textarea id="firstname" v-model="advertSent.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Description"/>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
                    Prix :
                </label>
                <input id="lastname" v-model="advertSent.prix" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Prix">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="id_adverttype">
                    Type de produit :
                </label>
                <select 
                    id="id_adverttype" 
                    v-model="advertSent.id_adverttype" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    placeholder="Type de produit">
                    <option value="">Séléctionner un type de produit</option>
                    <option
                        v-for="option in typeAdverts"
                        :key="option.id_adverttype"
                        :value="option.id_adverttype"
                        >
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="flex items-center justify-between">
                <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="CreateAdvert">
                    Créé une annonce
                </button>
            </div>
        </ex-modal>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        menuTogle: true,
        showCreate: false,
        size: 5,
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
        advertSent: {
            name: undefined,
            description: undefined,
            prix: undefined,
            id_adverttype: undefined,
            id_user: undefined,
            url: undefined
        },
        typeAdverts: undefined,
        query: undefined,
        currency: '€',
        image: undefined
    }),
    fetch() {
        this.user = JSON.parse(localStorage.user)
        this.MyAnnounce()
        this.getTypeAdvert()
        this.advertSent.id_user = this.user.id_user
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
        query() {
            this.SearchInMyAnnounce()
        }
    },
    methods: {
        async MyAnnounce(){
            this.adverts = (await axios.get('http://localhost:8081/api/advert/search/'+ this.user.id_user)).data
            this.count = this.adverts.length
        },
        async SearchInMyAnnounce() {
            if(this.query) {
                const url = 'http://localhost:8081/api/advert/search/'+ this.user.id_user +'/query/' + this.query
                this.adverts = (await axios.get(url)).data
                this.count = this.adverts.length  
            } else {
                this.MyAnnounce()
            }
        },
        async getTypeAdvert() {
            this.typeAdverts = (await axios.get('http://localhost:8081/api/advertType')).data
        },
        async CreateAdvert() {
            this.image = this.$refs.file.files[0]
            const formData = new FormData()
            formData.append("image", this.image)
            const imageUpload = await axios.post('https://api.imgbb.com/1/upload?key=0aeadb5d1eef28919bf2bb6590cb44e5',
                formData)
            this.advertSent.url=imageUpload.data.data.display_url
            this.advertSent.id_user = this.user.id_user
            await axios.post('http://localhost:8081/api/advert', this.advertSent)
            this.showCreate = false
            this.MyAnnounce() 
        }
    }
}
</script>

<style>

</style>