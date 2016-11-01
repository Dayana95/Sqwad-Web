//create firebase reference
var dbRef = new Firebase("https://sqwad-app.firebaseio.com/");
var usersRef = dbRef.child('users')

var auth = null;
var auth = null;


 var authDataCallback = function(authData) {
        console.log("authCallback Event is called from onAuth Event");
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
          $('.unauthenticated, .userAuth').toggleClass('unauthenticated').toggleClass('authenticated');


        } else {
            console.log("User is logged out");
                    
        }
    }


    dbRef.onAuth(authDataCallback);




//Register
$('#doRegister').on('click', function (e) {
  e.preventDefault();
  $('#registerModal').modal('hide');
  $('#messageModalLabel').html('<span class="text-center text-info"><i class="fa fa-cog fa-spin"></i></span>');
  $('#messageModal').modal('show');

  if( $('#registerEmail').val() != '' && $('#registerPassword').val() != ''  && $('#registerConfirmPassword').val() != '' ){
    if( $('#registerPassword').val() == $('#registerConfirmPassword').val() ){
      //create the user
      dbRef.createUser({
        email    : $('#registerEmail').val(),
        password : $('#registerPassword').val()
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          $('#messageModalLabel').html('<span class="text-danger">ERROR: '+ error.code + '</span>')
        } else {
          //now user is needed to be logged in to save data
          dbRef.authWithPassword({
            email    : $('#registerEmail').val(),
            password : $('#registerPassword').val()
          }, function(error, authData) {
            if (error) {
              console.log("Login Failed!", error);
              $('#messageModalLabel').html('<span class="text-danger">ERROR: '+ error.code + '</span>')
            } else {
              console.log("Authenticated successfully with payload:", authData);
              auth  = authData;
              //now saving the profile data
              usersRef
                .child(userData.uid)
                .set({
                    firstName    : $('#registerFirstName').val(),
                    lastName    : $('#registerLastName').val(),
                    email    : $('#registerEmail').val(),
                    username: $('#registerUsername').val(),
                  }, function(){
                    console.log("User Information Saved:", userData.uid);
                  })
              $('#messageModalLabel').html('<span class="text-center text-success">Success!</span>')
              //hide the modal automatically
              setTimeout(  function () {
                $('#messageModal').modal('hide');
                //$('.unauthenticated, .userAuth').toggleClass('unauthenticated').toggleClass('authenticated');
                
              }, 500)
            }
          });
          console.log("Successfully created user account with uid:", userData.uid);
          $('#messageModalLabel').html('<span class="text-success">Successfully created user account!</span>')
        }
      });
    } else {
      //password and confirm password didn't match
      $('#messageModalLabel').html('<span class="text-danger">ERROR: Passwords didn\'t match</span>')
    }
  }  
});
//Login
$('#btnSqwad').on('click', function (e) {
  e.preventDefault();
  $('#loginModal').modal('hide');
  $('#messageModalLabel').html('<span class="text-center text-info"><i class="fa fa-cog fa-spin"></i></span>');
  $('#messageModal').modal('show');

  if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
    //login the user
    dbRef.authWithPassword({
      email    : $('#email').val(),
      password : $('#pwd').val()
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        $('#messageModalLabel').html('<span class="text-danger">ERROR: '+ error.code + '</span>')
      } else {
        console.log("Authenticated successfully with payload:", authData);
        auth  = authData;
        $('#messageModalLabel').html('<span class="text-center text-success">Success!</span>')
        setTimeout(  function () {
          $('#messageModal').modal('hide');
          //$('.unauthenticated, .userAuth').toggleClass('unauthenticated').toggleClass('authenticated');
         
        })
      }
    });
  }
});

   $("#logout").on('click', function() {
        dbRef.unauth();
       location.reload();

    });


