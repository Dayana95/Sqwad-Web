import React from 'react';
import ReactDOM from 'react-dom'
import UserList from './VideoList'

var Users = React.createClass({
					getInitialState: function(){
		                return{		                	
		                    users: [],

		                                        
		                }              
            },

            	componentWillMount: function(){
		            this.firebaseRef = new Firebase('https://sqwad-app.firebaseio.com/users-videos').limitToFirst(100);
					 
					var that = this;
		            this.firebaseRef.once("value", function(snapshot){
					  		
		              var users = [];
			              snapshot.forEach(function(data){
			              	              
			              
			                  var user = {
			                     username: data.val().username,
			                     userId: data.val().userId,
			                     list: data.val().list
			                    
			                  }
			                  users.push(user);
			                that.setState({users : users}); 
			              });
			            });
			          },

				render: function(){
						return(							
							<UserList users={this.state.users}/>					
							)
					}
			});

			
ReactDOM.render(<Users />, document.getElementById('app'));

