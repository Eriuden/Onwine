const mongoose = require("mongoose")

mongoose
.connect(
    ,
)
.then(()=> console.log("connecté à MongoDB"))
.catch((err) => console.log("échec de connexion", err))

