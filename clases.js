const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
        this.path = "./productos.json"
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data);

            return this.products
        } catch (err){
            console.log ('Error en la carga')
        }
    }

    addProduct ( title, description, price, thumbnail, code, stock ) {
        if ( !title || !description || !price || !thumbnail || !code || !stock ) {
            console.log ("Todos los campos son requeridos");
        }

        if (!this.products.some((p) => p.code === code)) {
            product.id = this.id++
            let newProduct = { title, description, price, thumbnail, code, stock }

            this.products.push(newProduct);
            console.log(`El producto ${title} se agrego con exito`);
        } else {
            console.log(`Se encuentra ya existente el producto ${code}`);
        }
    }

    getProductsById (id) {
        let product = this.products.find((p) => p.id === id);

        if (product) {
            return product
        } else {
            console.log(`No se encuentra el producto ${id}`);
        }
    }
}

const product = new ProductManager ()

//Producto
product.addProduct("Smartphone", "Apple Iphone 12", 540, "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRtdOc1MDIQlEzyfxFv_tgroSNiVnFyEnyFounriIaNcfbr_oX2005I_80q3si6whr4W_l4H49W6TxR7KMuMcFNGYANR-ASEglIGng4l7ZiYS3abhLa9LaB&usqp=CAE", 456, 3 );
//Producto
product.addProduct("Smartphone", "Apple Iphone 13", 600, "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRLY_71W1F1mZRV8q4Xma5qgk5MfeY0SGSb-aS7kZZcOZX2Qr4fHO9kJwIPrxFuZ_ZAVauji2t4zMNQTn62XVA7wYqwufpswvdZE97Gh-GOV_haA4nbF_27&usqp=CAE", 567, 6 );

console.log(product.getProducts());

console.log(product.getProductsById(456));




