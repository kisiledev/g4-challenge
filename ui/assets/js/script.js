let userLocation = document.querySelector('.user-location').textContent
let coords = userLocation.split('Location: ')
let [long, lat] = coords;
long = long.replace(/\s/g, "")
lat = lat.replace(/\s/g, "")
console.log(long, lat)
let url = `http://api.positionstack.com/v1/forward?access_key=YOUR_ACCESS_KEY&query=40.7638435,-73.9729691`

let dates = document.querySelectorAll('.date');
dates.forEach(date => {
    date.innerText = dayjs(date.innerText).toString();
})