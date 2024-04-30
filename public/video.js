// HTML-ben létrehozunk egy <video> elemet
var video = document.getElementById("video");

// A playVideo() függvény a videó lejátszását indítja
function playVideo() {
    video.play();
}

// A pauseVideo() függvény a videó lejátszását megállítja
function pauseVideo() {
    video.pause();
}

// A stopVideo() függvény a videó lejátszását megállítja és a kezdetére ugrasztja vissza
function stopVideo() {
    video.pause();
    video.currentTime = 0;
}

// A setVolume(volume) függvény beállítja a videó hangerősségét a megadott értékre
function setVolume(volume) {
    video.volume = volume;
}

// A muteVideo() függvény némítja a videót, ha jelenleg hangos, vagy visszaállítja a hangot, ha már némítva van
function muteVideo() {
    video.muted = !video.muted;
}