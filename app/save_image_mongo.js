(function() {

  "use strict";

  var
    fs = require("fs"),
    mongo = require("mongodb"),
    image = fs.readFileSync("unicorn.jpg");

  mongo.connect("mongodb://localhost:27017", function(err, mongoConnection) {

    if (err) throw err;

    var dbFileStorage = mongoConnection.db("FileStorage");


    console.log("Retrieving files collection...");
    dbFileStorage.collection("Files")
      .find().toArray(function(err, files) {
        console.log(files);

        console.log("Updating files collection...");
        dbFileStorage.collection("Files").update({
            "_id": new mongo.ObjectID("551bf0b7eb312027ea98a93c")
          }, {
            $set: {
              name: "unicorn.jpg",
              size: image.length,
              data: new mongo.Binary(image),
              modified: Date.now()
            }
          },
          function(err, result) {

            if (err) {
              console.log("error");
              //throw err
            } else {
              console.log("success");
              //console.log(result);
            }

            console.log("Retrieving files collection...");
            dbFileStorage.collection("Files")
              .find().toArray(function(err, files) {
                console.log(files);
                fs.writeFile("image.jpg", files[0].data.buffer, function(err) {

                  if (err) throw err;

                  console.log("image file written");


                });
                mongoConnection.close();
              });


          });
      });


  });


}());
