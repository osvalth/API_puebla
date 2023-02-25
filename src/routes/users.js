const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database.js'); // Me trae la cadena de conexión

/***************     API CRUD     *****************/

// GET all Users
router.get('/users/all', (req, res) => {
    const consulta_sql ='SELECT * FROM usuarios;';
    mysqlConnection.query(consulta_sql, (err,rows, fields) => {
        if (!err) {
            res.status(200).json(rows);
        }else {
            console.log(err)
        }
    });
});
// CREATE or UPDATE User
router.put('/users/set', (req, res) => {
    console.log(req.body)
    const { ID, USERNAME, LASTNAME, AGE } = req.body;
    console.log( ID, USERNAME, LASTNAME, AGE);
    const consulta_sql = `CALL createOrUpdateUser( ?, ?, ?, ?);`;
    mysqlConnection.query(consulta_sql, [ ID, USERNAME, LASTNAME, AGE], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User Update' });
        } else {
            console.log(err);
        }
    })
});
// GET An user
router.get('/users/get/:ID', (req, res) => {
    const consulta_sql = 'SELECT * FROM usuarios WHERE ID = ?';
    console.log(req.params)
    const { ID } = req.params; 
    mysqlConnection.query( consulta_sql , [ID], (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        }else {
            res.json({
                'message': "El usuario no se encuentra en el sistema"
            });
            console.log(err);
        }
    });
});
// DELETE An user
router.delete('/users/detele/:ID', (req, res) => {
    const consulta_sql = 'DELETE FROM usuarios WHERE ID = ?';
    const { ID } = req.params;
    console.log(req.params)
    mysqlConnection.query( consulta_sql , [ID], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario eliminado' });
        } else {
            console.log(err);
        }
    });
});
module.exports = router;