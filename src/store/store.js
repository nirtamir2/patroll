import Vue from 'vue'
import Vuex from 'vuex'
import locationService from './../services/location.service.js'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  markers: [],
  plcaeHistory: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  addMarker(state, marker) {
    state.markers = [...state.markers, marker];
  },
  removeMarker(state, marker) {
    state.markers = state.markers.filter(el => el != marker);
  },
  changeMarkerLocation(state, { oldLoc, newLoc }) {
    const index = state.markers.findIndex(m => (m.position === oldLoc))
    const newMarker = { ...state.markers[index], position: newLoc }
    Vue.set(state.markers, index, newMarker);
  },
  setWalked(state, marker) { 
    const index = state.markers.findIndex(m => (m === marker))
    const walkedMarker = { ...state.markers[index], isWalked: true }
    Vue.set(state.markers,index, walkedMarker);
  },
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  addMarker: ({ commit }, loc) => {
    const marker = { position: { lat: loc.latLng.lat(), lng: loc.latLng.lng() }, isWalked: false };
    commit('addMarker', marker)
  },
  removeMarker: ({ commit }, marker) => commit('removeMarker', marker),
  changeMarkerLocation: ({ commit }, payload) => {
    commit('changeMarkerLocation', payload)},
  markWalked: ({ commit, state }, loc) => {
    const notWalkedMarkers = [...state.markers.filter(marker => !marker.isWalked)]
    console.log(notWalkedMarkers);
for(let notWalkedMarker of notWalkedMarkers){
        const distance = locationService.getDistance(loc, notWalkedMarker.position)
      if (distance < 20) {
        console.log(distance);
        commit('setWalked', notWalkedMarker);
      }
    }
  },
}

// getters are functions
const getters = {
  walkedMarkers: state => state.markers.filter(marker => marker.isWalked),
  notWalkedMarkers: state => state.markers.filter(marker => !marker.isWalked),
  
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})