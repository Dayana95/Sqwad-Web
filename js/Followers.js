var FollowerCount = React.createClass({

	getInitialState: function(){
			return{
				followers: ""
			}
	},

		componentWillMount: function(){
			this.ref = new Firebase('https://sqwad-app.firebaseio.com/followers/' + ui.uid);
			var that = this;
			this.ref.on('value', function(snap){
					var followers = snap.val().followersCount;					
					that.setState({followers : followers});
					
			})
		},




		render: function(){
			return(
				
				<span className="bold">{this.state.followers} Followers</span>
				
				

				)
		}
});


			ReactDOM.render(
			<FollowerCount />,
			document.getElementById('followers')
			);