const mongoose = require ("mongoose");
mongoose.connect(ProcessingInstruction.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("Connected to MongDB"))
.catch(err => console.error("Could not Connected to MongDB:",err))