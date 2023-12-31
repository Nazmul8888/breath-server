const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware id breath pass- oypeBwxiIfpG3wLP
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6nodxbc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const breathCollection = client.db('breathDB').collection('news');
    const missionCollection = client.db('breathDB').collection('mission')

    app.get('/news', async(req,res)=>{
        const cursor = breathCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/mission', async(req,res)=>{
      const cursor = missionCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('breath ness is coming')
})

app.listen(port, () => {
  console.log(`Breath ness server is running on port ${port}`)
})