import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'INSERT HOST HERE',
    user: 'INSERT USER HERE',
    password: 'INSERT PASSWORD HERE',
    database: 'INSERT DB NAME HERE',
});

// --------------------------------------------------------------------------------------------- //


// -----------------------------------
// CRUD Operations for Customers table
// -----------------------------------


app.get("/customers", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    const sqlSelect = `SELECT customer_id, first_name, last_name, email FROM Customers`;
    db.query(sqlSelect, (err, result) => {
        res.json(result)
    });
});

app.get("/customers/update/:customer_id", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.customer_id
    
    const sqlSelect = `SELECT first_name, last_name, email FROM Customers WHERE customer_id = ?`;
    db.query(sqlSelect, id, (err, result) => {
        res.json(result)
    });
});

app.post("/customers/add", (req, res) => {

    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email

    const sqlInsert = `INSERT INTO Customers (first_name, last_name, email) VALUES (?, ?, ?)`;
    db.query(sqlInsert, [first_name, last_name, email], (err, result) => {
        console.log(result)
    })
});

app.delete("/customers/delete/:customer_id", (req, res) => {

    const id = req.params.customer_id
    const sqlDelete = `DELETE FROM Customers WHERE customer_id = ?`;

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.put("/customers/update/:customer_id", (req, res) => {

    const id = req.params.customer_id
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email

    const sqlUpdate = `UPDATE Customers SET first_name = ?, last_name = ?, email = ? WHERE customer_id = ?`;

    db.query(sqlUpdate, [first_name, last_name, email, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    });
});


// ----------------------------------
// CRUD Operations for Categories
// ----------------------------------


app.get("/categories", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    const sqlSelect = `SELECT category_id, smovie_id, pmovie_id, genre FROM Categories`;
    db.query(sqlSelect, (err, result) => {
        res.json(result)
    });
});

app.get("/categories/update/:category_id", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.category_id
    
    const sqlSelect = `SELECT genre FROM Categories WHERE category_id = ?`;
    db.query(sqlSelect, id, (err, result) => {
        res.json(result)
    });
});

app.post("/categories/add", (req, res) => {

    const genre = req.body.genre

    const sqlInsert = `INSERT INTO Categories (genre) VALUES (?)`;
    db.query(sqlInsert, [genre], (err, result) => {
        console.log(result)
    })
});

app.delete("/categories/delete/:category_id", (req, res) => {

    const id = req.params.category_id
    const sqlDelete = `DELETE FROM Categories WHERE category_id = ?`;

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.put("/categories/update/:category_id", (req, res) => {

    const id = req.params.category_id
    const genre = req.body.genre

    const sqlUpdate = `UPDATE Categories SET genre = ? WHERE category_id = ?`;

    db.query(sqlUpdate, [genre, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    });
});


// ----------------------------------
// CRUD Operations for BuyRentMovie
// ----------------------------------


app.get("/physical-movies", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    const sqlSelect = `SELECT pmovie_id, order_id, category_id, title, year_released FROM PhysMovies`;
    db.query(sqlSelect, (err, result) => {
        res.json(result)
    });
});

app.get("/physical-movies/update/:pmovie_id", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.pmovie_id
    
    const sqlSelect = `SELECT title, year_released FROM PhysMovies WHERE pmovie_id = ?`;
    db.query(sqlSelect, id, (err, result) => {
        res.json(result)
    });
});

app.post("/physical-movies/add", (req, res) => {

    const title = req.body.title
    const year_released = req.body.year_released

    const sqlInsert = `INSERT INTO PhysMovies (title, year_released) VALUES (?,?)`;
    db.query(sqlInsert, [title, year_released], (err, result) => {
        console.log(result)
    })
});

app.delete("/physical-movies/delete/:pmovie_id", (req, res) => {

    const id = req.params.pmovie_id
    const sqlDelete = `DELETE FROM PhysMovies WHERE pmovie_id = ?`;

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.put("/physical-movies/update/:pmovie_id", (req, res) => {

    const id = req.params.pmovie_id
    const title = req.body.title
    const year_released = req.body.year_released

    const sqlUpdate = `UPDATE PhysMovies SET title = ?, year_released = ? WHERE pmovie_id = ?`;

    db.query(sqlUpdate, [title, year_released, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    });
});


// ----------------------------------
// CRUD Operations for Orders
// ----------------------------------


app.get("/orders", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    const sqlSelect = `SELECT order_id, customer_id, buy_price, rent_price FROM Orders`;
    db.query(sqlSelect, (err, result) => {
        res.json(result)
    });
});

app.get("/orders/update/:order_id", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.order_id
    
    const sqlSelect = `SELECT buy_price, rent_price FROM Orders WHERE order_id = ?`;
    db.query(sqlSelect, id, (err, result) => {
        res.json(result)
    });
});

