$(document).ready(function () {
    $('.submit').on('click', function (event) {
        event.preventDefault(); // prevent the form from submitting normally
        const email = $('input[name="email"]').val();
        const password = $('input[name="password"]').val();

        console.log((email, password))
        $.post('http://localhost:3000/login', { email, password }, function (data) {
            // handle successful login response
            window.location.href = '/welcome'; // redirect to dashboard page
        }).fail(function (xhr) {
            const response = JSON.parse(xhr.responseText);
            if (response.error === 'invalidCredentials') {
                alert('Invalid email or password'); // display error message
            } else {
                alert('An error occurred. Please try again later.'); // display generic error message
            }
        });
    });
});
