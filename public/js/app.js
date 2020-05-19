const weatheForm = document.querySelector('form')
const input = document.querySelector('input')

const loc  = document.getElementById('location')
const fore  = document.getElementById('forecast')

weatheForm.addEventListener('submit',(e) => {
    e.preventDefault()

    loc.innerHTML = input.value
    fore.innerHTML = 'loading...'
    fetch('http://localhost:3000/weather?address='+input.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                loc.innerHTML = data.error

                input.value = ''

            } else {
                loc.innerHTML = data.location
                fore.innerHTML = data.forecast

                input.value = ''

            }
        })
    })
})