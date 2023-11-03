const express = require('express')
const cors = require('cors')

const filmRouter = require('./src/routes/filmsRoutes')
const filterRouter = require('./src/routes/filterRoutes')
const listRouter = require('./src/routes/listRoutes')
const tvRouter = require('./src/routes/tvRoutes')

const errorResponse = require('./src/utils/errorResponse')

const getMovieByName = require('./src/controllers/getMovieByName')

const app = express()

// import cors from 'cors'
app.use(
  cors({
    origin: ['https://c14-11-n-node-react-two.vercel.app','http://localhost:5173','https://jovial-speculoos-e9b016.netlify.app'],
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
)

app.use('/getmovies', filmRouter)

app.use('/filters', filterRouter)

app.use('/list', listRouter)

app.use('/tv', tvRouter)

/////////HAY QUE MODULARIZAR ESTE CODIGO

app.get('/search', async (req, res) => {
  const { name } = req.query

  try {
    const films = await getMovieByName(name)

    return res.status(200).json(films)
  } catch (error) {
    return res.status(404).send(error)
  }
})

//////////////////////////////////////////

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})

// esta respuesta se usaria en todas las rutas inexistentes, o que no se configuraron.
app.use('*', (req, res) => {
  try {
    throw new Error('Pagina no encontrada')
  } catch (error) {
    errorResponse(res, 404, error)
  }
})
