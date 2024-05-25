const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bp = require('body-parser')

const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'inventory-system'
});


app.get('/itemcount' , (req , res) =>{
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
app.get('/requestno' , (req , res)=>{
  const sql ='SELECT COUNT(*) as reqNo FROM request WHERE status1 = "Pending";';

  connection.query(sql ,(err, result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }  
  })
})
app.get('/requestno-admin' , (req , res)=>{
  const sql ='SELECT COUNT(*) as reqNo FROM request WHERE status2 = "Pending";';

  connection.query(sql ,(err, result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }  
  })
})

app.get('/newequipment' , (err ,res) =>{
  const sql = 'SELECT i.id ,i.name , i.serial_no , i.location FROM item i WHERE DAY(i.date_acquired) = DAY(CURDATE());';

  connection.query(sql ,(err, result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
    else{
      return res.status(200).send(result);
    }  
  })

})

app.get('/actives' , (err ,res) =>{
  const sql = 'SELECT COUNT(*) as count FROM item WHERE status = "Active";';

  connection.query(sql ,(err, result) =>{
    if(err){
      return res.status(500).json({ error: 'Server error' });
    }
 
    res.json(result);
  })

})
app.get('/defective' , (err ,res) =>{
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
app.get('/dispose' , (err ,res) =>{
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
app.get('/donate' , (err ,res) =>{
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


app.get('/report', async function (req, res){
  connection.query(
    "SELECT COUNT(*) AS item_count, c.name AS item_name FROM `item` i, `category` c WHERE i.categoryID = c.id AND MONTH(i.date_acquired) = MONTH(CURDATE()) GROUP BY i.categoryID;",
    (error, result) => {
      if(error){
        console.log(error);
      }

      res.json(result);
    }
  )
});

// app.get('/report-requests', async function (req, res){
//   connection.query(
//     "SELECT COUNT(*) AS req_count FROM request WHERE MONTH(date_requested) = MONTH(CURDATE());",
//     (error, result) => {
//       if(error){
//         console.log(error);
//       }

//       res.json(result);
//     }
//   )
// });


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // check if the email and password exist
  const sql = 'SELECT id, fname,lname,email, authority FROM user WHERE status = "active" AND email = ? AND password = ?';
  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // success
    const userData = {
      id: results[0].id,
      email: results[0].email,
      auth: results[0].authority,
      fname: results[0].fname,
      lname: results[0].lname,
    };

    // req.session.userData = userData;

    return res.json(userData);
  });
});

app.get('/asset', async function (req, res) {
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
            const newItemID = results[0].ID;
            const dateToday = results[0].current_date;
  
            connection.query(
              "UPDATE item SET asset_code = ? WHERE id = ?",
              [newAssetCode, result.insertId],
              (error, updateResult) => {
                if (error) {
                  console.log(error);
                }

                connection.query(
                  "INSERT INTO log (activity, date_done, userID, itemID) VALUES (?,?,?,?)",
                  [
                    'An item has been added to the inventory.',
                    dateToday,
                    item.user_id,
                    newItemID
                  ],
                  (error, logResult) => {
                    if(error) {
                      console.log(error);
                    }
                  }
                )
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

        if(item.status ==! 'Dispose' || item.status !== 'Donate'){
          connection.query(
            "INSERT INTO log (activity, date_done, userID, itemID) VALUES (?,CURDATE(),?,?)",
            [
              "An item has been updated.",
              item.user_id,
              item.id
            ],
            (error, logResult) => {
              if(error) {
                console.log(error);
              }
            }
          )
        }
        if(item.status === 'Dispose'){
          connection.query(
            "INSERT INTO log (activity, date_done, userID, itemID) VALUES (?,CURDATE(),?,?)",
            [
              "An item has been tagged for disposal.",
              item.user_id,
              item.id
            ],
            (error, logResult) => {
              if(error) {
                console.log(error);
              }
            }
          )
        }
        if(item.status === 'Donate'){
          connection.query(
            "INSERT INTO log (activity, date_done, userID, itemID) VALUES (?,CURDATE(),?,?)",
            [
              "An item has been tagged for donation.",
              item.user_id,
              item.id
            ],
            (error, logResult) => {
              if(error) {
                console.log(error);
              }
            }
          )
        }
        
    })
    
  });




app.get('/request', async function (req, res) {
   
    connection.query(
      'SELECT r.*, CONCAT(u.fname, " ", u.lname) AS requestor, c.name as item_requested FROM `user` u, `request` r, `category` c WHERE r.userID = u.id AND r.categoryID = c.id AND status1 = "Pending" ORDER BY date_requested DESC ;',
      function (error, results, fields) {
      if (error) throw error;
      // console.log(results);
      res.json(results) //send
    });
})

app.get('/requestTech', async function (req, res) {
   
  connection.query(
    'SELECT r.*, CONCAT(u.fname, " ", u.lname) AS requestor, c.name as item_requested FROM `user` u, `request` r, `category` c WHERE r.userID = u.id AND r.categoryID = c.id ORDER BY date_requested DESC ;',
    function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    res.json(results) //send
  });
})

app.get('/requestAdmin', async function (req, res) {
   
  connection.query(
    'SELECT r.*, CONCAT(u.fname, " ", u.lname) AS requestor, c.name AS item_requested FROM `user` u, `request` r, `category` c WHERE r.userID = u.id AND r.categoryID = c.id AND status2 = "Pending" ORDER BY date_requested DESC ;',
    function (error, results, fields) {
    if (error) throw error;

    res.json(results) 
  });
})

app.post('/request-create', (req, res) => {
  const item = req.body;

  // connection.query(
  //   "SELECT COUNT(*) AS stock FROM `item` WHERE categoryID = " + item ,
  // )

  connection.query(
    "INSERT INTO request (name, description, type, quantity, date_requested, date_needed, status1, status2, unit, unit_cost, total_amount, payee, payment_instruction, labor_cost, categoryID, userID) VALUES (?,?,?,?,CURDATE(),?,?,?,?,?,?,?,?,?,?,?)",
    [
      item.name,
      item.description,
      item.type,
      item.quantity,
      item.date_needed,
      item.status1,
      item.status2,
      item.unit,
      item.unit_cost,
      item.total_amount,
      item.payee,
      item.instruction,
      item.labor_cost,
      item.item,
      item.user_id
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

app.post('/request-status1', (req, res) => {
    const data = req.body;

    connection.query(
      "UPDATE request SET status1 = '" + data.status + "' WHERE id = " + data.id,
      (error, result) => {
        if(error){
          console.log(error);
        }
      }
    )
});

app.post('/request-status2', (req, res) => {
  const data = req.body;

  connection.query(
    "UPDATE request SET status2 = '" + data.status + "' WHERE id = " + data.id,
    (error, result) => {
      if(error){
        console.log(error);
      }
    }
  )
});

app.get('/log', async function (req, res) {
   
  connection.query(
    'SELECT l.*, l.id AS log_id, CONCAT(u.fname, " ", u.lname) AS user_name, i.*, c.name AS type FROM `user` u, `log` l, `item` i, `category` c WHERE l.userID = u.id AND l.itemID = i.id AND i.categoryID = c.id ORDER BY date_done DESC ;',
    function (error, results, fields) {
    if (error) throw error;

    res.json(results) 
  });
})

app.get('/accounts', async function (req, res){
  connection.query(
    "SELECT *, CONCAT(fname, ' ', lname) AS name FROM user WHERE status = 'Active'",
    (error, result) => {
    if(error){
      console.log(error);
    }

    res.json(result);
  });
})

app.post('/user-update', async function (req, res){
  const data = req.body;

  connection.query(
    "UPDATE user SET fname = '" +data.fname+ "', lname = '" +data.lname+ "', contact_no = '" +data.contact_no+ "', authority = '" +data.authority+ "', email = '" +data.email+ "', password = '" +data.password+ "', status = '" +data.status+ "' WHERE id = " +data.id,
    (error, result) => {
      if(error){
        console.log(error);
      }
    }
  )
})

app.post('/user-create', (req, res) => {
  const data = req.body;

  connection.query(
    "INSERT INTO user (fname, lname, contact_no, date_created, authority, email, password, status) VALUES (?,?,?, CURDATE(),?,?,?,?)",
    [
      data.fname,
      data.lname,
      data.contact_no,
      data.authority,
      data.email,
      data.password,
      data.status
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});


  


  app.listen(5000)