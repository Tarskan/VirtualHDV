<template>
    <div class="card-box xl:h-full flex flex-col">
        <div v-if="advert" class="flex flex-row h-full">
            <div class="flex flex-col m-auto">
                <img class="mt-5 mb-5 rounded mx-auto" 
                :src="advert.url"
                alt="Photo de l'annonce" 
                width="384em" 
                height="512em">
                <span class="font-bold text-center">
                    Nom de l'annonce : {{ advert.name }}
                </span>
                <div class="m-5">
                    <span v-if="typeAdvertForThis" class="font-bold">
                        Type de l'annonce : {{ typeAdvertForThis.name }}
                    </span>
                    <div class="flex flex-col mb-5">
                        <span>Description :</span>
                        <span class="max-w-md break-all">{{ advert.description }}</span>
                        <span class="text-right">Prix : {{ advert.prix }} {{ currency }}</span>
                    </div>
                    <div v-if="mine" class="flex justify-evenly mb-4">
                        <button 
                            class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="button" 
                            @click="showModification = true">
                                Modifier l'annonce
                        </button>
                        <button 
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="button" 
                            @click="showSuppres = true">
                                Supprimer l'annonce
                        </button>
                    </div>
                    <div v-if="!sold && !mine" class="flex mb-4">
                        <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="button" 
                            @click="buy">
                                Acheter
                        </button>
                    </div>
                    <div v-if="vendor">
                        <span>Nous vous invitons a prendre contact avec le vendeur par mail : {{ vendor.email }} ou par le biais de la messagerie</span>
                    </div>
                    <div v-if="sold" class="flex mb-4">
                        <img class="mt-5 mb-5 rounded mx-auto" 
                        src="https://www.leemmo.net/i-vendu.png" 
                        alt="Photo de l'annonce" 
                        width="384em" 
                        height="512em">
                    </div>
                </div>
            </div>
        </div>
        <ex-modal v-if="showModification" :popup="true" :scroll="true" @close="showModification = false">
            <h3 class="text-blue mb-4 mt-0">
                Création d'annonce
            </h3>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Nom de l'annonce :
                </label>
                <input id="name" v-model="advert.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nom de l'annonce">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
                    Image de l'annonce :
                </label>
                <input 
                    id="image" 
                    ref="file"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="file"
                    placeholder="Nom de l'annonce">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="firstname">
                    Description :
                </label>
                <textarea id="firstname" v-model="advert.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Description"/>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
                    Prix : ({{ currency }})
                </label>
                <input id="lastname" v-model="advert.prix" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Prix">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="id_adverttype">
                    Type de produit :
                </label>
                <select 
                    id="id_adverttype" 
                    v-model="advert.id_adverttype" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    placeholder="Type de produit">
                    <option :value="null" selected="selected">Séléctionner un type de produit</option>
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
                <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="AdvertModification">
                    Modifier
                </button>
            </div>
        </ex-modal>
        <ex-modal v-if="showSuppres" :popup="true" :scroll="true" @close="showSuppres = false">
            <h3 class="text-blue mb-4 mt-0">
                Suppression de l'annonce
            </h3>
            <div class="mb-4">
                <p>Êtes vous absolument sur de vouloir supprimer votre annonce ?</p>
            </div>
            <div class="flex items-center justify-between">
                <button 
                    class="m-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    @click="AdvertSuppres">
                    Supprimer l'annonce
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
        advert: {
            id_advert: undefined,
            name: undefined,
            description: undefined,
            prix: undefined,
            url: undefined,
            id_adverttype: undefined,
            id_user: undefined,
            soldto: undefined,
        },
        typeAdverts: undefined,
        typeAdvertForThis: undefined,
        query: undefined,
        mine: undefined,
        showModification: false,
        showSuppres: false,
        currency: '€',
        image: undefined,
        sold: false,
        vendor: undefined
    }),
    fetch() {
        this.user = JSON.parse(localStorage.user)
        if(this.$route.query.query !== undefined) {
            this.query = this.$route.query.query
            this.Announce()
        } else {
            this.$router.push({name:'error404'}); 
        } 
    },
    methods: {
        async Announce(){
            this.advert = (await axios.get('http://localhost:8081/api/advert/index/' + this.query)).data
            this.getTypeAdvert()
            if(this.advert.id_user === this.user.id_user) {
                this.mine = true
            } else {
                this.mine = false
            }
            if(this.advert.soldto) {
                this.sold = true
            }
            if(this.sold && !this.mine) {
                this.vendor = (await axios.get('http://localhost:8081/api/user/' + this.advert.id_user)).data
            }
        },
        async getTypeAdvert() {
            this.typeAdverts = (await axios.get('http://localhost:8081/api/advertType')).data
            this.typeAdvertForThis = this.typeAdverts[this.advert.id_adverttype-1]
        },
        async AdvertModification() {
            this.image = this.$refs.file.files[0]
            if(this.image) {
                const formData = new FormData()
                formData.append("image", this.image)
                const imageUpload = await axios.post('https://api.imgbb.com/1/upload?key=0aeadb5d1eef28919bf2bb6590cb44e5',
                    formData)
                this.advert.url=imageUpload.data.data.display_url
            }
            await axios.put('http://localhost:8081/api/advert', this.advert)
            this.typeAdvertForThis = this.typeAdverts[this.advert.id_adverttype-1]
            this.showModification = false 
        },
        async AdvertSuppres() {
            await axios.delete('http://localhost:8081/api/advert/' + this.advert.id_advert)
            this.$router.push({name:'myAnnounce'});
        },
        async buy() {
            const buy = await axios.post('http://localhost:8081/api/advert/sold/' + this.advert.id_advert + '/to/' + this.user.id_user)
            if(buy.status === 200) {
                this.sold = true
            }
            if(this.sold && !this.mine) {
                this.vendor = (await axios.get('http://localhost:8081/api/user/' + this.advert.id_user)).data
                const tchat = {
                    id_userone: this.vendor.id_user,
                    id_usertwo: this.user.id_user,
                    id_advert: this.advert.id_advert
                }
                await axios.post('http://localhost:8081/api/tchat/', tchat)
            }
        }
    }
}
</script>

<style>

</style>