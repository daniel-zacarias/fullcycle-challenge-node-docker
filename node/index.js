const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)

function createPeople() {
    const sql = `insert into people(name) values('Daniel')`
    connection.query(sql)
}

function getPeople() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM people";
        connection.query(sql, function (err, result, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

app.get("/", (req, res) => {
    createPeople()
    getPeople().then(people => {
        const registers = people.reduce((pValue, cValue) => pValue + `<h3>${cValue.name}<h3>`, "")
        res.send(`
            <h1>FullCycle</h1>
            <div>${registers}</div>
            `)
    }
    )

})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})

