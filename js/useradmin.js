import React from 'react';
import ReactDOM from 'react-dom';
import AdminList from './actives';

var Admin = React.createClass({

	getInitialState: function(){
		return{

			actives: [],
		}
	},

	componentWillMount: function(){
			 this.firebaseRef = new Firebase('https://sqwad-app.firebaseio.com/users');
					 
					var that = this;
					this.firebaseRef.on("value", function(dataSnapshot){
			            		var items = [];
			            		dataSnapshot.forEach(function(childSnaphot){
			            			var item = {
			            				username: childSnaphot.val().username,
					                     userId: childSnaphot.val().userId,
					                     email: childSnaphot.val().email,
					                     password: childSnaphot.val().password,
					                     photo: childSnaphot.val().photoUrl
			            			}
			            			items.push(item);

			            		}.bind(this));

			            		that.setState({
			            			actives: items
			            		});
			            	}.bind(this));
	},

	  componentWillUnmount: function() {
						    this.firebaseRef.off();
						  },

		createUser: function(e){

			e.preventDefault();
			

			if($('#newEmail').val() != '' && $('#newPassword').val() != ''){
				var dbRef = new Firebase("https://sqwad-app.firebaseio.com/");
				var usersRef = dbRef.child('users');


				dbRef.createUser({
			        email    : $('#newEmail').val(),
			        password : $('#newPassword').val()
			      }, function(error, userData) {
			        if (error) {
			          console.log("Error creating user:", error);
			          
			        } else {
			          //now user is needed to be logged in to save data
			          dbRef.authWithPassword({
			            email    : $('#newEmail').val(),
			            password : $('#newPassword').val()
			          }, function(error, authData) {
			            if (error) {
			              console.log("Login Failed!", error);
			           
			            } else {
			              console.log("Authenticated successfully with payload:", authData);
			              auth  = authData;
			              //now saving the profile data
			              usersRef
			                .child(userData.uid)
			                .set({
			                    createdAt: Date.now(),
			                    firstName    : $('#newFirstName').val(),
			                    lastName    : $('#newLastName').val(),
			                    email    : $('#newEmail').val(),
			                    password: $('#newPassword').val(),
			                    username: $('#newUsername').val(),
			                    birthday: $('#newBirthday').val(),
			                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/sqwad-app.appspot.com/o/default.jpg?alt=media'
			                  }, function(){

			                    console.log("New user created");
			                  })

			                $('#createUserModal').modal('hide');

			              $('#messageModal').modal('show');
			              $('#messageModalLabel').html('<span class="text-center text-success">A new user has been created</span>')
			              //hide the modal automatically
			              setTimeout(  function () {
			                $('#messageModal').modal('hide');
			                //$('.unauthenticated, .userAuth').toggleClass('unauthenticated').toggleClass('authenticated');
			                
			              }, 500)
			            }
			          });
			          console.log("Successfully created user account with uid");
			         
			        }
			      });
			}
				
		},


		openModal: function(){
				$("#createUserModal").modal('show');
		},

				render: function(){
						return(	
							<div className="container">
							<button onClick={this.openModal}>Add a new user</button>						
							<AdminList actives={this.state.actives}/>
							<div className="modal fade" id="createUserModal" tabIndex="-1" role="dialog" aria-labelledby="Create New User" aria-hidden="true">
						    <div className="modal-dialog">
						      <div className="modal-content">
						        <div className="modal-header">
						          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						          <h4 className="modal-title" id="newUserModalLabel">Create a New User</h4>
						        </div>
						        <div className="modal-body">
						        <form  role="form"> 
						          <div className="form-group">
						            
						            <input type="text" className="form-control" id="newFirstName" placeholder="First Name" required />
						          </div>
						          <div className="form-group">
						           
						            <input type="text" className="form-control" id="newLastName" placeholder="Last Name" required />
						          </div>

						          <div className="form-group">
						           
						            <input type="text" className="form-control" id="newUsername" placeholder="Username" required />
						          </div>

						           <div className="form-group">
						           
						            <input type="date" className="form-control" id="newBirthday" placeholder="Birthday" required />
						          </div>

						          <div className="form-group">
						           
						            <input type="email" className="form-control" id="newEmail" placeholder="Email" required />
						          </div>
						          <div className="form-group">
						            
						            <input type="password" className="form-control" id="newPassword" placeholder="Password" required />
						          </div>
						          

						          <button id="createUserBtn" type="submit" className="btn btn-default" onClick={this.createUser}>Create New user</button>

						          </form>

						        </div>
						        
						        
						      </div>
						    </div>
						  </div>



							</div>					
							)
					}
});

ReactDOM.render(<Admin />, document.getElementById('admin'));
