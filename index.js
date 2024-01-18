const express = require ('express')
const ProductManager = require ('./clases')

const app = express ()
let product = new ProductManager

app.get("/", (req, res) => {
    res.send ('Bievenidos')
})

app.get("/allProducts", async (req, res) => {
    const limit = req.query.limit

    let response = await product.allProducts(limit)
    res.send(response)
})

app.get('/productById/:id', (req, res) => {
    let id = req.params.id
    let proFound = products.find (elm => {
        return elm.id == id
    })
    console.log(proFound)
})

app.listen (8690, () => {
    console.log ('Server On')
})
