import React from 'react';
import FriendsList from './js/share';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from './js/placeholder';
 




var UserList = React.createClass({
						
					                
				           recorrerVideos: function(videoList, id){

				           	function videoLayover(e, url, title){

				           			e.preventDefault();
									$("#iframeModal").modal('show');
									$("#iframe-shimmy").attr('src', url);
									$('#title-iframe').text(title);
				           	};
										

				           	var mapKeys = Object.keys(videoList);

							mapKeys.sort(function(a,b){return videoList[b].createdAt - videoList[a].createdAt});

								  return(
									
									<div className="carousel-inner" role="listbox">{
										

										mapKeys.map(function(videoKey, index){
											var iframeid= id + 'index' + index;
											var active = "active item " + id;
											var noactive = "item " + id;
											


                         				 	if (index == 0){
													return	<div key={index}  className={active}>
																<div className="video-title">
																	<span>{videoList[videoKey].title}</span>
																</div>

											
											
																<img id={iframeid} key="{index}" className="img-responsive"  onClick={(e) => videoLayover(e, videoList[videoKey].url, videoList[videoKey].title)} src={videoList[videoKey].imgUrl} />
											</div>;
											
                         				 	}
                         				 	else{
                         				 			return	<div key={index} className={noactive}>
												<div className="video-title">
													<span>{videoList[videoKey].title}</span>
												</div>

											
																<img id={iframeid} key="{index}" className="img-responsive"  onClick={(e) => videoLayover(e, videoList[videoKey].url, videoList[videoKey].title)}  src={videoList[videoKey].imgUrl} />
											</div>

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
						

						if (matches) {
							$('#addVideoModal').modal('show');
							videoid = matches[1];
						}
						if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {
							if(videoid.match(/^http:\/\/www\.dailymotion\.com\/embed\/video\/([^_]+)/)){
								
								var dailyMatches = videoid.match(/^http:\/\/www\.dailymotion\.com\/embed\/video\/([^_]+)/);
									
									var dailyID;

									if(dailyMatches){
										dailyID = dailyMatches[1];
									}else{
										alert('Error');
									}
									alert(dailyID);
									
									 $('#addVideoModal').modal('show');

							$.getJSON("https://api.dailymotion.com/video/"+ dailyID + "?fields=id,title,access_error,description,duration,embed_url,thumbnail_large_url", function(data) {
							
								$("<img>", {
									src: data.thumbnail_large_url,
								}).appendTo("#video-data-1");

								$("#videoProviderId").val(dailyID);
								$("#videoTitle").val(data.title);
								$("#descriptionVideo").val(data.description);
								$("#videoUrl").val(data.embed_url);
								$("#videoProvider").val('Dailymotion');

							}).fail(function(jqXHR, textStatus, errorThrown) {
								$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
							});
							}

								else if(videoid.match(/^https:\/\/player\.vimeo\.com\/video\/([^_]+)/)){
								
								var vimeoMatches = videoid.match(/^https:\/\/player\.vimeo\.com\/video\/([^_]+)/);
								var vimeoID;
								if(vimeoMatches){
									vimeoID = vimeoMatches[1];
								}
								
								 $('#addVideoModal').modal('show');
								$.getJSON('http://www.vimeo.com/api/v2/video/' + vimeoID + '.json?callback=?', {format: "json"}, function(data) {
									       
											    $("<img>", {
											src: data[0].thumbnail_medium,
										}).appendTo("#video-data-1");

										$("#videoProviderId").val(vimeoID);
										$("#videoTitle").val(data[0].title);
										$("#descriptionVideo").val(data[0].description);
										$("#videoUrl").val("https://player.vimeo.com/video/" + vimeoID);
										$("#videoProvider").val('Vimeo');


									});
							}

							else if(videoid.match(/^https:\/\/www\.facebook\.com\/([^_]+)/)){
									var cadenaFacebook = videoid;
									var separador = "/";
									var arrayFacebook = cadenaFacebook.split(separador);
									var facebookID = arrayFacebook[9];
									alert(facebookID);
								$('#addVideoModal').modal('show');

									$.getJSON("https://graph.facebook.com/v2.7/"+ facebookID + "?fields=id,description,length,title,picture, embed_html,embeddable&access_token=208556729547178|51de1f5b965b2a96d9d96c12491c4c02", function(data) {
							
								$("<img>", {
									src: data.picture,
								}).appendTo("#video-data-1");

								$("#videoProviderId").val(facebookID);
								$("#videoTitle").val(data.description);
								$("#descriptionVideo").val(data.description);
								$("#videoUrl").val("https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/"+ facebookID +"/&show_text=false&appId=208556729547178");
								$("#videoProvider").val('Facebook');

							}).fail(function(jqXHR, textStatus, errorThrown) {
								$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
							});
							}



							else{
								 $('#addVideoModal').modal('show');
								$("#formSaveVideo").addClass("hidden");
								$("<p style='color: #F00;'>Unable to parse Video ID/URL.</p>").appendTo("#video-data-1");
							
							}

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
					$("#videoProviderId").val(videoid);


				}).fail(function(jqXHR, textStatus, errorThrown) {
					$("<p className='red'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
				});

  			}else{
  				 $('#loginModal').modal('show');

  			} 					
				  	
				  	
				 
  			},
           

  				originalSource: function(e, id){
  					e.preventDefault();

  					if(ui){
  						

  					 var urlid =  $(".item.active." + id).find("iframe").attr("id");
					  
					  var videoid = $("#" + urlid).attr("src");

					  window.open(videoid, '_blank');

  					}else{
  						
  						  $('#loginModal').modal('show');

  					}

  					

  				},

  				shareVideo: function(e, id, username){

  					 e.preventDefault();

  					 

  					 	var databaseRef = new Firebase("https://sqwad-app.firebaseio.com/");
							var notificationRef = databaseRef.child('notifications');
							var usuariosRef = databaseRef.child('users');
							var svRef = databaseRef.child('users-shared-videos');
  					   		var urlid =  $(".item.active." + id).find("iframe").attr("id");
					  		var videoid = $("#" + urlid).attr("src");
					  		var url = videoid;
					  		
					  		  var matches = url.match(/^https:\/\/www\.youtube\.com\/embed\/([^?]+)/i);
						
											if (matches) {
												url = matches[1];
											}

																			
											$.getJSON("https://www.googleapis.com/youtube/v3/videos", {
										key: "AIzaSyBkSNFZpLrAk-sss0s9VxSKkmAWlYZ-RIM",
										part: "snippet,statistics",
										id: url
									}, function(data) {
																		
								var val = [];
							        $(':checkbox:checked').each(function(i){
							          val[i] = $(this).val();

							      var usuarioname;
							      var foto;

               					 usuariosRef.child(ui.uid).once('value', function(snapshot){
               
                					var  usuarioname = snapshot.val().username;
                					var foto = snapshot.val().photoUrl;
               						var roomUnique = databaseRef.child('room-metadata').push();

					                					usuariosRef.child(val[i]).once('value', function(snap){
					                							var sendername = snap.val().username;
					                						var shareVideosRef = svRef.child(ui.uid).push();
					                						var keyRoom = shareVideosRef.key();
					                						shareVideosRef
					                							.set({
					                								createdAt: Date.now(),
					                								name: data.items[0].snippet.title,
					                								video:{
					                									 title    : data.items[0].snippet.title,
												                            url    : videoid,
												                            provider: 'youtube',
					                								}
					                				
					                							}, function(){
					                								console.log("Room created");
					                							})

					                							

					                						var recipientRef = svRef.child(ui.uid).child(keyRoom).child('recipients').push();

					                							recipientRef.update({
					                								userId: val[i],
					                								username: sendername,
					                								roomId: roomUnique.key()
					                							})


					                					})
                					

							         var newChildRef = notificationRef.child(val[i]).child('list').push();


							         		   newChildRef
						                         .set({
						                         	createdAt: Date.now(),
						                         	notificationId: newChildRef.key(),
						                         	read: 'false',
						                         	status: 'pending',
						                         	text: 'has sent you a video. Tap to watch it',
						                         	type: 'new_video_received',
						                         	roomId: roomUnique.key(),
						                         	sender:{
						                         		userId: ui.uid,
						                         		username: usuarioname,
						                         		photoUrl: foto,
						                         	},
						                         	video:{
						                         		createdAt: -1 * Date.now(),
						                         		description    : data.items[0].snippet.title,
							                            title    : data.items[0].snippet.description,
							                            url    : videoid,
							                            provider: 'youtube',
						                         	}						                         
						                          }, function(){
						                            console.log("Video Shared");
						                          })				                   

						                         })

               					              notificationRef.child(val[i]).once('value', function(snapdata){
						                       
						                    	var nonseen = snapdata.val().notificationsNotSeenCounter;
						                    	console.log("Nonseen",nonseen);
						                    	 
						                    	 if (nonseen == null){
						                    	 	
						                    	 		snapdata.ref().update({"notificationsNotSeenCounter": 1});
						                    	 		
						                    	 }else{
						                    	 	snapdata.ref().update({"notificationsNotSeenCounter": nonseen + 1});
						                    	 }
						                    })
						                          $('.modal-' + username).modal('hide');
						                         $('#messageModal').modal('show');
						                      $('#messageModalLabel').html('<span class="text-center text-success">Video Shared</span>')
						                      //hide the modal automatically
						                       $(':checkbox:checked').prop('checked', false);
						                      setTimeout(  function () {
						                        $('#messageModal').modal('hide');
						                        
						                      }, 500)

							        });				 
						 	


									}).fail(function(jqXHR, textStatus, errorThrown) {
										$("<p className='red'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
									});					 		


  					  					 		

  				},

  				handleSection: function(e, clase){
  					  	e.preventDefault();


  					if(ui){

  						$('.shareLink').attr('data-target', clase);

  					}else{

  						$('#loginModal').modal('show');
  						$('.shareLink').attr('data-target', '.bs-example-modal-sm');
  					}

  				},

				render: function(){	


						return(								

								<section className="videos-container">{


									
									this.props.users.map((user, index) => {
									var usuario = user.userId;
								

									var imgUrl = 'https://firebasestorage.googleapis.com/v0/b/sqwad-app.appspot.com/o/'+ user.userId +'.jpg?alt=media';
									
									

									var videoList = user.list;
									var contador = Object.keys(videoList).length + " VIDEOS";
									
									
									var urls = this.recorrerVideos(videoList, user.userId);
									
									var carouselId = ".carousel" + user.username;
								
									var slider = "kharron carousel slide carousel" + user.username; 
									var modalClass = ".modal-" + user.username;
									var modal = "modal fade modal-" + user.username;
									
									return <LazyLoad key={index} height={200} offset={200} >
									<div className="col-md-6 space-between" style={{marginBottom: 50}} >
											<div className="col-md-12">

										
										<div className="row sqwad-select">
											<div className="col-md-10 col-sm-10 col-xs-12 no-padding">
												<div className={slider} data-ride="carousel">
											

													{urls}
												  </div>
											</div>
											<div className="col-md-2 col-sm-2 col-xs-12 buttons-container">
												


												<div className="actions-container">
													<a href="#" className="pullbtn" onClick={(e) => this.pullVideo(e, user.userId)}>
														<img src="img/add-to-profile.png"/>
													</a>
												</div>

												<div className="actions-container">
													<a href="#" id="original-link" target="_blank" onClick={(e) => this.originalSource(e, user.userId)}>
														<img src="img/see-original-link.png" />
													</a>
												</div>

												<div className="actions-container">
													<a href="#" data-toggle="modal" className="shareLink" onClick={(e) => this.handleSection(e, modalClass)}>
														<img src="img/share-with-friends.png"/>
													</a>
												</div>
											</div>
										</div>

										<div className="row footer-videos">
											
											

											<div className="col-md-8  col-sm-8 username-cont">
												<a href="#">
													<img src={imgUrl} className="profileImage" onError={this.addDefaultSrc} />
													<span className="username">{user.username}</span>
													<span className="count-videos">{contador}</span>
												</a>
											</div>
											
											<div className="col-md-4  col-sm-4">
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
								<div className={modal} id="friend-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
								  <div className="modal-dialog modal-sm" role="document">
								    <div className="modal-content">
								      <div className="modal-header">
									        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									        <h4 className="modal-title" id="myModalLabel">MY FRIENDS</h4>
									      </div>

									      <div className="modal-body">

									      	<div id="friend-list">
									      		<FriendsList />
									      	</div>
									      	<form>
									      	
									      		<button type="submit" className="btn btn-default" id="shareBtn" onClick={(e) => this.shareVideo(e, user.userId, user.username)}>SHARE WITH FRIENDS</button>
									      	</form>

									      </div>
								    </div>
								  </div>
								</div>
									</div>
									</LazyLoad>							
										})
									}							     
							    </section>				    

						)


				}

					
			});

export default UserList
