import app from "../backend/src/app.js"
const PORT = 3000

app.listen(PORT, () => {    
    console.log(`Server running on port ${PORT}`)
})