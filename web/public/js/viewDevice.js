$(function () {
  $("#navbar-placeholder").load("navbar.html");
});

var light;
var ac;
var security;
const list = document.querySelectorAll(".list");

function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) => item.addEventListener("click", activeLink));

$('#lightC').hide();
$('#acC').hide();
$('#securityC').show();

$('#ac').on('click', () => {
  $('#acC').show();
  $('#lightC').hide();
  $('#securityC').hide();
})

$('#light').on('click', () => {
  $('#lightC').show();
  $('#acC').hide();
  $('#securityC').hide();
})

$('#security').on('click', () => {
  $('#lightC').hide();
  $('#acC').hide();
  $('#securityC').show();
})


$.get('http://localhost:5000/light', (res) => {
  const light = res;
  console.log(res);
  light.forEach((device) => {
    createCardlight(device);
  });
})
  .then(() => {
  
    $('#lightC .card button.delete').click(function () {

      // Find the parent card element of the clicked button
      const $card = $(this).closest('.card');

      // Extract the values from the card element
      const id = $card.attr('id');
      console.log('ID: ', id);

      $.ajax({
        url: 'http://localhost:5000/deletedevices',
        type: 'DELETE',
        data:{"id": id},
        success: function(result) {
            console.log('Component deleted successfully');
          location.reload();

            // handle success case
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error deleting component');
        }
    });
    });

    $('#lightC .card button.submit').click(function () {

      // Find the parent card element of the clicked button
      const $card = $(this).closest('.card');

      // Extract the values from the card element
      const id = $card.attr('id');
      const name = $card.find('h2').text();
      const description = $card.find('p').text();
      const color = $card.find('#color-picker').val();
      const statusN = $card.find('.input__check').is(':checked');

      // Print the extracted values
      console.log('Name:', name);
      console.log('Description:', description);
      console.log('Color:', color);
      console.log('Is checked:', statusN);
      console.log('ID: ', id);

      const deviceNewData = {
        "data": {
          "status": statusN,
          "color": color,
        },
        "id": id
      }

      $.ajax({
        url: 'http://localhost:5000/udeviceLight',
        type: 'PUT',
        data: deviceNewData,
        success: function (response) {
          console.log(response);
        },
        error: function (error) {
          console.log(error);
        }
      });
    });

  })

$.get('http://localhost:5000/ac', (res) => {
  const ac = res;
  console.log(res);
  ac.forEach((device) => {
    createCardAC(device);
  })
})
  .then(() => {
    $('#acC .card button.delete').click(function () {

      // Find the parent card element of the clicked button
      const $card = $(this).closest('.card');

      // Extract the values from the card element
      const id = $card.attr('id');
      console.log('ID: ', id);

      $.ajax({
        url: 'http://localhost:5000/deletedevices',
        type: 'DELETE',
        data:{"id": id},
        success: function(result) {
            console.log('Component deleted successfully');
          location.reload();

            // handle success case
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error deleting component');
        }
    });
    });
    $('.plus, .minus').on('click', function () {
      const $card = $(this).closest('.card');
      const $fanSpeed = $card.find('.fan_speed');
      const step = parseInt($(this).data('step'));
      const speed = parseInt($fanSpeed.data('speed')) + step;
      const maxSpeed = 60; // maximum fan speed
      $fanSpeed.data('speed', Math.max(0, Math.min(maxSpeed, speed))).text($fanSpeed.data('speed'));
      $fanSpeed.attr('data-speed', speed)
    });

    $('#acC .card button.submit').click(function () {

      //Find the parent card element of the clicked button
      const $card = $(this).closest('.card');

      // Extract the values from the card element
      const id = $card.attr('id');
      const name = $card.find('h2').text();
      const description = $card.find('p').text();
      const fanSpeed = $card.find('.fan_speed').attr('data-speed');
      const statusN = $card.find('.input__check').is(':checked');

      // Print the extracted values
      console.log('Name:', name);
      console.log('Description:', description);
      console.log('Is checked:', statusN);
      console.log('ID: ', id);
      console.log('Fanspeed: ', fanSpeed);

      const deviceNewData = {
        "data": {
          "status": statusN,
          "fanspeed": fanSpeed
        },
        "id": id
      }

      $.ajax({
        url: 'http://localhost:5000/udeviceAC',
        type: 'PUT',
        data: deviceNewData,
        success: function (response) {
          console.log(response);
        },
        error: function (error) {
          console.log(error);
        }
      });

    })

  });


$.get('http://localhost:5000/security', (res) => {
  const ac = res;
  console.log(res);
  ac.forEach((device) => {
    createCardSecurity(device);
  })
})
  .then(() => {

    $('#lightC .card button.delete').click(function () {

      // Find the parent card element of the clicked button
      const $card = $(this).closest('.card');

      // Extract the values from the card element
      const id = $card.attr('id');
      console.log('ID: ', id);

      $.ajax({
        url: 'http://localhost:5000/deletedevices',
        type: 'DELETE',
        data:{"id": id},
        success: function(result) {
            console.log('Component deleted successfully');
          location.reload();

            // handle success case
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error deleting component');
        }
    });
    });

    $('#securityC .card button.submit').click(function () {

      //Find the parent card element of the clicked button
      const $card = $(this).closest('.card');

      // Extract the values from the card element
      const id = $card.attr('id');
      const name = $card.find('h2').text();
      const description = $card.find('p').text();
      const statusN = $card.find('.input__check').is(':checked');
      const statusM = $card.find('.input__checkM').is(':checked');



      const deviceNewData = {
        "data": {
          "status": statusN,
          "motionDetect": statusM
        },
        "id": id
      }

      $.ajax({
        url: 'http://localhost:5000/udeviceSecurity',
        type: 'PUT',
        data: deviceNewData,
        success: function (response) {
          console.log(response);
        },
        error: function (error) {
          console.log(error);
        }
      });

    })

  });


