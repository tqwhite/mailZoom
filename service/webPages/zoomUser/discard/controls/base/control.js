
	can.Control.extend('ZoomUser.Control.Base', {}, {
		init: function() {
		this.eventNameSpace=Math.random().toString().replace(/0\./,'');
		},

		update: function(options) {},

		sayMyName: function() {

			console.log("this.controllerName=" + this.controllerName);
			console.log("_fullName=" + this._fullName);
		},
		
		// CLICK MANAGEMENT ========================================================================

		turnOffClicksForAwhile: function(milliseconds, callbacks) {

			// 		if (this.isAcceptingClicks()){this.turnOffClicksForAwhile();} //turn off clicks for awhile and continue, default is 500ms
			// 		else{return;}

			milliseconds = milliseconds ? milliseconds : 2000;
			callbacks = callbacks ? callbacks : {};

			this.setNotAcceptClicks();

			var setAcceptClicks = function(scope, args) {
				scope.setAcceptClicks();
			}
			if (typeof (callbacks.beforeFunction) == 'function') {
				callbacks.beforeFunction(callbacks.beforeArgs);
			}

			var setAcceptClicks = this.callback('setAcceptClicks');
			var postFunc = (typeof (callbacks.afterFunction) == 'function' ? callbacks.afterFunction : function() {
					return;
				});
			var afterArgs = callbacks.postArgs;
			var timeFunction = function() {
				setAcceptClicks();
				postFunc();
			};

			qtools.timeoutProxy(timeFunction, milliseconds);

		},

		setNotAcceptClicks: function() {
			this.acceptClicks = false;
		},

		setAcceptClicks: function() {
			this.acceptClicks = true;
		},

		isAcceptingClicks: function() {
			return this.acceptClicks;
		},
		
		loadCssFile:function(filePath, callback){
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = filePath;
			document.getElementsByTagName("head")[0].appendChild(link);
			var count=0,
			tryAgain=function(){
				for (var i=0, len=document.styleSheets.length; i<len; i++){
					var element=document.styleSheets[i];
					if (element.href && element.href.match(filePath)){
						callback();
						return;
					}
				}
						if (count<10){
							count++;
							setTimeout(tryAgain, 100);
						}
						else{
							throw "base.control.loadCssFile failed on to find "+filePath;
						}
			}
			setTimeout(tryAgain, 100);
		},
		
		callback:function(methodName){
			return this[methodName].bind(this);
		}
	});

