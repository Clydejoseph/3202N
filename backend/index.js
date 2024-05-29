const express = require('express')
require('dotenv').config();
const mysql = require('mysql2')
const cors = require('cors')
const bp = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
const secretKey = 'imong_mama';
const refreshTokenSecret = 'imong_mama_refresh'; // A different secret key for refresh tokens
const refreshTokens = [];

var connection = mysql.createConnection({
  host     : 'bkuiydztdar7unewbvuk-mysql.services.clever-cloud.com',
  user     : 'urnaiq8petcvhtek',
  password : 'qXCdaCkH1813rMGB2Aik',
  database : 'bkuiydztdar7unewbvuk'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  res.json({
    status: 200,
    connection: 'working fine'
  })
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  console.log(password)
  const sql = 'SELECT id, fname, lname, email FROM user WHERE status = "active" AND email = ? AND password = ?';
  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'Server error' });
    }
    console.log(results)
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: results[0].id }, secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: results[0].id }, refreshTokenSecret, { expiresIn: '7d' });
    refreshTokens.push(refreshToken);

    const userData = {
      id: results[0].id,
      email: results[0].email,
      fname: results[0].fname,
      lname: results[0].lname,
      accessToken: accessToken,
      refreshToken: refreshToken
    };

    console.log(userData)
    return res.json(userData);
  });
})

app.post('/token', (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  if (!refreshTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ id: user.id }, secretKey, { expiresIn: '15m' });
    res.json({ accessToken });
  });
});

app.post('/logout', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.sendStatus(204);
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protect your routes
app.get('/itemcount', authenticateToken, (req, res) => {
  const sql = "SELECT c.id , c.name , COUNT(DISTINCT i.id) as count FROM category c LEFT JOIN item i on c.id = i.categoryID  GROUP BY c.id;";
  connection.query(sql , (err,result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }
  })
});

app.get('/newequipment', authenticateToken, (err, res) => {
  const sql = 'SELECT i.asset_code ,i.name , i.serial_no , i.location, i.brand, c.name FROM item i, category c WHERE i. status = "New" AND i.categoryID = c.id;';
  connection.query(sql ,(err, result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }  
  })
});

app.listen(process.env.PORT || 5000);
