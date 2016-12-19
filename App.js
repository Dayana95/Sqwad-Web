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
		            this.firebaseRef = new Firebase('https://sqwad-app.firebaseio.com/users-videos');
					 
					var that = this;

					this.firebaseRef.on("value", function(dataSnapshot){
			            		var items = [];
			            		dataSnapshot.forEach(function(childSnaphot){
			            			var item = {
			            				username: childSnaphot.val().username,
					                     userId: childSnaphot.val().userId,
					                     list: childSnaphot.val().list
			            			}
			            			items.push(item);

			            		}.bind(this));

			            		that.setState({
			            			users: items
			            		});
			            	}.bind(this));

			            	
			          },

			            componentWillUnmount: function() {
						    this.firebaseRef.off();
						  },		

				render: function(){
						return(							
							<UserList users={this.state.users}/>					
							)
					}
			});

			
ReactDOM.render(<Users />, document.getElementById('app'));

