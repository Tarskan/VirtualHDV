<template>
    <div class="flex flex-row h-full">
        <div class="card-box flex-grow">
            <h1>Messages echanger avec : </h1>
        </div>
        <div class="card-box grow">
            <h1>Listes des contacts</h1>
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
        }
    }),
    fetch() {
        this.user = JSON.parse(localStorage.user)
    },
    methods: {
         
    }
}
</script>

<style>

</style>