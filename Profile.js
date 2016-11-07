import React from 'react';
import ReactDOM from 'react-dom';
import MyList from './ProfileList'


var Profile = React.createClass({
	getInitialState: function(){
		return{
			videos: []
		}
	},

	componentWillMount: function(){		
			
			

			 this.firebaseRef = new Firebase('https://sqwad-app.firebaseio.com/users-videos/'+ ui.uid  +'/list').limitToFirst(100);
			 

			 var that = this;
		            this.firebaseRef.once("value", function(snapshot){
					  		
		              var videos = [];
			              snapshot.forEach(function(data){
			              	              
			              
			                  var video = {
			                    
			                     url: data.val().url,
			                     title: data.val().title

			                    
			                  }
			                  console.log(video);
			                  videos.push(video);
			                that.setState({videos : videos}); 
			              });
			            });
			          },

				render: function(){
						return(							
							<MyList videos={this.state.videos}/>					
							)				

	}
});

ReactDOM.render(<Profile />, document.getElementById('profile'));
