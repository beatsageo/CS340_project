function deleteItem(LibraryItemID) {
    let link = '/delete-item-ajax/';
    let data = {
      id: LibraryItemID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(LibraryItemID);
      }
    });
  }
  
  function deleteRow(LibraryItemID){
      let table = document.getElementById("library-items-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == LibraryItemID) {
              table.deleteRow(i);
              break;
         }
      }
  }