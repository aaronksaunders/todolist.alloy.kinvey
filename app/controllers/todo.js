$G.TODOS.on('fetch', function() { debugger;
    Ti.API.info(' on fetch ');
    updateContent($G.TODOS);
});

$.todoTable.on('click', function(e) {
    Ti.API.info('ID:' + e.rowData.id); debugger;

    var model = _.filter($G.TODOS.list, function(_i){
    return _i.get("_id") === e.rowData.id;
    });
    model = model.length && model[0] || null;

    // @TODO better way??
    if (model) {
        model.set("done", 1);
        model.set("date_completed", moment().unix());
        model.save();
    }

    // update view
    $G.TODOS.fetch({
        add : false,
        success : function() {
            $G.TODOS.trigger('fetch');
        }
    });
});

function updateContent(_collection) {
    var rows = [], i = 0, len = _collection.list.length;
    for (; i < len; i++) {
        var _i = _collection.list[i];
        rows.push(Ti.UI.createTableViewRow({
            title : _i.get("item") + " " + (_i.get("done") ? "DONE" : ""),
            id : _i.get("_id")
        }));

        Ti.API.info(JSON.stringify(_i, null, 2));

        // moment.unix(i.date_update).calendar()
        _i.get("date_completed") && Ti.API.info("time " + moment.unix(_i.get("date_completed")).calendar());
    }
    $.todoTable.setData(rows);
};

function addToDoItem() {
    var controller = Alloy.getController("add");
    controller.addWin.open();
}

//
// STUB FOR ANDROID MENUS ON IOS
//
if (Titanium.App.iOS === undefined) {

    $.todoWin.activity.onCreateOptionsMenu = function(e) {

        var menu = e.menu;
        var menuItem = menu.add({
            title : "Add Item"
        });
        menuItem.addEventListener("click", addToDoItem);
    }
} else {
    var addBtn = Ti.UI.createButton({
        title : '+'
    });
    addBtn.addEventListener('click', addToDoItem);
    $.todoWin.setRightNavButton(addBtn);

}