// Add click event listener to the button in the card

function createCardlight(device) {
  const $card = $('<div>').addClass('card').attr('id', device._id);
  const $h2 = $('<h2>').text(device.name);
  const $p = $('<p>').text(device.description);
  const $switchLabel = $('<label>').addClass('switch');
  const $switchInput = $('<input>').attr('type', 'checkbox').addClass('input__check');
  const $switchSpan = $('<span>').addClass('slider');
  const $button = $('<button>').addClass('submit').text('UPDATE');
  const $colorP = $('<input>').attr('type', 'color').attr('id', 'color-picker');

  const $deleteButton = $('<button>').addClass('btn').addClass('delete').addClass('btn-delete');
  const $deleteSpan = $('<span>').addClass('mdi').addClass('mdi-delete').addClass('mdi-24px');
  const $deleteSpan2 = $('<span>').addClass('mdi').addClass('mdi-delete-empty').addClass('mdi-24px');
  $deleteButton.append($deleteSpan);
  $deleteButton.append($deleteSpan2);

  if (device.data != null) {
    $switchInput.attr('checked', device.data.status);
    $colorP.val(device.data.color);
  }
  $switchLabel.append($switchInput);
  $switchLabel.append($switchSpan);

  $card.append($h2);
  $card.append($p);
  $card.append($colorP);
  $card.append($switchLabel);
  $card.append($deleteButton);
  $card.append($button);

  $(`#${device.category}C`).append($card);

}

function createCardAC(device) {
  const $card = $('<div>').addClass('card').attr('id', device._id);
  const $h2 = $('<h2>').text('AC');
  const $p = $('<p>').text('Lorem ipsum dolor sit amet');
  const $switchLabel = $('<label>').addClass('switch');
  const $switchInput = $('<input>').attr('type', 'checkbox').addClass('input__check');
  const $switchSpan = $('<span>').addClass('slider');
  const $button = $('<button>').addClass('submit').text('UPDATE');
  const $spinnerO = $('<div>').addClass('spinner');
  const $spinnerI = $('<div>').addClass('spinnerin');
  const $fanBP = $('<button>').addClass('fanB').addClass('plus').attr('data-step', '1');
  const $fanBM = $('<button>').addClass('fanB').addClass('minus').attr('data-step', '-1');
  const $fanSpeed = $('<span>').addClass('fan_speed').attr('data-speed', '0').text('0');
  const $iconP = $('<ion-icon>').attr('name', 'add-outline');
  const $iconM = $('<ion-icon>').attr('name', 'remove-outline');

  const $deleteButton = $('<button>').addClass('btn').addClass('delete').addClass('btn-delete');
  const $deleteSpan = $('<span>').addClass('mdi').addClass('mdi-delete').addClass('mdi-24px');
  const $deleteSpan2 = $('<span>').addClass('mdi').addClass('mdi-delete-empty').addClass('mdi-24px');
  $deleteButton.append($deleteSpan);
  $deleteButton.append($deleteSpan2);

  $fanBP.append($iconP);
  $fanBM.append($iconM);
  if (device.data != null) {
    $fanSpeed.attr('data-speed', device.data.fanspeed).text(device.data.fanspeed);
    $switchInput.attr('checked', device.data.status);
  }
  $switchLabel.append($switchInput);
  $switchLabel.append($switchSpan);

  $spinnerO.append($spinnerI);

  $card.append($h2);
  $card.append($p);
  $card.append($switchLabel);
  $card.append($button);
  $card.append($deleteButton);
  $card.append($spinnerO);
  $card.append($fanBP);
  $card.append($fanSpeed);
  $card.append($fanBM);

  $(`#${device.category}C`).append($card);
}

function createCardSecurity(device) {
  const $card = $('<div>').addClass('card').attr('id', device._id);
  const $h2 = $('<h2>').text('AC');
  const $p = $('<p>').text('Lorem ipsum dolor sit amet');
  const $switchLabel = $('<label>').addClass('switch');
  const $switchInput = $('<input>').attr('type', 'checkbox').addClass('input__check');
  const $switchSpan = $('<span>').addClass('slider');

  const $h3 = $('<h3>').text('Motion Sense: ');

  const $switchLabelM = $('<label>').addClass('switch').addClass('motion');
  const $switchInputM = $('<input>').attr('type', 'checkbox').addClass('input__checkM');
  const $switchSpanM = $('<span>').addClass('slider');

  const $button = $('<button>').addClass('submit').text('UPDATE');

  const $deleteButton = $('<button>').addClass('btn').addClass('delete').addClass('btn-delete');
  const $deleteSpan = $('<span>').addClass('mdi').addClass('mdi-delete').addClass('mdi-24px');
  const $deleteSpan2 = $('<span>').addClass('mdi').addClass('mdi-delete-empty').addClass('mdi-24px');
  $deleteButton.append($deleteSpan);
  $deleteButton.append($deleteSpan2);


  if (device.data != null) {
    $switchInput.attr('checked', device.data.status);
    $switchInputM.attr('checked', device.data.motionDetect);
  }
  $switchLabel.append($switchInput);
  $switchLabel.append($switchSpan);
  $switchLabelM.append($switchInputM);
  $switchLabelM.append($switchSpanM);


  $card.append($h2);
  $card.append($p);
  $card.append($switchLabel);
  $card.append($deleteButton);
  $card.append($h3);
  $card.append($switchLabelM);
  $card.append($button);

  $(`#${device.category}C`).append($card);
}
