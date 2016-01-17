
// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    $.getJSON('http://localhost:3000/json/SchoolList.json', function(data){
        htmlFormattedString = '<option>Select School</option>';
        for (i = 0; i < data.length; i++) {
            htmlFormattedString = htmlFormattedString + '<option>'+data[i].name + ' - '+ data[i].code+'</option>';
        }
        $('#school').append(htmlFormattedString);
    });
    


    // Add User button click
    $('#signUp').on('click', addSignUpInput);
    // Sign In (also back button if signing up)
    $('#signIn').on('click', signUp);
});

// Functions =============================================================

function toggleDropdown(event){
    $('.dropdown-toggle').dropdown();
}

// Add Sign Up Fields
function addSignUpInput(event){
    event.preventDefault();
    var inputCount = 0;
    $('#inputDiv input').each(function(index, val) {
        inputCount++;
    });
    //add email input if only user and pass are showing
    if (inputCount == 2) {
        $("#pass").after("<input class='form-control inputField' id='email' name='email' type='text' placeholder='Student Email Address: example@school.edu'/>");  
        $("#signIn").text("Back");
    } else if (inputCount == 3) {
        //try to add the user
        addUser();
    } 
    
}
// Add User
function addUser() {

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#inputDiv input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    if ($('#school').val() === 'Select School') {
        errorCount++;
    }

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#user').val(),
            'password': $('#pass').val(),
            'email': $('#email').val(),
            'school': $('#school').val().split(" - ")[1]
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: 'http://localhost:3001/userlist/postNewItem',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                alert('Thank you for signing up: ' + newUser['username']);
                // Clear the form inputs
                $('#inputDiv input').val('');
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

//sign up
function signUp(event) {
    event.preventDefault();

    var inputCount = 0;
    $('#inputDiv input').each(function(index, val) {
        inputCount++;
    });

    if (inputCount > 2) {
        //this button is acting as a back button to go to "orignal sign in template"
        $('#email').remove();
        $("#signIn").text("Sign In");
    } else if (inputCount == 2){
        //use ajax to check sign in
        var url = 'http://localhost:3001/userlist/checkLoginCredentials/'+$('#user').val()+'/'+$('#pass').val();
        $.get( url, function( data ) {
            if (data.isLoginValid === 'true') {
                window.location.replace("http://localhost:3000/home");
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: invalid login credentials');

            }
        });
        
    }
}


