can.Component.extend({
	tag: 'mz-login',
	template: can.view('/zoomUser/components/login/login.stache'),
	viewModel: {
		message: 'Hello from Mail Zoom Login',
		wantRemember:false, //init from some model that looks at cookie
		
		
		goToRegister: function() {
			can.route.attr('page', 'register');
		},
		rememberMe:function(ev, el){	
			this.attr('wantRemember', el.prop('checked'));
		},
		submitLogin:function(ev, el){
			var callback=function(success){
				if (success){
			can.route.attr('page', 'zoom');
			}
			else{
				this.attr('message', 'failed to login');
			}
			
			}
			
			callback(true);
		}
	}
});
