const express = require('express'),
      mysql = require('mysql'),
      bodyParser = require('body-parser'),
      app = express()

const db = mysql.createPool({
    connectionLimit: 99,
    database: 'moEj2Ti5Fb',
    host: 'remotemysql.com',
    user: 'moEj2Ti5Fb',
    password: 'jbKRLxjSu3'
})

// db.on('error', err => {
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         // db error reconnect
//         disconnect_handler();
//     } else {
//         throw err;
//     }
// });

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.get('/customers', (req, res) => {
    if (JSON.stringify(req.query) === '{}') {
        db.query(`SELECT * FROM customers`, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        })
    } else {
        let queryString = '';
        let keys = Object.keys(req.query)
        const length = keys.length
        keys.forEach((key, i) => {
            queryString += `${key} = '${req.query[key]}' ${length - i === 1 ? '' : 'AND '}`
        });
        db.query(`SELECT * FROM customers WHERE ${queryString}`, (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        })
    }
})
app.get('/customers/:id', (req, res) => {
    db.query(`SELECT * FROM customers WHERE id = ${req.params.id}`, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
})
app.put('/customers/:id', (req, res) => {
    console.log(req.params.id)
    console.log(req.body);
    let queryString = '';
    let keys = Object.keys(req.body)
    const length = keys.length
    keys.forEach((key, i) => {
        queryString += `${key} = '${req.body[key]}', `
    });
    queryString += 'updated_at = NOW()'
    db.query(`UPDATE customers SET ${queryString} WHERE id = ${req.params.id}`, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
})

app.post('/customers/', (req, res) => {
    let keyString = '';
    let keys = Object.keys(req.body)
    const keylength = keys.length
    keys.forEach((key, i) => {
        keyString += `${key}${keylength - i === 1 ? '' : ', '}`
    });
    keyString += ', created_at, updated_at'
    let valueString = '';
    let values = Object.values(req.body)
    const valuelength = values.length
    values.forEach((value, i) => {
        valueString += `'${value}'${valuelength - i === 1 ? '' : ', '}`
    });
    valueString += ', NOW(), NOW()'
    let obj = {
        keys: keyString,
        values: valueString
    }
    db.query(`INSERT INTO customers (${keyString}) VALUES (${valueString})`, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
})

app.delete('/customers/:id', (req, res) => {
    db.query(`DELETE FROM customers WHERE id = ${req.params.id}`, (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
})
app.listen(5000, () => {
    console.log('App running on port 5000')
})