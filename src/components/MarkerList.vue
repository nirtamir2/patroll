<template>
    <div>
        <h1>
            markers: </h1>
        <ul>
            <li v-for="(m, index) in markers" :key="index" @click="centerChanged(m.position)" :class="{ green: m.isWalked }">{{m.position.lat}}, {{m.position.lng}}</li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
         ...mapState( ['markers'] ) 
    },
    methods: {
        ...mapActions( ['centerChanged'] )
    }
}
</script>
<style scoped>
.green {
    background-color: lightgreen;
}
</style>