app.post("/orders/add", (req, res) => {

    const buy_price = req.body.buy_price
    const rent_price = req.body.rent_price

    const sqlInsert = `INSERT INTO Orders (buy_price, rent_price) VALUES (?,?)`;
    db.query(sqlInsert, [buy_price, rent_price], (err, result) => {
        console.log(result)
    })
});

app.delete("/orders/delete/:order_id", (req, res) => {

    const id = req.params.order_id
    const sqlDelete = `DELETE FROM Orders WHERE order_id = ?`;

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.put("/orders/update/:order_id", (req, res) => {

    const id = req.params.order_id
    const buy_price = req.body.buy_price
    const rent_price = req.body.rent_price

    const sqlUpdate = `UPDATE Orders SET buy_price = ?, rent_price = ? WHERE order_id = ?`;

    db.query(sqlUpdate, [buy_price, rent_price, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    });
});


// ----------------------------------
// CRUD Operations for Stream Movie
// ----------------------------------


app.get("/stream-movies", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    const sqlSelect = `SELECT smovie_id, subscription_id, category_id, title, year_released FROM StreamMovies`;
    db.query(sqlSelect, (err, result) => {
        res.json(result)
    });
});

app.get("/stream-movies/update/:smovie_id", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.smovie_id
    
    const sqlSelect = `SELECT title, year_released FROM StreamMovies WHERE smovie_id = ?`;
    db.query(sqlSelect, id, (err, result) => {
        res.json(result)
    });
});

app.post("/stream-movies/add", (req, res) => {

    const title = req.body.title
    const year_released = req.body.year_released

    const sqlInsert = `INSERT INTO StreamMovies (title, year_released) VALUES (?,?)`;
    db.query(sqlInsert, [title, year_released], (err, result) => {
        console.log(result)
    })
});

app.delete("/stream-movies/delete/:smovie_id", (req, res) => {

    const id = req.params.smovie_id
    const sqlDelete = `DELETE FROM StreamMovies WHERE smovie_id = ?`;

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.put("/stream-movies/update/:smovie_id", (req, res) => {

    const id = req.params.smovie_id
    const title = req.body.title
    const year_released = req.body.year_released

    const sqlUpdate = `UPDATE StreamMovies SET title = ?, year_released = ? WHERE smovie_id = ?`;

    db.query(sqlUpdate, [title, year_released, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    });
});


// ----------------------------------
// CRUD Operations for Subscriptions
// ----------------------------------


app.get("/subscriptions", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    const sqlSelect = `SELECT subscription_id, customer_id, subscription_level, access_to_rent, access_to_buy, access_to_stream FROM Subscriptions`;
    db.query(sqlSelect, (err, result) => {
        res.json(result)
    });
});

app.get("/subscriptions/update/:subscription_id", (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const id = req.params.subscription_id
    
    const sqlSelect = `SELECT subscription_level, access_to_rent, access_to_buy, access_to_stream FROM Subscriptions WHERE subscription_id = ?`;
    db.query(sqlSelect, id, (err, result) => {
        res.json(result)
    });
});

app.post("/subscriptions/add", (req, res) => {

    const subscription_level = req.body.subscription_level
    const access_to_rent = req.body.access_to_rent
    const access_to_buy = req.body.access_to_buy
    const access_to_stream = req.body.access_to_stream

    const sqlInsert = `INSERT INTO Subscriptions (subscription_level, access_to_rent, access_to_buy, access_to_stream) VALUES (?,?,?,?)`;
    db.query(sqlInsert, [subscription_level, access_to_rent, access_to_buy, access_to_stream], (err, result) => {
        console.log(result)
    })
});

app.delete("/subscriptions/delete/:subscription_id", (req, res) => {

    const id = req.params.subscription_id
    const sqlDelete = `DELETE FROM Subscriptions WHERE subscription_id = ?`;

    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.put("/subscriptions/update/:subscription_id", (req, res) => {

    const id = req.params.subscription_id
    const subscription_level = req.body.subscription_level
    const access_to_rent = req.body.access_to_rent
    const access_to_buy = req.body.access_to_buy
    const access_to_stream = req.body.access_to_stream

    const sqlUpdate = `UPDATE Subscriptions SET subscription_level = ?, access_to_rent = ?, access_to_buy = ?, access_to_stream = ? WHERE subscription_id = ?`;

    db.query(sqlUpdate, [subscription_level, access_to_rent, access_to_buy, access_to_stream, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
