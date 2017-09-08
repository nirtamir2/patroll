<template>
  <div>
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
  }
}
</script>
