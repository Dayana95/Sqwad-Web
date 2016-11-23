import React from 'react';
import ReactDOM from 'react-dom';
import MyList from './ProfileList';
import HeadProfile from './js/ProfileHead';
import VideosCount from './js/VideosCount';
import FollowersCount from './js/Followers';

 

var Profile = React.createClass({
	getInitialState: function(){
		return{
			videos: []
		}
	},

	componentWillMount: function(){		
			
			

			 this.firebaseRef = new Firebase('https://sqwad-app.firebaseio.com/users-videos/'+ ui.uid  +'/list');
			 

			 var that = this;
		            this.firebaseRef.on("value", function(snapshot){
					  		
		              var videos = [];
			              snapshot.forEach(function(data){
			              	              
			              
			                  var video = {
			                    
			                     url: data.val().url,
			                     title: data.val().title,
			                     providerId: data.val().providerVideoId,
			                     videoID: data.key()

			                    
			                  }
			                  console.log(video);
			                  videos.push(video);
			                that.setState({videos : videos}); 
			              });
			            });
			          },

				render: function(){
						return(
						<div>	
							<div className="container">
							<div className="col-md-6 col-sm-12">
					  			<div style={{margin: 20}}>
					  				<div className="row">  					
					  						<HeadProfile />					
					  					</div>

					  				<div className="row">
					  					<div className="col-md-3">
					  						<VideosCount />
					  					</div>
					  					<div className="col-md-3">
					  						<FollowersCount />
					  					</div>
					  				</div>
					  				
					  			</div>
					  				
					  			</div>	

					  			</div>	
					  				
									<MyList videos={this.state.videos}/>
									

							</div>					
							)				

	}
});

ReactDOM.render(<Profile />, document.getElementById('profile'));
