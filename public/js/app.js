
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm=document.querySelector('form')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    address=document.getElementsByTagName('input')[0].value
    document.getElementById('message1').innerHTML='Loading...'
    document.getElementById('message2').innerHTML=''

    fetch('/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                document.getElementById('message1').innerHTML=data.error
            }
            else{
                document.getElementById('message1').innerHTML=data.location
                document.getElementById('message2').innerHTML=data.forecast
            }
        })
    })   

})