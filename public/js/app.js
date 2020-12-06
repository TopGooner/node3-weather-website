
console.log("client side JS code")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
message1 = document.querySelector('#message-1')
message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
            }
            else{
                message1.textContent = "Weather Alert!"
                message2.textContent = data.location+" =>\n Temperature: "+data.temperature+"\n Feels Like: "+data.feelslike
            }
        })
    })  
})