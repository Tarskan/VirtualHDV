<template>
    <div class="bg-blue-800 text-blue-100 flex-col bg-blue-800 space-y-6 py-7 absolute inset-y-0 
        left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out w-32 md:w-64">
        <div class="text-center mb-5">
            <img class="w-32 h-32 rounded-full mx-auto" :src="user.url" alt="Photo de profile" width="384em" height="512em">
            <NuxtLink to="/profile">
                <span class="font-bold">
                    {{ user.pseudo }}
                </span>
            </NuxtLink>
        </div>
        <nav v-if="user.Autority === 'Admin'" class="px-5 font-bold">
            <ul class="mb-2">
                <NuxtLink to="/home">
                    <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                        Accueil
                    </li>
                    <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                        Accueil
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <NuxtLink to="/search">
                    <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                        Recherche
                    </li>
                    <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                        Recherche
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <NuxtLink to="/search">
                    <li class="block hover:bg-blue-700 transition duration-200">
                        Administration
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <NuxtLink to="/profile">
                    <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                        Mon profile
                    </li>
                    <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                        Mon profile
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <NuxtLink to="/">
                    <li class="block hover:bg-blue-700 transition duration-200">
                        Déconnexion
                    </li>
                </NuxtLink>
            </ul>
        </nav>
        <nav v-else class="px-5 font-bold">
            <ul class="mb-2">
                <NuxtLink to="/home">
                    <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                        Accueil
                    </li>
                    <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                        Accueil
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <NuxtLink to="/profile">
                    <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                        Mon profile
                    </li>
                    <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                        Mon profile
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <NuxtLink to="/search">
                    <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                        Recherche
                    </li>
                    <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                        Recherche
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <NuxtLink to="/myAnnounce">
                    <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                        Mes annonces
                    </li>
                    <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                        Mes annonces
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <NuxtLink to="/myBoughtAndSell">
                    <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                        Mes achats/ventes
                    </li>
                    <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                        Mes achats/ventes
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <NuxtLink to="/myMessage">
                    <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                        Mes messages
                    </li>
                    <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                        Mes messages
                    </li>
                </NuxtLink>
            </ul>
            <ul class="mb-2">
                <li class="block hover:bg-blue-700 transition duration-200" @click="deconnexion">
                    Déconnexion
                </li>
            </ul>
        </nav>
        <div class="absolute pb-2 bottom-0 left-0 text-center inset-x-0">
            Condition général
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        menuTogle: true,
        user: undefined
    }),
    fetch() {
        this.user = JSON.parse(localStorage.user)
    },
    methods: {
        buttonInteraction(){
            if(this.menuTogle === true){
                this.menuTogle = false
            } else {
                this.menuTogle = true
            }
        },
        deconnexion() {
            this.user = undefined
            localStorage.removeItem('user');
            this.$router.push({name:'index'});
        }
    }
}
</script>

<style>

</style>