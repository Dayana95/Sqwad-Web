import React from 'react'

var UserList = React.createClass({

					                
				           recorrerVideos: function(videoList){
								  
								  return(
									
									<div className="carousel-inner" role="listbox">{

										Object.keys(videoList).map(function(videoKey, index){


                         				 	if (index == 0){
													return	<div className="active item">
																<div className="video-title">
																	<span>{videoList[videoKey].title}</span>
																</div>
											
											<iframe  key="{index}" width="100%" height="400" src={videoList[videoKey].url} frameBorder="0" allowFullScreen></iframe></div>;
                         				 	}
                         				 	else{
                         				 			return	<div className="item">
												<div className="video-title">
													<span>{videoList[videoKey].title}</span>
												</div>
											
											<iframe  key="{index}" width="100%" height="400" data-lazy-load-src={videoList[videoKey].url} frameBorder="0" allowFullScreen></iframe></div>

                         				 	}

										


										})

									}
									</div>

								  )
			         },


			        addDefaultSrc(ev){
			        	ev.target.src = 'img/profile.jpg'
  			},

				     

           
				render: function(){	


						return(								

								<section className="videos-container">{


									
									this.props.users.map(user => {
									var usuario = user.userId;
								
									
									var imgUrl = 'https://firebasestorage.googleapis.com/v0/b/sqwad-app.appspot.com/o/'+ user.userId +'.jpg?alt=media';
									
									

									var videoList = user.list;
									var contador = Object.keys(videoList).length + " VIDEOS";
									
									
									var urls = this.recorrerVideos(videoList);
									
									var carouselId = ".carousel" + user.username;
								
									var slider = "kharron carousel slide carousel" + user.username; 
									
									
									return <div className="container" style={{marginBottom: 50}} >
											<div className="col-md-10">

										
										<div className="row">
											<div className="col-md-9 col-sm-9 col-xs-9">
												<div className={slider} data-ride="carousel">
											

													{urls}
												  </div>
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

										<div className="row footer-videos">
											
											

											<div className="col-md-6  col-sm-6 username-cont">
												<a href="#">
													<img src={imgUrl} className="profileImage" onError={this.addDefaultSrc} />
													<span className="username">{user.username}</span>
													<span className="count-videos">{contador}</span>
												</a>
											</div>
											
											<div className="col-md-6  col-sm-6">
												<ul className="controls-list">
													<li>
														<a  href={carouselId} role="button" data-slide="prev">
															<img src="img/before-arrow.png" height="40px"/>
														</a>
													</li>
													<li>
														<a  href={carouselId} role="button" data-slide="next">
															<img src="img/next-arrow.png" height="40px"/>
														</a>
													</li>
												</ul>
												
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

export default UserList