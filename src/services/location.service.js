function getDistance(latLng1, latLng2) {
    const R = 6370.981162;
    const dLat = toRad(latLng2.lat - latLng1.lat);
    const dLon = toRad(latLng2.lng - latLng1.lng);
    const lat1 = toRad(latLng1.lat);
    const lat2 = toRad(latLng2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

function toRad(Value) {
    return Value * Math.PI / 180;
}

export default { getDistance }