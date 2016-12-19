import React from 'react';
import ReactDOM from 'react-dom';

var HeadProfile = React.createClass({

	getInitialState: function(){
			return{
				usuario: "",
				foto: "" 
			}
	},

		componentWillMount: function(){
			if(ui){
				this.ref = new Firebase('https://sqwad-app.firebaseio.com/users/' + ui.uid);
			var that = this;
			this.ref.once('value', function(snap){
					var usuario = snap.val().username;
					var foto = snap.val().photoUrl;
					that.setState({usuario : usuario});
					that.setState({foto : foto});
			})
			}
			
		},

		addDefaultSrc(ev){
			        	ev.target.src = 'img/profile.jpg'
  			},


		render: function(){
			return(
				<div>

				<img src={this.state.foto} className="profileMainImage" onError={this.addDefaultSrc} />
				<span className="bold user-main">{this.state.usuario}</span>
				
				</div>

				)
		}
});

export default HeadProfile
			