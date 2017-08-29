<template>
  <div>
    <button @click="getCurrentLocation">get location</button>
    <span>
      <h1>
        {{this.longitude}}, {{this.latitude}}
      </h1>
    </span>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      longitude: "",
      latitude: ""
    }
  },
  methods: {
    getCurrentLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          [this.latitude, this.longitude] = [position.coords.latitude, position.coords.longitude];
          console.log(position.coords.latitude, position.coords.longitude);
        }
        )
      }
    },
    watchCurrentLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition((position) => {
          [this.latitude, this.longitude] = [position.coords.latitude, position.coords.longitude];
          console.log(position.coords.latitude, position.coords.longitude);
        })
      }
    }
  }
}
</script>
