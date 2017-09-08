<template>
    <div>
        <gmap-map :center="center" :zoom="20" style="width: 100%; height: 300px" @click="addMarker">
            <gmap-marker :key="index" v-for="(m, index) in markers" 
            :position="m.position" :icon="m.icon" 
            :clickable="true"  @click="markers.splice(index,1)"
             :draggable="true" @dragend="changeMarkerPosition($event, m)">
             </gmap-marker>
        </gmap-map>
        <h1>markers: </h1>
        <ul v-for="(m, index) in markers">
            <li @click="moveToMarker(m)" :class="{ green: m.hasOwnProperty('icon') }">{{m.position.lat}}, {{m.position.lng}}</li>
        </ul>
    </div>
</template>
<script>
import locationService from './../services/location.service'
export default {
    data() {
        return {
            center: { lat: 31.97888550406638, lng: 34.78511333465576 },
            markers: [{position: {lat:31.978841167530444, lng:34.78518381714821}},
            {position: {lat:50, lng:1}},
            {position: {lat:50, lng:0}}]
        }
    },
    methods: {
        addMarker(loc) {
            this.markers.push({ position: { lat: loc.latLng.lat(), lng: loc.latLng.lng() } })
        }
        ,
        getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition((pos) => {
                    const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                    this.center = newPos
                    for (let marker of this.markers) {
                        const distance = locationService.getDistance(newPos, marker.position)
                        if (distance < 20) {
                            marker.icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                        }
                    }
                })
            }
        },
        changeMarkerPosition(event,marker) {
            const newLoc = { lat: event.latLng.lat(), lng: event.latLng.lng() }
            marker.position = newLoc
        },
        moveToMarker(m)
        {
            this.center = m.position;
        }
    },
    mounted() {
        this.getCurrentLocation();
    }
}
</script>
<style scoped>
    .green{
        background-color: green;
    }
</style>

