$(function () {
  $("#navbar-placeholder").load("navbar.html");
});

$('#device-form').on('submit', (event) => {
  event.preventDefault();
  const formData = $('#device-form').serializeArray();
  const deviceData = {}
  for (let i = 0; i < formData.length; i++) {
    const field = formData[i];
    deviceData[field.name] = field.value;
  }

  $.post('https://apismartindi.onrender.com/rdevice', deviceData)
  .done((response) => {
    console.log(response);
    $('.error').text("Successfully Registered !");

  })
  .fail((error) => {
    if (error.responseJSON.error === 'uniqueDevice') {
      console.log('Unique name!');
      $('.error').text("Device with the given name already exists!");
    }
  });
})