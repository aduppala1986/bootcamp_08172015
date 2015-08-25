define(['jquery'], function() {

    console.log("app loaded...HELLO WORLD!!!");

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      console.log(xhr.readyState + " " + xhr.status);
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };

    xhr.open("GET", "/api/widgets");
    xhr.send();

    $.ajax("/api/widgets").then(function(result) {
      console.dir(result);
    });

  });
