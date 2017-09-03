function getDistance(latLng1, latLng2) {
    const distance =
        Math.sin(latLng1.lat * Math.PI) * Math.sin(latLng2.lat * Math.PI) +
        Math.cos(latLng1.lat * Math.PI) * Math.cos(latLng2.lat * Math.PI) *
        Math.cos(Math.abs(latLng1.lng - latLng2.lng) * Math.PI);
    const R = 6370.981162;
    return Math.acos(distance) * R;
}
export default {getDistance}