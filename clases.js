const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = "./productos.json";
        this.loadProducts();
    }

    async allProducts(limit) {
        let res = await fs.promises.readFile("./productos.json", "utf-8")
        let products = JSON.parse(res);

        if (limit) {
            products = products.slice(0, limit);
        }

        return products;
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.id = this.calculateNextId();
        } catch (err) {
            this.products = [];
            this.id = 1;
        }
    }

    calculateNextId() {
        if (this.products.length === 0) {
            return 1;
        }
        const maxId = this.products.reduce((max, product) => Math.max(max, product.id), 0);
        return maxId + 1;
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    addProduct(title, description, price, thumbnail, code) {
        if (!title || !description || !price || !thumbnail || !code) {
            console.log("Todos los campos son requeridos");
            return;
        }

        if (!this.products.some((p) => p.code === code)) {
            const newProduct = { id: this.id++, title, description, price, thumbnail, code };
            this.products.push(newProduct);
            this.saveProducts();
            console.log(`El producto ${title} se agregó con éxito`);
        } else {
            console.log(`Ya existe el producto con el código ${code}`);
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);

        if (product) {
            return product;
        } else {
            console.log(`No se encuentra el producto con el id ${id}`);
        }
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === id);

        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProducts();
            console.log(`El producto con id ${id} se actualizó con éxito`);
        } else {
            console.log(`No se encuentra el producto con el id ${id}`);
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);

        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
            console.log(`El producto con id ${id} se eliminó con éxito`);
        } else {
            console.log(`No se encuentra el producto con el id ${id}`);
        }
    }
}

const product = new ProductManager();

// Producto
product.addProduct("Smartphone", "Apple Iphone 12", 540, "https://...", 456);
// Producto
product.addProduct("Smartphone", "Apple Iphone 13", 600, "https://...", 567);

console.log(product.getProducts());
console.log(product.getProductById(1));

// Ejemplo de actualización
product.updateProduct(1, { price: 600, stock: 10 });

// Ejemplo de eliminación
product.deleteProduct(1);

console.log(product.getProducts());


module.exports = ProductManager





