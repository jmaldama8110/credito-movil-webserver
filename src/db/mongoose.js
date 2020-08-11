
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOOSE_URL_CONNECTION,{  useNewUrlParser: true,
                                                        useCreateIndex: true,
                                                        useUnifiedTopology: true,
                                                        useFindAndModify: false    } )



