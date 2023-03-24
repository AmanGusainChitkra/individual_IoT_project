$(document).ready(function() {
    $.get("books/book1.txt", function(data) {
      $("#readchp").html(data);
    });
  });
  