$G.TODOS.on('fetch', function() {

    Ti.API.info('update done list'); debugger;

    var rows = [], i = 0;

    var doneArray = _.filter($G.TODOS.list, function(_i) {
        return _i.get("done") === 1;
    });
    for (; i < doneArray.length; i++) {
        var _i = doneArray[i];
        rows.push(Ti.UI.createTableViewRow({
            title : _i.get("item") + " DONE",
            id : _i.get("_id")
        }));
    }
    $.doneTable.setData(rows);
});
