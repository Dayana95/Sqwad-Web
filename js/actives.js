import React from 'react';

var AdminList = React.createClass({

	loginAsUser: function(e, mail, password){

			e.preventDefault();
console.log(password);
			  dbRef.unauth();

			  dbRef.authWithPassword({
		      email    : mail,
		      password : password
		    }, function(error, authData) {
		      if (error) {
		        console.log("Login Failed!", error);
		       
		      } else {
		        console.log("Authenticated successfully with payload:", authData);
		        auth  = authData;
        		window.location.href = "index.html";
		      
		      }
		    });

	},

	   addDefaultSrc(ev){
			        	ev.target.src = '../img/profile.jpg'
  			},

	render: function(){


		return(

				<div className="container">{

					this.props.actives.map((active, index) => {
							console.log(active);
							return <div key={index} className="row">

							<a href="#" onClick={(e) => this.loginAsUser(e, active.email, active.password)}><img className="profileImage" src={active.photo} onError={this.addDefaultSrc} />{active.username}</a>
							
							</div>
					})

				}</div>

			)

	},

});

export default AdminList