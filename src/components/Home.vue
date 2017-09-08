<template>
  <div>
    <span>
      <button @click="getCurrentLocation">get location</button>
      <h1>
        {{this.latitude}} , {{this.longitude}}
      </h1>
    </span>
    <google-map :longitude="longitude" :latitude="latitude"></google-map>
  </div>
</template>

<script>
import GoogleMap from './GoogleMap'
export default {
  name: 'Home',
  data() {
    return {
      longitude: "",
      latitude: ""
    }
  },
  components: {
    GoogleMap
  },
  methods: {
    getCurrentLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          [this.latitude, this.longitude] = [position.coords.latitude, position.coords.longitude];
        })
      }
    },
  }
}
</script>
