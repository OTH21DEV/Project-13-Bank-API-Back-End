const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger.yaml')
const dbConnection = require('./database/connection')

dotEnv.config()

const app = express()
//change port 3001 into 5000
//const port = process.env.PORT || 5000



// Handle CORS issues
app.use(cors())

/**test */
const host = '0.0.0.0';
const port = process.env.PORT || 3000
const path = require ('path')
//



// Connect to the database
dbConnection()



// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))






// Handle custom routes
app.use('/api/v1/user', require('./routes/userRoutes'))




app.use(express.static(path.join(__dirname + "/../build" )))

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.get('*', (req, res, next) => {
//  res.send('Hello from my Express server v2!')
  //res.sendFile(path.join(__dirname, '/../public'));

  res.sendFile(
    path.resolve(__dirname,  '..', "build" , 'index.html')
  )

})

app.listen(port,host,() => {
  console.log(`Server listening on `)
  //console.log(`Server listening on http://vps-7e7110d5.vps.ovh.ca:${port}`)
})
