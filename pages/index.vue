<template>
  <div>
    <div class="md:w-1/2 max-w-sm md:m-auto absolute md:inset-60">
      <form class="bg-white shadow-md rounded mt-12 md:mt-0 px-7 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Identifiant
          </label>
          <input id="username" v-model="connexion.pseudo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Identifiant">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Mot de passe
          </label>
          <input id="password" 
            v-model="connexion.password" 
            :class="(wrong ? 'border-red-500' : '') + 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'" 
            type="password" 
            placeholder="******************">
          <p v-if="wrong" class="text-red-500 text-xs italic">Le mot de passe ou l'identifiant est faux !</p>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="Connexion">
            Connexion
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-2" href="#">
            Mot de passe oubliée ?
          </a>
        </div>
        <div class="flex items-center justify-between mt-3">
          <button class=" m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="toggleCreation = true">
            Créé un compte
          </button>
        </div>
      </form>
      <ex-modal v-if="toggleCreation" :popup="true" :scroll="true" @close="toggleCreation = false">
        <h3 class="text-blue mb-4 mt-0">
          Formulaire de création de profile
        </h3>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Identifiant :
          </label>
          <input id="username" 
            v-model="newUser.pseudo" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Identifiant">
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
          <input id="firstname" 
            v-model="newUser.first_name" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Prénom de l'utilisateur">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="lastname">
            Nom :
          </label>
          <input id="lastname" 
            v-model="newUser.last_name" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Nom de l'utilisateur">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="adress">
            Adresse :
          </label>
          <input id="adress" 
            v-model="newUser.adress" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Adresse de l'utilisateur">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="city">
            ville : 
          </label>
          <input id="city" 
            v-model="newUser.city" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type="text" 
            placeholder="Ville de l'utilisateur">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email : 
          </label>
          <input id="email" v-model="newUser.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Votre email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Mot de passe :
          </label>
          <input id="password" 
            v-model="newUser.password" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            type="password" 
            placeholder="******************">
        </div>
        <div class="flex items-center justify-between">
          <button class="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="Creation">
            Créé
          </button>
        </div>
      </ex-modal>
      <p class="text-center text-gray-500 text-xs">
        2021 Virtual HDV. Tout droit réservée.
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'opening',
  data: () => ({
        menuTogle: true,
        toggleCreation: false,
        wrong: false,
        connexion: {
            pseudo: undefined,
            password: undefined
        },
        newUser: {
            pseudo: undefined,
            adress: undefined,
            city: undefined,
            email: undefined,
            last_name: undefined,
            first_name: undefined,
            url: undefined
        },
        image:undefined
    }),
    methods: {
      async Connexion() {
        try {
          const connexion = await axios.post('http://localhost:8081/api/connexion', 
            this.connexion)
          localStorage.setItem('user', JSON.stringify(connexion.data));
          if(connexion.status === 200) {
            this.$router.push({name:'home'}); 
          }
        } catch (error) {
          this.wrong = true
        }
      },
      async Creation() {
        try {
          this.image = this.$refs.file.files[0]
          const formData = new FormData()
          formData.append("image", this.image)
          const imageUpload = await axios.post('https://api.imgbb.com/1/upload?key=0aeadb5d1eef28919bf2bb6590cb44e5',
            formData)
          this.newUser.url=imageUpload.data.data.display_url
          const creation = await axios.post('http://localhost:8081/api/user', 
            this.newUser)
          localStorage.setItem('user', JSON.stringify(creation.data));
          if(creation.status === 200) {
            this.$router.push({name:'home'}); 
          }
        } catch (error) {
          this.wrong = true
        }
      }
    }
}
</script>

<style lang="postcss">

</style>