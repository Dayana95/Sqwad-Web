import React from 'react';
import ReactDOM from 'react-dom';


var VideosCount = React.createClass({

	getInitialState: function(){
			return{
				videos: []
			}
	},

		componentWillMount: function(){

			if(ui){
				this.ref = new Firebase('https://sqwad-app.firebaseio.com/users-videos/' + ui.uid + '/list');
			var that = this;
			this.ref.on('value', function(snap){
					 var videos = [];
			              snap.forEach(function(data){
			              	              
			              
			                  var video = {
			                    
			                     url: data.val().url,
			                     title: data.val().title

			                    
			                  }
			                  videos.push(video);
			                that.setState({videos : videos}); 
			              });
					
			})
			}
			
		},




		render: function(){
			return(
				
				<Lista videos={this.state.videos} />
				
				

				)
		}
});

		var Lista = React.createClass({
				
				render: function(){
					return(
							<span className="bold">{this.props.videos.length} videos</span>

					)
				}

		});


export default VideosCount