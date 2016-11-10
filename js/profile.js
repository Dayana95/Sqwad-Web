
var Profile = React.createClass({
	getInitialState: function(){
		return{
			videos: []
		}
	},

	componentWillMount: function(){
			
			
			

			 this.firebaseRef = new Firebase('https://sqwad-app.firebaseio.com/users-videos/'+ ui.uid  +'/list').limitToFirst(100);
			 

			 var that = this;
		            this.firebaseRef.on("value", function(snapshot){
					  		
		              var videos = [];
			              snapshot.forEach(function(data){
			              	              
			              
			                  var video = {
			                    
			                     url: data.val().url,
			                     title: data.val().title

			                    
			                  }
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

	var MyList = React.createClass({

				           
				render: function(){							

						return(								

								<section className="videos-container">{
									
									this.props.videos.map(user  => {				
									

									return <div  className="container" style={{marginBottom: 50}} >
												<div className="col-md-10">
																										
													<div className="row">
														<div className="col-md-9 col-sm-9 col-xs-9">
																<div className="video-title">
																	<span>{user.title}</span>
																</div>
															<iframe width="100%" height="400" src={user.url} frameBorder="0" allowFullScreen></iframe>
														</div>

																<div className="col-md-3 col-sm-3 col-xs-3">
																<div className="actions-container">
																	<a href="#">
																		<img src="img/placeholder.png"/>
																	</a>
																</div>

																<div className="actions-container">
																	<a href="#">
																		<img src="img/placeholder.png" />
																	</a>
																</div>

																<div className="actions-container">
																	<a href="#">
																		<img src="img/placeholder.png"/>
																	</a>
																</div>
															</div>
														</div>
												</div>

									

									</div>

							

									})
									}							     
							    </section>				    

						)


				}
			});


			

			ReactDOM.render(
			<Profile />,
			document.getElementById('profile')
			);