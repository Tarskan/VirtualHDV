<template>
  <div class="card-box">
    <div class="flex pl-4 pr-4 pt-5">
      <form class="flex">
        <label for="search" class="mr-2 ml-2 w-24">Recherche :</label>

        <input id="search" type="text" name="search" class="shadow appearance-none border rounded w-full py-2 px-3 ml-2 leading-tight focus:outline-none focus:shadow-outline">
        <button class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Rechercher</button>
      </form>
    </div>
    <div class="flex md:flex-row flex-col items-stretch justify-between pl-4 pr-4 pt-5">
      <div class="card-box w-full ml-3 mr-3">
        <h2 class="text-center">Mes annonces :</h2>
        <div v-if="offers.length > 0">
          <div v-for="offer in offers" :key="offer.from" class="mb-4 flex flex-col w-full">
            <span class="ml-3">{{ offer.name }}</span>
            <span class="ml-3">Vendeur : {{ offer.from }}</span>
            <p class="ml-3">{{ offer.price }} <span>{{ offer.currency}}</span></p> 
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
        <div class="flex flex-col sm:flex-row" v-if="offers.length > 0">
          <div v-for="offer in offers.slice(0, 5)" :key="offer.from" class="mb-4 flex flex-col w-full">
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
  })
}
</script>

<style lang="postcss">
.card-box {
  background-color: #fff;
  box-shadow: 0 0 20px 0px #ddd;
  @apply rounded-md mb-6;
}
</style>