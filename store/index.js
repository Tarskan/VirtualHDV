export const state = () => ({
    user: null
})

export const mutations = {
    setUser(state, user) {
      state.user = { ...user }
    }
}

export const actions = {
    setUser({commit}, user) {
        try {
            commit('setUser', { ...user.data })
        } catch (e) {
            console.error('refresh user failed', e)
            throw e
        }
    }
}