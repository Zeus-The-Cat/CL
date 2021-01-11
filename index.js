const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:Disney3858@mainc.fhz58.mongodb.net/MainC?retryWrites=true&w=majority";

//Connect to Mongodb----------------------------------------
const client = new MongoClient(uri, { useUnifiedTopology: true });
async function run() {
  try {
    await client.connect();
    const database = client.db('hr-summaries');
    const collection = database.collection('summaries');
    // Query data
    //query constraints //projection return data
    const query = { congress: "116", "current-chamber":"HOUSE" };
    const projection = {
      "measure-number": 1,
      "origin-chamber": 1,
      "orig-publish-date":1,
      "current-chamber":1,
      "action-date":1,
      "action-desc":1,
      "title":1
    }
    const cursor = collection.find(query).project(projection);
    count = 0;
    await cursor.forEach((each)=>{
      if(count >= 10){
      }else{
        console.log(each)
        count+=1;
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
//END CONNECT TO MONGO DB-----------------------------
//https://docs.mongodb.com/drivers/node/fundamentals/crud/read-operations/retrieve

// jsonFormat = {
//   mainImg : "link", //House/Sen image
//   title : "",
//   author : "",
//   cosponsors : [],
//   originated : "", //Comittee, house, sen, other
//   current-status : {
//     img : "", //House/Sen/comittee/president
//     text : "" //current status
//   },
//   auth-date : "", //date bill was first introduced
//   session : "",
//   body : "" //Raw Publicly available data
// }
