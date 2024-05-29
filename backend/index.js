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

app.get('/itemcount' , authenticateToken, (req , res) =>{
  const sql = "SELECT c.id , c.name , COUNT(DISTINCT i.id) as count FROM category c LEFT JOIN item i on c.id = i.categoryID  GROUP BY c.id;"

  connection.query(sql , (err,result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }
  })
})


app.get('/newequipment' , authenticateToken, (err ,res) =>{
  const sql = 'SELECT i.asset_code ,i.name , i.serial_no , i.location, i.brand, c.name FROM item i, category c WHERE i. status = "New" AND i.categoryID = c.id;';

  connection.query(sql ,(err, result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }  
  })

})

app.get('/actives' , authenticateToken, (err ,res) =>{
  const sql = 'SELECT COUNT(*) as count FROM item WHERE status = "Active";';

  connection.query(sql ,(err, result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
 
    res.json(result);
  })

})
app.get('/defective' , authenticateToken, (err ,res) =>{
  const sql = 'SELECT COUNT(*) as count FROM item WHERE status = "Defective";';

  connection.query(sql ,(err, result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }  
  })

})
app.get('/dispose' , authenticateToken, (err ,res) =>{
  const sql = 'SELECT COUNT(*) as count FROM item WHERE status = "Dispose";';

  connection.query(sql ,(err, result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }  
  })

})
app.get('/donate' , authenticateToken, (err ,res) =>{
  const sql = 'SELECT COUNT(*) as count FROM item WHERE status = "Donate";';
// app.get('/barChartData' , (req , res) =>{
//   const sql = "SELECT COUNT(*) AS item_count, MONTH(i.date_acquired) AS month_number, c.name AS item_name FROM item i, category c WHERE i.categoryID = c.id GROUP BY categoryID;"

  // connection.query(sql ,(err, result) =>{
  //   if(err){
  //     return res.status(500).json({ error: 'Server error' });
  //   }
  //   else{
  //     return res.status(200).send(result);
  //   }  
  // })
  connection.query(sql , (err,result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }
  })
})


app.get('/asset', authenticateToken, async function (req, res) {
    // req.body
   
    connection.query('SELECT i.*, c.name AS type FROM `item` i, `category` c WHERE i.categoryID = c.id ORDER BY date_acquired DESC ;', function (error, results, fields) {
      if (error) throw error;
      // console.log(results);
      res.json(results) //send
    });   
})

app.post('/asset-create', (req, res) => {
    const item = req.body;
  
    connection.query(
      "INSERT INTO item (name, description, brand, date_acquired, supplier, serial_no, asset_code, location, status, categoryID) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        item.name,
        item.description,
        item.brand,
        item.date_acquired,
        item.supplier,
        item.serial,
        item.asset_code,
        item.location,
        item.status,
        item.type,
      ],
      (error, result) => {
        if (error) {
          console.log(error);
        }
  
        connection.query(
          "SELECT CURRENT_DATE() AS 'current_date', i.id AS 'ID', CONCAT(c.category_code, '-', RIGHT(DATE_FORMAT(i.date_acquired, '%Y'),2), '-', LPAD(i.id, 3, '0')) AS asset_code FROM item i, category c WHERE i.categoryID = c.id ORDER BY i.id DESC LIMIT 1",
          (error, results) => {
            if(error){
              console.log(error);
            }

            const newAssetCode = results[0].asset_code;
  
            connection.query(
              "UPDATE item SET asset_code = ? WHERE id = ?",
              [newAssetCode, result.insertId],
              (error, updateResult) => {
                if (error) {
                  console.log(error);
                }
                // return res.json({ item });
              }
            );
          }
        );
      }
    );
});

app.post('/asset-update', (req, res) => {
    res.json({ message: 'Data received successfully' });
  
    const item = req.body;
    
    connection.query("UPDATE item SET name = '" +item.name+ "', description = '" +item.description+ "', brand = '" +item.brand+ "', supplier = '" +item.supplier+ "', location = '" +item.location+ "', status = '" +item.status+ "', recipient = '" +item.recipient+ "' WHERE id = '" + item.id + "'", 
    (error, result) => {
        if(error){
          console.log(error);
        }
    })
    
  });



// app.post('/user-update', async function (req, res){
//   const data = req.body;

//   connection.query(
//     "UPDATE user SET fname = '" +data.fname+ "', lname = '" +data.lname+ "', contact_no = '" +data.contact_no+ "', authority = '" +data.authority+ "', email = '" +data.email+ "', password = '" +data.password+ "', status = '" +data.status+ "' WHERE id = " +data.id,
//     (error, result) => {
//       if(error){
//         console.log(error);
//       }
//     }
//   )
// })

// app.post('/user-create', (req, res) => {
//   const data = req.body;

//   connection.query(
//     "INSERT INTO user (fname, lname, contact_no, date_created, authority, email, password, status) VALUES (?,?,?, CURDATE(),?,?,?,?)",
//     [
//       data.fname,
//       data.lname,
//       data.contact_no,
//       data.authority,
//       data.email,
//       data.password,
//       data.status
//     ],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//       }
//     }
//   );
// });


  


  app.listen(process.env.PORT || 5000)