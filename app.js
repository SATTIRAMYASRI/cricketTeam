const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "cricketTeam.db");

const app = express();

// app.use(express.json());

let db= null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer()
const convertObjectToArray=(playerObject)=>
{
    return 
    {
    playerId:playerObject.player_id,
    playerName:playerObject.player_name,
    jerseyNumber:playerObject.jersey_number,
    role:playerObject.role
  },
};
app.get("/players/",async(request,response)=>
{
    const playersQuery=`SELECT * FROM cricket_team`;
    const playersArray=await db.all(playersQuery);
    response.send(playersArray.map((value)=>convertObjectToArray(value)));
});
app.get("/players/:playerId/",async(request,response)=>
{
    const {playerId}=request.params;
    const playerQuery=`SELECT * FROM cricket_team WHERE player_id=${playerId};`;
    const playersArray=await db.get(playersQuery);
    response.send(playersArray.map((value)=>convertObjectToArray(value)));
})
module.exports=app;
