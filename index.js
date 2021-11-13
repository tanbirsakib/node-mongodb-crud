const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('running my curd server');
})

app.listen(port, () =>{
   console.log( "listening to port babe", port);
})

//mongodbuser : mongodb-start
// mongoPass : 3dT7U59i28lsjrng


const uri = "mongodb+srv://mongodb-start:3dT7U59i28lsjrng@cluster0.mgweq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
  try {
    await client.connect();
    const database = client.db("first-mongodb");
    const usersCollection = database.collection("users");
    //GET API
    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      // console.log(users)
      res.send(users)
    })
// POST API
 app.post('/users', async (req, res) => {
   console.log("hitting the post", req.body)
   const newUser = req.body;
   const result = await usersCollection.insertOne(newUser);
   res.json(newUser);
 })

 //delete api
 app.delete('users/:id', async (req, res) => {
   const id = req.params.id;
   const query = {_id : ObjectId(id)};
   const result = await usersCollection.deleteOne(query);
   console.log('deleting user with id ', id)
   res.json(1)
 })

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
