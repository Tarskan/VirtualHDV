<template>
  <div class="card-box">
    <div class="flex pl-4 pt-5">
      <label for="search">Recherche :</label>

      <input id="search" type="text" name="search" required
         size="10">
    </div>
    <div class="flex md:flex-row flex-col items-stretch justify-between pl-4 pr-4 pt-5">
      <div class="card-box w-full ml-3 mr-3">
        <h2 class="text-center">Mes annonces :</h2>
      </div>
      <div class="card-box w-full ml-3 mr-3">
        <h2 class="text-center">Mes messages :</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss">
.card-box {
  background-color: #fff;
  box-shadow: 0 0 20px 0px #ddd;
  @apply rounded-md mb-6;
}
</style>