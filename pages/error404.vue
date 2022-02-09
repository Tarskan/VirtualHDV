<template>
    <div class="card-box xl:h-full flex flex-col">
        <div class="flex flex-row h-full">
            <div>
                Page non trouvé c'est vraiment bizzare !
            </div>
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
        advert: {
            name: undefined,

        },
        typeAdverts: undefined,
        query: undefined,
        mine: undefined
    }),
    fetch() {
        this.user = JSON.parse(localStorage.user)
        if(this.$route.query.query === undefined) {
            this.$router.push({name:'error404'}); 
        } else {
            this.query = this.$route.query.query
            this.Announce()
            if(this.advert.id_user === this.user.id_user) {
                this.mine = true
            }
        } 
    },
}
</script>

<style>

</style>