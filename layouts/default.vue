<template>
    <div class="relative min-h-screen md:flex">
        <ex-sidebar/>
        <ex-sidebar-phone/>
        <div class="flex-1 main p-5">
            <nuxt />
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        user: undefined
    }),
    fetch() {
        if(localStorage.user) {
            this.user = JSON.parse(localStorage.user)
        } else {
            this.$router.push({name:'index'});
        }
    }
}
</script>

<style scoped>

</style>