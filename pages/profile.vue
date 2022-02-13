<template>
    <div class="flex flex-col">
        <div class="card-box xl:h-full flex flex-col">
            <div class="text-center ml-5 mr-5 mb-5">
                <img class="mt-5 rounded mx-auto" :src="user.url" alt="Photo de profile" width="384em" height="512em">
                <span class="font-bold">
                    Pseudo : {{ user.pseudo }}
                </span>
            </div>
            <div class="text-center">
                <h1 class="text-center font-bold">Information personnel :</h1>
                <div class="flex flex-col mb-5">
                    <span>Nom complet : {{ user.first_name }} {{ user.last_name }}</span>
                    <span>Adresse : {{ user.adress }}</span>
                    <span>Ville : {{ user.city }}</span>
                    <span>Email : {{ user.email }}</span>
                </div>
                <div class="mb-4">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="showModification = true">Modifier le compte</button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="showSuppres = true">Supprimer le compte</button>
                </div>
            </div>
            <ex-modal v-if="showModification" :popup="true" :scroll="true" @close="showModification = false">
                <h3 class="text-blue mb-4 mt-0">
                    Formulaire de modification de profile
                </h3>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Identifiant :
                    </label>
                    <input id="username" v-model="user.pseudo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Identifiant">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
                        Image de l'utilsateur :
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
                        Prénom :
                    </label>
                    <input id="firstname" v-model="user.first_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Votre prénom">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
                        Nom :
                    </label>
                    <input id="lastname" v-model="user.last_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Votre nom">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="adress">
                        Adresse :
                    </label>
                    <input id="adress" v-model="user.adress" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Votre adresse">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
                        ville : 
                    </label>
                    <input id="city" v-model="user.city" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Votre ville">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email : 
                    </label>
                    <input id="email" v-model="user.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Votre email">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Mot de passe :
                    </label>
                    <input id="password" v-model="user.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************">
                </div>
                <div class="flex items-center justify-between">
                    <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="modifDataUser">
                        Modifier
                    </button>
                </div>
            </ex-modal>
            <ex-modal v-if="showSuppres" :popup="true" :scroll="true" @close="showSuppres = false">
                <h3 class="text-blue mb-4 mt-0">
                    Suppression du profile
                </h3>
                <div class="mb-4">
                    <p>Êtes vous absolument sur de vouloir supprimer votre compte ?</p>
                    <p>Cela supprimera également vos annonces.</p>
                </div>
                <div class="flex items-center justify-between">
                    <button 
                        class="m-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        @click="Suppress">
                        Supprimer le compte
                    </button>
                </div>
            </ex-modal>
        </div>
        <div class="flex flex-row justify-evenly card-box pt-3 pb-3">
            <div>
                <nuxt-link to="/myAnnounce">
                    <folder-icon size="3x" class="m-auto"></folder-icon>
                    <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Mes annonces
                    </button>
                </nuxt-link>
            </div>
            <div>
                <nuxt-link to="/myBoughtAndSell">
                    <shopping-bag-icon size="3x" class="m-auto"></shopping-bag-icon>
                    <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Mes achats/ventes
                    </button>
                </nuxt-link>
            </div>
            <div>
                <nuxt-link to="/myMessage">
                    <message-square-icon size="3x" class="m-auto"></message-square-icon>
                    <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Mes message
                    </button>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { MessageSquareIcon, ShoppingBagIcon ,FolderIcon } from 'vue-feather-icons'

export default {
    components: {
        MessageSquareIcon,
        ShoppingBagIcon,
        FolderIcon
    },
    data: () => ({
        menuTogle: true,
        showModification: false,
        showSuppres: false,
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
        image: undefined
    }),
    fetch() {
        this.user = JSON.parse(localStorage.user)
    },
    methods: {
       async modifDataUser() {
            this.image = this.$refs.file.files[0]
            if(this.image) {
                const formData = new FormData()
                formData.append("image", this.image)
                const imageUpload = await axios.post('https://api.imgbb.com/1/upload?key=' + process.env.apiKey,
                    formData)
                this.user.url=imageUpload.data.data.display_url
            }
            const modifDataUser = await axios.put(process.env.url + 'user', 
              this.user)
            localStorage.setItem('user', JSON.stringify(modifDataUser.data));
            this.showModification = false
       },
       async Suppress() {
            try {
                const suppresion = await axios.delete(process.env.url + 'user/' + this.user.id_user)
                if(suppresion.status === 200) {
                    localStorage.setItem('user', "");
                    this.$router.push({name:'index'}); 
                }
            } catch (error) {
                console.log(error)
            }

       } 
    }
}
</script>

<style>

</style>