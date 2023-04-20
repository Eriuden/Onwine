const { appendFile } = require("fs");

appendFile.use(cors({origin: process.env.CLIENT_URL}))

