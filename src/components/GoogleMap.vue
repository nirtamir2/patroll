<template>
    <div>
        <gmap-map :center="center" :zoom="20" style="width: 100%; height: 300px" @click="addMarker" 
       >
            <gmap-marker  v-for="(m, index) in markers" :key="index" :position.sync="m.position" :icon="getIcon(m)" :clickable="true" @click="removeMarker(m)" :draggable="true" @dragend="changeMarkerPosition($event, m)">
            </gmap-marker>
        </gmap-map>
        <h1>markers: </h1>
        <ul>
            <li  v-for="(m, index) in markers" :key="index"
             @click="moveToMarker(m)" :class="{ green: m.isWalked }">{{m.position.lat}}, {{m.position.lng}}</li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            center: { lat: 31.97888550406638, lng: 34.78511333465576 },
        }
    },
    computed: {...mapState([
        'markers'
    ])},
    methods: {
        ...mapActions(['addMarker','removeMarker']),
        getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition((pos) => {
                    const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                    this.center = newPos
                    this.$store.dispatch('markWalked', newPos)
                })
            }
        },
        getIcon(marker) {
            return marker.isWalked ? '/static/img/beachflag.png' : ''
        },
        changeMarkerPosition(event, marker) {
            const newLoc = { lat: event.latLng.lat(), lng: event.latLng.lng() }
            const oldLoc = marker.position
            console.log(oldLoc, newLoc);
            this.$store.dispatch('changeMarkerLocation', {oldLoc, newLoc})
        },
        moveToMarker(m) {
            this.center = m.position;
        }
    },
    mounted() {
        this.getCurrentLocation();
    }
}
</script>
<style scoped>
.green {
    background-color: lightgreen;
}
</style>

