url =  'https://api.worldbank.org/v2/country/br?format=json'

fetch(url)
.then(res => res.json())
.then(data=> {
    console.log(data)
})