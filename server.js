const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(bodyparser.json());

app.post('/registerProduct', async (req, res) => {

    const { ProductName, ProductBrand, ProductDate } = req.body;

    /*console.log(ProductName);
    console.log(ProductBrand);
    console.log(ProductDate);*/

    try {

        const [search] = await db.query('SELECT * FROM tb_product WHERE ProductName=? AND ProductBrand=?', [ProductName, ProductBrand])

        if (search.length > 0) {
            res.status(409).json({ message: "Este valor ya existe en la bd" });
        }

        const [rows] = await db.query('INSERT INTO tb_product(ProductName,ProductBrand,ProductDate) VALUES (?,?,?)',
                    [ProductName, ProductBrand, ProductDate]);

        console.log(rows);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: "Error al insertar un producto" });
        }

        res.status(201).json({ message: "Insertado Correctamente el productos" });

    } catch (e) {
        console.error("Error al insertar un producto", e);
        return res.status(404).json({ message: "Error al servidor" })
    }
});

app.listen(PORT, () => {
    console.log(`Server esta corriendo en http://localhost:${PORT}`);
});