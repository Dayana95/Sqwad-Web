import React from 'react';
import ReactDOM from 'react';

var FollowerCount = React.createClass({

	getInitialState: function(){
			return{
				followers: ""
			}
	},

		componentWillMount: function(){
			if(ui){

				this.ref = new Firebase('https://sqwad-app.firebaseio.com/followers/' + ui.uid);
			var that = this;
			this.ref.on('value', function(snap){
					var followers = snap.val().followersCount;					
					that.setState({followers : followers});
					
			})

			}
			
		},




		render: function(){
			return(
				
				<span className="bold">{this.state.followers} Followers</span>
				
				

				)
		}
});


export default FollowerCount