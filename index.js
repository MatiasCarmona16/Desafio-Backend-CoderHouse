const express = require ('express')
const ProductManager = require ('./clases')

const app = express ()
let product = new ProductManager

app.get("/", (req, res) => {
    res.send ('Bievenidos')
})

app.get("/allProducts", async (req, res) => {
    let response = await product.allProducts()
    res.send(response)
})

app.get('/productById/:id', (req, res) => {
    let id = req.params.id
    console.log(id)
})

app.listen (8690, () => {
    console.log ('Server On')
})
