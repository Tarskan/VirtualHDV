<template>
    <div class="card-box flex flex-col">
        <div class="text-center ml-5 mr-5 mb-5">
            <img class="mt-5 rounded mx-auto" src="https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" alt="Photo de profile" width="384em" height="512em">
            <span class="font-bold">
                {{ user.pseudo }}
            </span>
        </div>
        <div class="m-auto">
            <h3 class="text-center">Information personnel :</h3>
            <div class="flex flex-col mb-5">
                <span>Nom complet : {{ user.firstname }} {{ user.lastname }}</span>
                <span>Adresse : {{ user.adress }}</span>
                <span>Ville : {{ user.city }}</span>
            </div>
            <div class="mb-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Modifier le compte</button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Supprimer le compte</button>
            </div>
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