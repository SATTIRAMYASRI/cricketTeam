const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const dbPath = path.join(__dirname, "cricketTeam.db");

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
  } catch (error) {
    console.log(`DB Error:${error.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

const convertingObjectToArray=(playerObject)=>
{
    playerId: playerObject.player_id,
    playerName: playerObject.player_name,
    jerseyNumber: playerObject.jersey_number,
    role: playerObject.role,
}
app.get("/players/",async(request,response)=>
{
    const gettingAllPlayerList=`SELECT * FROM cricket_team;`;
    const playersArray=await db.all(gettingAllPlayerList);
    response.send(playersArray.map(value=>convertingObjectToArray(value)));
});
module.exports=app;