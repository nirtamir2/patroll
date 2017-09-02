<template>
    <iframe height="500" width="500" frameborder="0" style="border:0" :src="src">
    </iframe>
</template>
<script>
export default {
    name: 'GoogleMap',
    props: {
        longitude: { default: 600 },
        latitude: { default: 450},
        q: { default: "Space+Needle,Seattle+WA", type: String }
    },
    data() {
        return {
            src: "https://www.google.com/maps/embed/v1/place?key=AIzaSyDervOVnMFUjSMeLnBIiiLMmkX9qR3cG6Q&q=" + this.latitude+', '+this.longitude
        }
    }
}
</script>

