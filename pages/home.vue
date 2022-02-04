<template>
  <div class="card-box">
    <div class="pl-4 pr-4 pt-5 pb-5">
      <form class="flex">
        <label for="search" class="mr-2 pt-2 ml-2 w-28">Recherche :</label>

        <input v-model="query" id="search" type="text" name="search" class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
        <button class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" @click.prevent="goSearch">Rechercher</button>
      </form>
    </div>
    <div class="flex md:flex-row flex-col items-stretch justify-between pl-4 pr-4 pt-5">
      <div class="card-box w-full ml-3 mr-3">
        <h2 class="text-center">Mes annonces :</h2>
        <div v-if="count > size">
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
        <div v-if="adverts" class="m-2">
          <div v-for="advert in adverts"
                :key="advert.id" class="card-box mb-4 pr-2 pl-2 pt-3 flex flex-col w-full">
            <h2 class="text-center">{{advert.name}}</h2>
            <p>Description : {{advert.description}}</p>
            <p class="text-right">Prix : {{advert.prix}}<span>{{ currency}}</span></p>
          </div>
        </div>
      </div>
      <div class="card-box w-full ml-3 mr-3">
        <h2 class="text-center">Mes messages :</h2>
        <div v-if="messages.length > 0">
          <div v-for="message in messages" :key="message.from" class="mb-4 w-full">
            <span class="ml-3">De : {{ message.from }}</span>
            <p class="ml-3">{{ message.text }}</p> 
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-stretch justify-between pl-4 pr-4 pt-5">
      <div class="card-box w-full ml-3 mr-3">
        <h1 class="text-center">Produit star</h1>
        <div v-if="offers.length > 0" class="flex flex-col sm:flex-row">
          <div v-for="offer in offers.slice(0, 5)" :key="offer.name" class="mb-4 flex flex-col w-full">
            <span class="ml-3">{{ offer.name }}</span>
            <span class="ml-3">Vendeur : {{ offer.from }}</span>
            <p class="ml-3">{{ offer.price }} <span>{{ offer.currency}}</span></p> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    messages: [
      {from: 'toto', text: 'Super produit merci !'},
      {from: 'tata', text: 'Produit reçue merci !'},
      {from: 'titi', text: 'Produit reçue merci !'}
    ],
    offers: [
      {from: 'toto', name:'Gandalf figurine', price: 24, currency: '€'},
      {from: 'tata', name:'Manuel donjon et dragon', price: 34, currency: '€'},
      {from: 'titi', name:'set de dés', price: 12, currency: '€'},
      {from: 'toto', name:'Sauron figurine', price: 78, currency: '€'},
      {from: 'tata', name:'Manuel donjon et dragon pathfinder', price: 54, currency: '€'},
      {from: 'titi', name:'masque freddy kruegger', price: 21, currency: '€'}
    ],
    currency: '€',
    user: {
      pseudo: 'Tarskan',
      adress: 'test',
      city: 'Wattignies',
      lastname: 'Six',
      firstname: 'Tristan',
      Autority: '',
      id_user: 1
    },
    query: undefined,
    size: 5,
    previous: 0,
    count: undefined,
    page: 1,
    adverts: undefined
  }),
  fetch() {
    this.MyAnnounce()
  },
  methods: {
    async MyAnnounce(){
      const url = '/api/advert/search/idUser/'+ this.user.id_user
      this.adverts = await this.$axios.$get(url)
      this.count = this.adverts.length
    },
    goSearch() {
      this.$router.push({name:'search', query: {query: this.query}}); 
      // this.$router.push('/home' , {query: this.query, search: this.query})
      // this.$route.fullPath = '/search?query=' + this.query
    }
  }
}
</script>

<style lang="postcss">
.card-box {
  background-color: #fff;
  box-shadow: 0 0 20px 0px #ddd;
  @apply rounded-md mb-6;
}
</style>