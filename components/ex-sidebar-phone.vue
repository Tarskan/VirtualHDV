<template>
    <!-- phone menu -->
        <div class="bg-blue-800 text-blue-100 flex justify-between md:hidden">
            <h1 class="p-4">VIRTUAL HDV</h1>
            <button 
                class="p-4 focus:outline-none focus:bg-blue-700"
                @click="buttonInteraction"
            >
                Menu
            </button>
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