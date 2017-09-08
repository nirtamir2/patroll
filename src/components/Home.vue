<template>
  <div>
    <google-map></google-map>
    <markerList></markerList>
  </div>
</template>

<script>
import GoogleMap from './GoogleMap'
import MarkerList from './MarkerList'
export default {
  name: 'Home',
  data() {
    return {
    }
  },
  components: {
    GoogleMap,
    MarkerList
  },
  methods: {
  }
}
</script>
