<template>
    <div class="flex flex-col">
        <div class="card-box">
            <div class="flex flex-row flex-wrap pl-4 pr-4 pt-5 pb-5">
                <form class="flex flex-grow">
                    <label for="search" class="mr-2 pt-2 ml-2 w-32">Recherche</label>

                    <input id="search" type="text" name="search" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
                    <button 
                        class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit" 
                        @click.prevent="showSuppres = true">
                            Rechercher
                    </button>
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
            <div v-if="count > size" class="card-box p-4">
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
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="CreateAdvert">
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
            pseudo: 'Tarskan',
            adress: 'test',
            city: 'Wattignies',
            lastname: 'Six',
            firstname: 'Tristan',
            Autority: '',
            id_user: 1
        },
        advertSent: {
            name: undefined,
            description: undefined,
            prix: undefined,
            id_adverttype: undefined,
            id_user: undefined
        },
        typeAdverts: undefined
    }),
    fetch() {
        this.MyAnnounce()
        this.getTypeAdvert()
        this.advertSent.id_user = this.user.id_user
    },
    methods: {
        async MyAnnounce(){
            const url = 'http://localhost:8081/api/advert/search/idUser/'+ this.user.id_user
            this.adverts = (await axios.get(url)).data
            this.count = this.adverts.length
        },
        async getTypeAdvert() {
            this.typeAdverts = (await axios.get('http://localhost:8081/api/advertType')).data
        },
        async CreateAdvert() {

        }
    }
}
</script>

<style>

</style>