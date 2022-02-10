<template>
    <div class="flex flex-row h-full">
        <div class="card-box flex-grow">
            <h1 class="card-box">Discusion : </h1>
            <div v-if="conversation" class="flex overflow flex-col grow max-heigth">
                <div v-for="messageLine in conversation"
                :key="messageLine.id_message">
                    <div v-if="messageLine.id_user === user.id_user && messageLine.text" class="card-Discussion-first mr-2 ml-2">
                        <p class="text-right mr-2"> {{ messageLine.text }}</p>
                    </div>
                    <div v-else-if="messageLine.text" class="card-Discussion-second mr-2 ml-2">
                        <p class="text-left ml-2"> {{ messageLine.text }}</p>
                    </div>
                </div>
            </div>
            <div class="p-4 flex-grow">
                <form class="flex">
                    <input 
                        id="search" 
                        v-model="message"
                        type="text" 
                        name="search" 
                        class="shadow appearance-none border rounded w-full py-2 px-3 ml-2 leading-tight focus:outline-none focus:shadow-outline">
                            
                    <button 
                        class="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        @click="write">
                        Rechercher
                    </button>
                </form>
            </div>
        </div>
        <div class="card-box grow">
            <h1>Listes des contacts :</h1>
            <div v-for="tchatByAdvert in myTchat"
                :key="tchatByAdvert.tchat.id_tchat" 
                class="overflow max-heigth">
                <div class="card-box p-4 min-h-full pointer" @click="query = tchatByAdvert.tchat.id_tchat">
                    <h2>{{ tchatByAdvert.advert.name }}</h2>
                    <p class="break-all">Vendeur : {{ tchatByAdvert.vendor.pseudo }}</p>
                    <p class="text-right">Prix : {{ tchatByAdvert.advert.prix }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
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
        myTchat: undefined, 
        conversation: undefined,
        query: undefined,
        message: undefined
    }),
    async fetch() {
        this.user = JSON.parse(localStorage.user)
        await this.getMyTchat()
        if(this.$route.query.query > 0) {
            this.query = this.$route.query.query
            this.getMessageInTchat(this.query)
        } else if(this.myTchat.length > 0) {
            this.getMessageInTchat(this.myTchat[0].tchat.id_tchat)
        } 
    },
    watch: {
        query() {
            this.getMessageInTchat(this.query)
        }
    },
    methods: {
        async getMyTchat() {
            this.myTchat = (await axios.get('http://localhost:8081/api/tchat/' + this.user.id_user)).data
        },
        async getMessageInTchat(idTchat) {
           this.conversation = (await axios.get('http://localhost:8081/api/message/' + idTchat)).data 
        },
        async write() {
            if(this.message !== undefined && this.message !== "") {
                if(this.query !== undefined) {
                    const send = {
                        text: this.message,
                        id_user: this.user.id_user,
                        id_tchat: this.query 
                    }
                    await axios.post('http://localhost:8081/api/message', send)
                    this.getMessageInTchat(this.query)
                } else {
                    const send = {
                        text: this.message,
                        id_user: this.user.id_user,
                        id_tchat: this.myTchat[0].tchat.id_tchat 
                    }
                    await axios.post('http://localhost:8081/api/message', send)
                    this.getMessageInTchat(this.myTchat[0].tchat.id_tchat)
                }
                this.message = undefined
            }
        }
    }
}
</script>

<style lang="postcss">
.card-Discussion-first {
  box-shadow: 0 0 20px 0px #ddd;
  @apply rounded-md mb-6 bg-indigo-400;
}
.card-Discussion-second {
  box-shadow: 0 0 20px 0px #ddd;
  @apply rounded-md mb-6 bg-blue-400;
}
</style>

<style>
.max-heigth {
    max-height: 48rem;
}
.overflow {
    overflow: auto;
}

.pointer {
    cursor: pointer;
}
</style>