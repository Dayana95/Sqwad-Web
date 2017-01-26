$(function() {


			$("#url").on("keypress", function(e) {
				if (e.which === 13) {
					e.preventDefault();
					$("#addVideo").trigger("click");
				}
			});
			$("#addVideo").on("click", function(e) {
				  e.preventDefault();
				  $('#addUrlModal').modal('hide');
				  $("#video-data-1, #video-data-2").empty();
				  var videoid = $("#url").val();
				 
				var matches = videoid.match(/^https:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^https:\/\/youtu\.be\/([^?]+)/i);
				
				
				
				
				if (matches) {
					 $('#addVideoModal').modal('show');
					videoid = matches[1];
				}
				if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {

					if(videoid.match(/^http:\/\/www\.dailymotion\.com\/video\/([^_]+)/) || videoid.match(/^http:\/\/dai\.ly\/([^?]+)/)){
						
									var dailyUrl = $("#url").val();
									function getDailyMotionId(str) {
									    var ret = [];
									    var re = /(?:dailymotion\.com(?:\/video|\/hub)|dai\.ly)\/([0-9a-z]+)(?:[\-_0-9a-zA-Z]+#video=([a-z0-9]+))?/g;     
									    var m;

									    while ((m = re.exec(str)) != null) {
									        if (m.index === re.lastIndex) {
									            re.lastIndex++;
									        }
									        ret.push(m[2]?m[2]:m[1]);
									    }
									    return ret;
									}						
									
									var dailyID = getDailyMotionId(dailyUrl);
									
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
								$("#videoScrrenshot").val(data.thumbnail_large_url);

							}).fail(function(jqXHR, textStatus, errorThrown) {
								$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
							});
							}
							else if(videoid.match(/^https:\/\/vimeo\.com\/([^_]+)/)){
								
								var vimeoMatches = videoid.match(/^https:\/\/vimeo\.com\/([^_]+)/);
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
										$("#videoScrrenshot").val(data[0].thumbnail_large);



									});
							}

							else if(videoid.match(/^https:\/\/www\.facebook\.com\/([^_]+)/)){
									var cadenaFacebook = $("#url").val();
									var separador = "/";
									var arrayFacebook = cadenaFacebook.split(separador);
									var facebookID = arrayFacebook[5];
								$('#addVideoModal').modal('show');

									$.getJSON("https://graph.facebook.com/v2.0/"+ facebookID + "?fields=id,description,length,full_picture,embed_html,embeddable&access_token=208556729547178|51de1f5b965b2a96d9d96c12491c4c02", function(data) {
							
								$("<img>", {
									src: data.picture,
								}).appendTo("#video-data-1");

								$("#videoProviderId").val(facebookID);
								$("#videoTitle").val(data.description);
								$("#descriptionVideo").val(data.description);
								$("#videoUrl").val("https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/facebook/videos/"+ facebookID +"/&show_text=false&appId=208556729547178");
								$("#videoProvider").val('Facebook');
								$("#videoScrrenshot").val(data.full_picture);



							}).fail(function(jqXHR, textStatus, errorThrown) {
								$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
							});
							}

					else{
						 $('#addVideoModal').modal('show');
						$("#formSaveVideo").addClass("hidden");
						$("<p style='color: #F00;'>Please enter a valid url</p>").appendTo("#video-data-1");
					
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
						$("<p style='color: #F00;'>Video not found.</p>").appendTo("#video-data-1");
						return;
					}
					$("<img>", {
						src: data.items[0].snippet.thumbnails.medium.url,
						width: data.items[0].snippet.thumbnails.medium.width,
						height: data.items[0].snippet.thumbnails.medium.height
					}).appendTo("#video-data-1");

					$("#videoProviderId").val(videoid);
					$("#videoTitle").val(data.items[0].snippet.title);
					$("#descriptionVideo").val(data.items[0].snippet.description);
					$("#videoUrl").val('https://www.youtube.com/embed/' + videoid);
					$("#videoProvider").val('youtube');
					$("#videoScrrenshot").val(data.items[0].snippet.thumbnails.high.url);

				}).fail(function(jqXHR, textStatus, errorThrown) {
					$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
				});
			});
		});