# THIS DOCUMENTATION NEEDS TO BE UPDATE... IT IS WRONG

# Welcome to your Appcelerator Alloy Todo Sample with Kinvey Adapter #

## Basic Model and Collection fetch ##

When fetching items, you should use the callbacks of success and error. The parameters
of `model` and `response` return exactly what they say when the call is completed

	var todo = Alloy.createModel('Todo');
	
	todo.fetch({
		success : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		},
		error : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		}
	});

### Basic Model, fetch by id ###
Using the adapter with collections to get a single item, just provide the object id

	/* HOW TO FETCH A SINGLE ITEM */
	var todo = Alloy.createModel('Todo', {
	    id : "38e8aa8f-714d-3634-68b3-c825eb61b9e1"
	});
	
	// ths should return a collection
	todo.fetch({
		success : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		},
		error : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		}
	});


### Basic Collection, fetch all items ###
Using the adapter with collections to get all items

	/* HOW TO FETCH A SINGLE ITEM */
	var todo = Alloy.createModel('Todo', {
	    id : "38e8aa8f-714d-3634-68b3-c825eb61b9e1"
	});
	
	// this should return a model and not a collection
	todo.fetch({
		success : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		},
		error : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		}
	});

### Custom Collection Query, Extending Collection Object ###
To create custom queries, you can extend the model object. In the example below,
I have extended the model object with a custom query to fetch what items I completed
today.

	// app/models/todo.js
	// ------------------
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {

	        /**
	         * returns all objects that were completed today
	         */
	        completedToday : function(_options) { 
	            var self = this;

	            // this can be more elegant, but kept it simple for demo purposes
	            //
	            // db.execute("SELECT FROM " + table + " " + opts.query.sql, opts.query.params);
	            //
	            var yesterday, tomorrow;

	            // get today and reset to midnight
				// moment().hours(0).minutes(0).seconds(1)
				//
				
				// use moment.js to calc yesterday and today
	            yesterday = moment().hours(0).minutes(0).seconds(1).subtract('days', 1);
	            tomorrow = moment().hours(0).minutes(0).seconds(1).add('days', 1);

	            // debug information
	            Ti.API.info("today " + moment().hours(0).minutes(0).seconds(1).calendar());
	            Ti.API.info("yesterday " + yesterday.calendar());
	            Ti.API.info("tomorrow " + tomorrow.calendar());

				// push the params for the query into array
	            var p = [];
	            p.push(yesterday.unix());
	            p.push(tomorrow.unix());
				
				// this is the query string that we will perform substitution on in the 
				// sql adapter
				var s =  'WHERE date_completed between ? AND ?';
				
	            // pass params
	            _options['query'] = {
	                "sql" : s,
	                "params" : p
	            };
				
				// execute normal fetch
	            self.fetch(_options);
	        },
    });
    // end extend


## Author

**Aaron K. Saunders**  
web: http://www.clearlyinnovative.com

email: aaron@clearlyinnovative.com

twitter: @aaronksaunders  

## License

    Copyright (c) 2013- Aaron K. Saunders

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.