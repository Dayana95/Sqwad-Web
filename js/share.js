import React from 'react';
import ReactDOM from 'react-dom';

var FriendsList = React.createClass({
	getInitialState: function(){
		return{
			friends: []
		}
	},

	componentWillMount: function(){		
			
			if(ui){

			 this.firebaseRef = new Firebase('https://sqwad-app.firebaseio.com/followers/'+ ui.uid  +'/list');
			 

			 var that = this;
		            this.firebaseRef.on("value", function(snapshot){
					  		
		              var friends = [];
			              snapshot.forEach(function(data){
			              	              
			              
			                  var friend = {
			                    
			                     userId: data.val().userId,
			                     username: data.val().username,
			                     photo: data.val().photoUrl			                    
			                  }
			                  friends.push(friend);
			                that.setState({friends : friends}); 
			              });
			            });

					}

			          },

				render: function(){
						return(							
							<MyFriendList friends={this.state.friends}/>					
							)				

	}
});


		
		var MyFriendList = React.createClass({

			      addDefaultSrc(ev){
			        	ev.target.src = 'img/profile.jpg'
  			},

			render: function(){

				return (

				<ul className="friends-ul">{

					this.props.friends.map((friend, index) => {

						var imgUrl = "https://firebasestorage.googleapis.com/v0/b/sqwad-app.appspot.com/o/" + friend.userId + ".jpg?alt=media";

						return <li key={index}>
										  <div className="checkbox checkbox-primary right">
					                        <input type="checkbox" className="styled styled-primary"  value={friend.userId}   aria-label="Single checkbox Two" />
					                        <label></label>
					                    </div>
									
									
									<img src={imgUrl} className="profileImage" onError={this.addDefaultSrc} />
									<span>{friend.username}</span>
								</li>
					})
				}</ul>

				)
				
			}

		});


export default FriendsList