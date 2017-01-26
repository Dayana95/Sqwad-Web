import React from 'react';
import LazyLoad from 'react-lazyload'; 
import FriendsList from './js/share';
import PlaceholderComponent from './js/placeholder'



var MyList = React.createClass({ 


		shareVideo: function(e, finder, modalClass){

  					 e.preventDefault();

  					 

  					 	var databaseRef = new Firebase("https://sqwad-app.firebaseio.com/");
							var notificationRef = databaseRef.child('notifications');
							var usuariosRef = databaseRef.child('users');
							var svRef = databaseRef.child('users-shared-videos');
  					   		var urlid =  $(finder).find("iframe").attr("id");
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
						                         		createdAt: Date.now(),
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
						                          $(modalClass).modal('hide');
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

  				deleteVideo: function(e, id, urlId){


  					 e.preventDefault();

  					var databaseRef = new Firebase("https://sqwad-app.firebaseio.com/");
  					databaseRef.child('users-videos').child(id).child('list').child(urlId).remove();
  					
  					 $('#messageModal').modal('show');
						$('#messageModalLabel').html('<span class="text-center text-success">Video Deleted</span>')
						                      //hide the modal automatically
						        
					 setTimeout(  function () {
					 $('#messageModal').modal('hide');
						                        
					 }, 1000)
  				},


		
				render: function(){							

						return(	
																
															

								<section className="videos-container">{

									
									this.props.videos.map((user, index) => {				
								var modal = "modal fade modal-user-" + index;
								var modalClass = ".modal-user-" + index;
								var finderClass = "col-md-9 no-padding col-sm-9 col-xs-12 url-frame-" + index;
								var finder =".url-frame-" + index;
								var iframeUnique = "iframe" + index;
									return <LazyLoad key={index} height={200} 
                        placeholder={<PlaceholderComponent />} offset={100}>

									<div className="container" style={{marginBottom: 50}} >
												<div className="col-md-10 col-xs-12">
													<div className="row">
														<div className={finderClass}>
																<div className="video-title">
																	<span>{user.title}</span>
																</div>
															<iframe id={iframeUnique} width="100%" height="400" src={user.url} frameBorder="0" allowFullScreen></iframe>
														</div>

																<div className="col-md-3 col-sm-3 col-xs-12 buttons-container">
																<div className="actions-container">
																	<a href="#" data-toggle="modal" className="shareLink" onClick={(e) => this.handleSection(e, modalClass)}>
																		<img src="img/share-with-friends.png"/>
																	</a>
																</div>

																

																<div className="actions-container">
																	<a href="#" onClick={(e) => this.deleteVideo(e, ui.uid, user.videoID)}>
																		<img src="img/delete-video.png" />
																	</a>
																</div>
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
									      	
									      		<button type="submit" className="btn btn-default" id="shareBtn" onClick={(e) => this.shareVideo(e, finder, modalClass)}>SHARE WITH FRIENDS</button>
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


export default MyList

