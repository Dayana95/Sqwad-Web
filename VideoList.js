import React from 'react'

var UserList = React.createClass({

					                
				           recorrerVideos: function(videoList, id){
								  
								  return(
									
									<div className="carousel-inner" role="listbox">{

										Object.keys(videoList).map(function(videoKey, index){
											var iframeid= id + 'index' + index;
											var active = "active item " + id;
											var noactive = "item " + id;


                         				 	if (index == 0){
													return	<div  className={active}>
																<div className="video-title">
																	<span>{videoList[videoKey].title}</span>
																</div>

											
											<iframe id={iframeid} key="{index}" width="100%" height="400" src={videoList[videoKey].url} frameBorder="0" allowFullScreen></iframe></div>;
                         				 	}
                         				 	else{
                         				 			return	<div  className={noactive}>
												<div className="video-title">
													<span>{videoList[videoKey].title}</span>
												</div>

											
											<iframe id={iframeid} key="{index}" width="100%" height="400" data-lazy-load-src={videoList[videoKey].url} frameBorder="0" allowFullScreen></iframe></div>

                         				 	}

										


										})

									}
									</div>

								  )
			         },


			        addDefaultSrc(ev){
			        	ev.target.src = 'img/profile.jpg'
  			},


  							     
  			pullVideo: function(e, id){
  					e.preventDefault();

  					if(ui){

  						 $("#video-data-1, #video-data-2").empty();

					  var urlid =  $(".item.active." + id).find("iframe").attr("id");
					  
					  var videoid = $("#" + urlid).attr("src");

					  var matches = videoid.match(/^https:\/\/www\.youtube\.com\/embed\/([^?]+)/i);
						$('#addVideoModal').modal('show');

						if (matches) {
							videoid = matches[1];
						}
						if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {
							$("#formSaveVideo").addClass("hidden");
							$("<p className='red'>Unable to parse Video ID/URL.</p>").appendTo("#video-data-1");
							return;
						}else{
							$("#formSaveVideo").removeClass("hidden");

						}

						$.getJSON("https://www.googleapis.com/youtube/v3/videos", {
					key: "AIzaSyBkSNFZpLrAk-sss0s9VxSKkmAWlYZ-RIM",
					part: "snippet,statistics",
					id: videoid
				}, function(data) {
					if (data.items.length === 0) {
						$("<p className='red'>Video not found.</p>").appendTo("#video-data-1");
						return;
					}
					$("<img>", {
						src: data.items[0].snippet.thumbnails.medium.url,
						width: data.items[0].snippet.thumbnails.medium.width,
						height: data.items[0].snippet.thumbnails.medium.height
					}).appendTo("#video-data-1");
					
					$("#videoTitle").val(data.items[0].snippet.title);
					$("#descriptionVideo").val(data.items[0].snippet.description);
					$("#videoUrl").val('https://www.youtube.com/embed/' + videoid);
					$("#videoProvider").val('youtube');

				}).fail(function(jqXHR, textStatus, errorThrown) {
					$("<p className='red'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
				});

  			}else{

  			} 					
				  	 $('#loginModal').modal('show');
				  	
				 
  			},
           

  				originalSource: function(e, id){
  					e.preventDefault();

  					if(ui){
  						

  					 var urlid =  $(".item.active." + id).find("iframe").attr("id");
					  
					  var videoid = $("#" + urlid).attr("src");

					  var originalLink = $("#original-link").attr('href', videoid);

					  window.open(videoid, '_blank');

  					}else{
  						
  						  $('#loginModal').modal('show');

  					}

  					

  				},

				render: function(){	


						return(								

								<section className="videos-container">{


									
									this.props.users.map(user => {
									var usuario = user.userId;
								
									
									var imgUrl = 'https://firebasestorage.googleapis.com/v0/b/sqwad-app.appspot.com/o/'+ user.userId +'.jpg?alt=media';
									
									

									var videoList = user.list;
									var contador = Object.keys(videoList).length + " VIDEOS";
									
									
									var urls = this.recorrerVideos(videoList, user.userId);
									
									var carouselId = ".carousel" + user.username;
								
									var slider = "kharron carousel slide carousel" + user.username; 
									
									
									return <div className="container" style={{marginBottom: 50}} >
											<div className="col-md-10">

										
										<div className="row sqwad-select">
											<div className="col-md-9 col-sm-9 col-xs-9">
												<div className={slider} data-ride="carousel">
											

													{urls}
												  </div>
											</div>
											<div className="col-md-3 col-sm-3 col-xs-3">
												


												<div className="actions-container">
													<a href="#" className="pullbtn" onClick={(e) => this.pullVideo(e, user.userId)}>
														<img src="img/placeholder.png"/>
													</a>
												</div>

												<div className="actions-container">
													<a href="#" id="original-link" target="_blank" onClick={(e) => this.originalSource(e, user.userId)}>
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