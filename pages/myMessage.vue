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
            pseudo: 'Tarskan',
            adress: 'test',
            city: 'Wattignies',
            lastname: 'Six',
            firstname: 'Tristan',
            Autority: ''
        }
    }),
    methods: {
         
    }
}
</script>

<style>

</style>