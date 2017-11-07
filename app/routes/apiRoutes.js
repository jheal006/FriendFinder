// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================


// var tableData = require("../data/tableData");
// var waitListData = require("../data/waitinglistData");
var friendsData = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------


  app.post("/api/friends", function(req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      newScore: "",
    };
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    var newFriend = req.body;
        //Comparative Loop
        // Loop through Existing Characters / Friends
        var lowestScore;
        var newScore = 1000;
        for (var i = 0; i < friendsData.length-1; i++) {
          var comparisonScore =  0;
          var totalDifference = [];
          // Loop through Individual Friend Scores
            for (var j = 0; j < friendsData[i].scores.length; j++) {
              totalDifference.push(Math.abs(newFriend.scores[j] - friendsData[i].scores[j]));
            }
          // Sum the totalDifference Scores to find that of the lowest number for the best match!
            for (var k in totalDifference)
            {
              comparisonScore += totalDifference[k];
            }
          //Compare comparisonScores as they loop through to determine the lowest score.
            console.log("FRIEND====", friendsData[i].name, "TOTAL DIFFERENCE====", totalDifference, "COMPARISON SCORE =====", comparisonScore);
            if (comparisonScore < newScore) {
              newScore = comparisonScore;
              bestMatch.name = friendsData[i].name;
              bestMatch.photo = friendsData[i].photo;
              bestMatch.newScore = newScore;
            }
        }
        console.log("NEW SCORE RESULT====", newScore, "BEST MATCH=====", bestMatch);
        //Push newly entered Friend info to FriendsData Array
        friendsData.push(newFriend);

        //Attempting to push the bestMatch info back to front end in order to properly display the modal.
        res.json(bestMatch);

  });

};
