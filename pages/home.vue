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
        <div v-if="countAdvert > size">
          <div class="flex">
            <ex-pagination
              v-if="countAdvert > size"
              class="mb-4"
              :page="pageAdvert"
              :total="countAdvert"
              :size="size"
              @page="(p) => pageAdvert = p"
            />
          </div>
        </div>
        <div v-if="adverts" class="m-2">
          <div v-for="advert in paginationAdvert"
                :key="advert.id_advert" class="card-box mb-4 pr-2 pl-2 pt-3 flex flex-col w-full">
            <nuxt-link :to="'/advert?query=' + advert.id_advert">
              <h2 class="text-center">{{advert.name}}</h2>
              <p class="max-w-md break-all">Description : {{advert.description}}</p>
              <p class="text-right">Prix : {{advert.prix}}<span>{{ currency}}</span></p>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="card-box w-full ml-3 mr-3">
        <h2 class="text-center">Mes Tchat:</h2>
        <div v-if="countTchat > size">
          <div class="flex">
            <ex-pagination
              v-if="countTchat > size"
              class="mb-4"
              :page="pageTchat"
              :total="countTchat"
              :size="size"
              @page="(p) => pageTchat = p"
            />
          </div>
        </div>
        <div v-if="myTchat" class="m-2">
          <div v-for="tchatByAdvert in paginationTchat"
              :key="tchatByAdvert.tchat.id_tchat">
            <nuxt-link :to="'/myMessage?query=' + tchatByAdvert.tchat.id_tchat + '&name=' + tchatByAdvert.vendor.pseudo">
              <div class="card-box mb-4 pr-2 pl-2 pt-3 pointer">
                <h2>{{ tchatByAdvert.advert.name }}</h2>
                <p class="break-all">Vendeur : {{ tchatByAdvert.vendor.pseudo }}</p>
                <p class="text-right">Prix : {{ tchatByAdvert.advert.prix }}</p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-stretch justify-between pl-4 pr-4 pt-5">
      <div class="card-box w-full ml-3 mr-3">
        <h1 class="text-center">Produit récemment vendu :</h1>
        <div v-if="solded" class="flex flex-col sm:flex-row justify-evenly">
          <div v-for="sold in solded"
              :key="sold.id_tchat">
              <div class="card-box p-4">
                <h2>{{ sold.name }}</h2>
                <p class="text-right">Prix : {{ sold.prix }}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    myTchat: undefined,
    solded: undefined,
    currency: '€',
    user: undefined,
    query: undefined,
    size: 4,
    previous: 0,
    countAdvert: undefined,
    countTchat: undefined,
    pageAdvert: 1,
    pageTchat: 1,
    adverts: undefined
  }),
  async fetch() {
    this.user = JSON.parse(localStorage.user)
    await this.MyAnnounce()
    await this.getMyTchat()
    await this.soldAnnounce()
  },
  computed: {
    paginationAdvert() {
      if(this.adverts) {
        return this.adverts.slice((this.pageAdvert-1)*this.size, this.pageAdvert*this.size)
      } else {
        return undefined
      }
    },
    paginationTchat() {
      if(this.myTchat) {
        return this.myTchat.slice((this.pageTchat-1)*this.size, this.pageTchat*this.size)
      } else {
        return undefined
      }
    }
  },
  methods: {
    async MyAnnounce(){
      this.adverts = (await axios.get('http://localhost:8081/api/advert/search/'+ this.user.id_user)).data
      this.countAdvert = this.adverts.length
    },
    goSearch() {
      this.$router.push({name:'search', query: {query: this.query}});
    },
    async soldAnnounce() {
      this.solded = (await axios.get('http://localhost:8081/api/advert/allsold')).data
    },
    async getMyTchat() {
      this.myTchat = (await axios.get('http://localhost:8081/api/tchat/' + this.user.id_user)).data
      this.countTchat = this.myTchat.length
    },
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