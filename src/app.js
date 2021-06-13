const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))







//Rendering to the Client
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Prayag Khurana'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Prayag Khurana'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Prayag Khurana',
        helpText:'This is some helpful text.'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an addrress!'
        })
    }
    const address=req.query.address
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            res.send({
                'forecast':forecastdata,
                location,
                address
            })
        })
    })
})

//Sample route for getting requests
// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }
//     res.send({
//         products:[req.query.search]
//     })
// })


/* Simple response sending
app.get('',(req,res)=>{
    res.send('<h1>Weather</h1>')
})
app.get('/help',(req,res)=>{
    res.send([{
        name:'prayag',
        age:18
    },{
        name:'pray'
    }])
})
app.get('/about',(req,res)=>{
    res.send('<h1>About</h1>')
})
*/
app.get('/help/*',(req,res)=>{
    res.render('404page',{
        error:'Help article not found',
        name:'Prayag Khurana',
        title:'404'
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        error:'Page not found',
        name:'Prayag Khurana',
        title:'404'
    })
})

//To call localhost:3000
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})