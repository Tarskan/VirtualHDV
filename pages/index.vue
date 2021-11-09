<template>
  <div>
    <div class="md:w-1/2 max-w-xs md:m-auto absolute md:inset-60">
      <form class="bg-white shadow-md rounded px-7 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Identifiant
          </label>
          <input id="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Identifiant">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Mot de passe
          </label>
          <input id="password" class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************">
          <p class="text-red-500 text-xs italic">Choisisez un mot de passe</p>
        </div>
        <div class="flex items-center justify-between">
          <NuxtLink to="/home">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Connexion
            </button>
          </NuxtLink>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Mot de passe oubliée ?
          </a>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        2021 Virtual HDV. Tout droit réservée.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'opening'
}
</script>

<style lang="postcss">

</style>