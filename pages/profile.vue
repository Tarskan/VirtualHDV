<template>
    <div class="card-box xl:h-full flex flex-col">
        <div class="text-center ml-5 mr-5 mb-5">
            <img class="mt-5 rounded mx-auto" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="Photo de profile" width="384em" height="512em">
            <span class="font-bold">
                Pseudo : {{ user.pseudo }}
            </span>
        </div>
        <div class="text-center">
            <h1 class="text-center font-bold">Information personnel :</h1>
            <div class="flex flex-col mb-5">
                <span>Nom complet : {{ user.firstname }} {{ user.lastname }}</span>
                <span>Adresse : {{ user.adress }}</span>
                <span>Ville : {{ user.city }}</span>
            </div>
            <div class="mb-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="show = true">Modifier le compte</button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Supprimer le compte</button>
            </div>
        </div>
        <ex-modal v-if="show" :popup="true" :scroll="true" @close="show = false">
            <h-3 class="text-blue mb-4 mt-0">
                Formulaire de modification de profile
            </h-3>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Identifiant :
                </label>
                <input id="username" v-model="user.pseudo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Identifiant">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Prénom :
                </label>
                <input id="username" v-model="user.firstname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Identifiant">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Nom :
                </label>
                <input id="username" v-model="user.lastname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Identifiant">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Adresse :
                </label>
                <input id="username" v-model="user.adress" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Identifiant">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    ville : 
                </label>
                <input id="username" v-model="user.city" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Identifiant">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Mot de passe :
                </label>
                <input id="password" v-model="user.password" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************">
                <p class="text-red-500 text-xs italic">Choisisez un mot de passe</p>
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="Connexion">
                    Modifier
                </button>
            </div>
        </ex-modal>
    </div>
</template>

<script>
export default {
    data: () => ({
        menuTogle: true,
        show: false,
        user: {
            pseudo: 'Tarskan',
            adress: 'test',
            city: 'Wattignies',
            lastname: 'Six',
            firstname: 'Tristan',
            Autority: ''
        }
    }),
    methods: {
       async modifDataUser(){
        //    const test = await this.$axios.$get('/api/connexion', 
        //     { 
        //         pseudo: this.connexion.pseudo, 
        //         password: this.connexion.password
        //     })
       }  
    }
}
</script>

<style>

</style>