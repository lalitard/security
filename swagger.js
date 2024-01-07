const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/users.js', './routes/index.js', './models/index.js', './models/init-models.js', './models/roles.js',
'./models/users_roles.js','./models/users.js' ]

swaggerAutogen(outputFile, endpointsFiles)