// Import Express
const express = require("express");
const fs = require('fs')
// Create an Express app
const app = express();

// Set port number
const PORT = 5000;

// Define a basic route
app.get("/", (req, res) => {
  // Respond with 'Hello, World!' when visiting the root URL
  res.send("Hello, World!");
});

app.get("/users",(req,res)=>{
  fs.readFile("users.json","utf-8",(err,data)=>{
      if(err) console.log(err)
        const users = JSON.parse(data)
      res.send(users)
  })
})


app.get("/users/:id",(req,res)=>{
  fs.readFile("users.json","utf-8",(err,data)=>{
      if(err) console.log(err)
        const users = JSON.parse(data)
        const usersArray = Object.values(users)
        console.log(usersArray)
        const user = usersArray.find((u) => u.id === parseInt(req.params.id))
        console.log(user)
        if (!user) return res.status(404).send("User not found")
      res.send(user)
  })
})

app.get("/users/profession/:profession", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    const users = JSON.parse(data);
    const usersArray = Object.values(users);
    const user = usersArray.find((u) => u.profession === req.params.profession);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  });
});

app.get("/users/name/:name", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) console.log(err);
    const users = JSON.parse(data);
    const usersArray = Object.values(users);
    const user = usersArray.find((u) => u.name === req.params.name);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  });
});

// Start the server
app.listen(PORT, () => {
  // Log server is running
  console.log(`Server running on http://localhost:${PORT}`);
});
