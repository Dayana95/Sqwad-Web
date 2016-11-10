$(function() {
	

			$(".pullbtn").on("click", function(e, id) {
				alert('Soy Pull');
				  e.preventDefault();
				  $("#video-data-1, #video-data-2").empty();
				  var urlid =  $(".active").find( "iframe" ).attr("id");
				  var videoid = $("#" + urlid).attr("src");
				  console.log("Pull", videoid);
				  alert(videoid);
				 
				var matches = videoid.match(/^https:\/\/www\.youtube\.com\/embed\/([^?]+)/i);
				 $('#addVideoModal').modal('show');
				
				
				
				if (matches) {
					videoid = matches[1];
				}
				if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {
					$("#formSaveVideo").addClass("hidden");
					$("<p style='color: #F00;'>Unable to parse Video ID/URL.</p>").appendTo("#video-data-1");
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
					
					$("#videoTitle").val(data.items[0].snippet.title);
					$("#descriptionVideo").val(data.items[0].snippet.description);
					$("#videoUrl").val('https://www.youtube.com/embed/' + videoid);
					$("#videoProvider").val('youtube');

				}).fail(function(jqXHR, textStatus, errorThrown) {
					$("<p style='color: #F00;'></p>").text(jqXHR.responseText || errorThrown).appendTo("#video-data-1");
				});
			});
		});