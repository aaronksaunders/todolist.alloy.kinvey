$.addBtn.addEventListener('click', function() {
    // add todo item

    var todo = new $G.$K.Entity({
        item : $.itemField.value,
        done : 0
    }, "todos");
    // not needed with Kinvey
    // $G.TODOS.add(todo);

    todo.save();

    $.addWin.close();

    $G.TODOS.fetch({
        add : false,
        success : function() {
            $G.TODOS.trigger('fetch');
        }
    });
});

$.cancelBtn.addEventListener('click', function() {
    $.addWin.close();
});
