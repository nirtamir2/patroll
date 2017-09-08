<template>
    <div>
        <gmap-map :center="center" :zoom="20" style="width: 100%; height: 300px" @click="addMarker">
            <gmap-marker v-for="(m, index) in markers" :key="index" :position.sync="m.position" :icon="getIcon(m)" :clickable="true" @click="removeMarker(m)" :draggable="true" @dragend="changeMarkerPosition($event, m)">
            </gmap-marker>
        </gmap-map>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState([
            'markers', 'center'
        ])
    },
    methods: {
        ...mapActions(['addMarker', 'removeMarker', 'centerChanged']),
        getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition((pos) => {
                    const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                    this.$store.dispatch('centerChanged', newPos)
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
            this.$store.dispatch('changeMarkerLocation', { oldLoc, newLoc })
        },
    },
    mounted() {
        this.getCurrentLocation();
    }
}
</script>

