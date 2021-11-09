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
            name: 'Tarskan',
            Autority: ''
        }
    }),
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