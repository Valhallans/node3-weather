console.log('Client Side JavaScript')



const weatherForm = document.querySelector('#weatherForm')
const searchInput = document.querySelector('#searchInput')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Searching...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + searchInput.value)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                return 
            }
            messageOne.textContent = data.address
            messageTwo.textContent = data.summary
            console.log(data)

        })
    })
})