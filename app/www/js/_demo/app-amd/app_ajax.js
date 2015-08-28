define(['jquery'], function() {

  function MyPromise(fn) {

    var resolveFns = [],
      rejectFns = [];

    function resolve(result) {
      resolveFns.forEach(function(resolveFn) {
        resolveFn(result);
      });
    }

    function reject(result) {
      rejectFns.forEach(function(rejectFn) {
        rejectFn(result);
      });
    }

    this.then = function(resolveFn, rejectFn) {

      var that = {};

      var resolveFnResult, rejectFnResult;

      function xResolveFn(result) {
        resolveFnResult = resolveFn(result);
        //that.itResolved(resolveFnResult);
      }

      function xRejectFn(result) {
        rejectFnResult = rejectFn(result);
        //that.itRejected(rejectFnResult);
      }

      /*
      var newPromise = new MyPromise(function(resolve, reject) {
      	that.itResolved = function(result) {
      		resolve(result);
      	}
      	that.itRejected = function(result) {
      		reject(result);
      	}
      });
      */


      if (resolveFn) {
        resolveFns.push(xResolveFn);
      }
      if (rejectFn) {
        rejectFns.push(xRejectFn);
      }

      //return newPromise;


    }

    fn(resolve, reject);
  }

  /*
  var p = new MyPromise(function(resolve, reject) {
  	setTimeout(function() {
  		resolve("some data");
  	}, 2000);
  });
  p.then(function() {
  	console.log("it worked...");
  }).then(function() {
  	console.log("it really did work...");
  }).then(function() {
  	console.log("it really really did work...");
  });
  */

  function myAjax(url) {

    var p = new Promise(function(resolve, reject) {

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
      };

      xhr.open("GET", "/api/widgets");
      xhr.send();
    });

    return p;
  }

  var testP = myAjax("/api/widgets").then(function(result) {
    console.log("async op 1");
    //return Promise.reject("they did not like it");
    return myAjax("/api/widgets");
  });

  testP.then(function() {
    console.log("resolved");
  }, function() {
    console.log("rejected");
  });

  testP.then(function() {
    console.log("resolved");
  }, function() {
    console.log("rejected");
  });

  //.then(function() {
  //	console.log("async op 3");
  //});
  //console.log("waiting...");

  //request("/api/widgets").then(function() {
  //	console.dir(arguments);
  //});

});
