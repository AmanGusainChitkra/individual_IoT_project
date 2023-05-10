$(document).ready(function() {
    $('.submit').on('click',function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the form data and convert it to an object
      const formData = $('form').serializeArray().reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
      }, {});
  
      // Send the form data to the API endpoint using $.post()
      $.post('http://localhost:3000/register', formData)
        .done(function(response) {
          console.log(response);
          location.href = '/login';
          // Handle the success response
        })
        .fail(function(error) {
          console.log(error);
          if (error.responseJSON.error === 'uniqueUser') {
            console.log('Unique email!');
            $('.warning').text("User with the given email already exists!");
          }
          // Handle the error response
        });
    });
  });
  