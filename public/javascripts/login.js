
// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    // Add User button click
    $('#signUp').on('click', addSignUpInput);
    // Sign In (also back button if signing up)
    $('#signIn').on('click', signUp);
});

// Functions =============================================================

// Add Sign Up Fields
function addSignUpInput(event){
    event.preventDefault();
    var inputCount = 0;
    $('#inputDiv input').each(function(index, val) {
        inputCount++;
    });
    //add email input if only user and pass are showing
    if (inputCount == 2) {
        $("#inputDiv").append("<input class='form-control inputField' id='email' name='email' type='text' placeholder='Email Address: example@gmail.com'/>");  
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

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#user').val(),
            'password': $('#pass').val(),
            'email': $('#email').val()
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
        if($(this).val() === '') { inputCount++; }
    });

    if (inputCount > 2) {
        //this button is acting as a back button to go to "orignal sign in template"
        var removeCount = 0;
        $('#inputDiv input').each(function(index, val) {
            if($(this).val() === '') { removeCount++; }
            if(removeCount > 2){ $(this).remove(); }
        });
        $("#signIn").text("Sign In");
    }
}
