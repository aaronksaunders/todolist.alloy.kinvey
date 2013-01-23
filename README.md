# THIS DOCUMENTATION NEEDS TO BE UPDATED

# Welcome to your Appcelerator Alloy Todo Sample with Kinvey Adapter #

## Changes to get Kinvey working with Appcelerator Alloy ##


### Including Libraries ###
We need to include the kinvey library and initialize it

	Ti.include("kinvey-titanium-0.9.12.js");
	Kinvey.init({
	    appKey : "kid_eT6Q6xLpBM",
	    appSecret : "5480069be69047759f3219a30e292a74"
	});


### Missing `models` array on the Collections ###
Kinvey Collections use the field list instead of Models, so we just need to becareful
in our code

    // simple hack for finding an item in a collection
	// we could extend the object to put the list where models
	// should be so we can use the default functionality of 
	// Backbone
	TODOS = new Kinvey.Collection("todos"); 
    var model = _.filter(TODOS.list, function(_i){
       return _i.get("_id") === e.rowData.id;
    });
	
	
### Missing `models` and `collections` event binding ###

    TODOS = new Kinvey.Collection("todos");
    Alloy._.extend(TODOS, Alloy.Backbone.Events);  

here we add events to the model
	
    todoModel = new Kinvey.Entity("todos");
    Alloy._.extend(todoModel, Alloy.Backbone.Events);

This allows us to trigger the fetch and change events on models and collections.

	TODOS = new Kinvey.Collection("todos");
	TODOS.fetch({
	    add : false,
	    success : function() {
			// if someone is listening for fetch to update
	        TODOS.trigger('fetch');
	    }
	});

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