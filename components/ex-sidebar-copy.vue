<template>
    <div class="bg-blue-800 text-blue-100">
        <!-- big device menu -->
        <div
            class="flex-col h-screen bg-blue-800 space-y-6 py-7 absolute inset-y-0 
            left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out"
            :class="{ '-translate-x-full': menuTogle}" 
        >
            <div class="w-32 md:w-64">
                <div class="text-center mb-5">
                    <img class="w-32 h-32 rounded-full mx-auto" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="Photo de profile" width="384em" height="512em">
                    <NuxtLink to="/profile">
                        <span class="font-bold">
                            {{ user.name }}
                        </span>
                    </NuxtLink>
                </div>
                <nav v-if="user.Autority === 'Admin'" class="px-5 font-bold">
                    <ul class="mb-2">
                        <NuxtLink to="/home">
                            <li class="block hover:bg-blue-700 transition duration-200">
                                Accueil
                            </li>
                        </NuxtLink>
                    </ul>
                    <ul class="mb-2">
                        <NuxtLink to="/search">
                            <li class="block hover:bg-blue-700 transition duration-200">
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
                            <li class="block hover:bg-blue-700 transition duration-200">
                                Profile
                            </li>
                        </NuxtLink>
                    </ul>
                    <ul class="mb-2">
                        <li class="block hover:bg-blue-700 transition duration-200">
                            Déconnexion
                        </li>
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
                        <NuxtLink to="/myannounce">
                            <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                                Mes annonces
                            </li>
                            <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                                Mes annonces
                            </li>
                        </NuxtLink>
                    </ul>
                    <ul class="mb-2">
                        <NuxtLink to="/myannounce">
                            <li v-if="menuTogle" class="block hover:bg-blue-700 transition duration-200">
                                Contact
                            </li>
                            <li v-else class="block hover:bg-blue-700 transition duration-200" @click="buttonInteraction">
                                Contact
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
                <div class="absolute pb-2 bottom-0 left-0 text-center inset-x-0">
                    Condition général
                </div>
            </div>
        </div>
        <!-- phone menu -->
        <div class="flex justify-between md:hidden">
            <h1 class="p-4">VIRTUAL HDV</h1>
            <button 
                class="p-4 focus:outline-none focus:bg-blue-700"
                @click="buttonInteraction"
            >
                Menu
            </button>
        </div>
    </div>
</template>

<script>
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
        }
    }
}
</script>

<style>

</style>