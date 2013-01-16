var $G = Alloy.Globals;
var moment = require("moment");

if (!$G.$K) {
    //
    // LEAVE THIS HERE FOR NOW
    //
    Ti.include("kinvey-titanium-0.9.12.js");
    Kinvey.init({
        appKey : "kid_eT6Q6xLpBM",
        appSecret : "5480069be69047759f3219a30e292a74"
    });

    // Save Kinvey into a global object
    $G.$K = Kinvey;

    // Initialize the global todos object
    $G.TODOS = new $G.$K.Collection("todos");
    Alloy._.extend($G.TODOS, Alloy.Backbone.Events);
    //Alloy._.extend($G.TODOS, Alloy._); debugger;

    // verify service...
    $G.$K.ping({
        success : function(response) {

            // get the data...
            $G.TODOS.fetch({
                add : false,
                success : function() {
                    $G.TODOS.trigger('fetch');
                }
            });

            // log info
            Ti.API.info("Kinvey Ping Success. Kinvey Service is alive, version: " + response.version + ", response: " + response.kinvey);
        },
        error : function(error) {
            Ti.API.info("Kinvey Ping Failed. Response: " + error.description);
        }
    });
}