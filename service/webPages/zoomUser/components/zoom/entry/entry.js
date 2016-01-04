var entry = can.Map.extend({});
var defaultTitle='Time to Zoom';
entry = new entry({
	message: defaultTitle,
	listStarted:false,
	
	currListItem: '',

	mailingList: new can.Map({
		title: '',
			recipientList: new can.List()
	}),
//	recipientList: new can.List(),
	
	genList:function(title){
		return new can.Map({
			title: title,
			recipientList: new can.List()
		})
	},
	
	genRecipient:function(emailAdr){
		return new can.Map({
			emailAdr: emailAdr,
			_id: '',
			list_id: this.mailingList._id
		});
	},
	
	copyRecipient:function(source, dest){
	if (!dest){
		return new can.Map({
			emailAdr: source.emailAdr,
			_id: source._id,
			list_id: this.mailingList._id
		});
	}
	else{
		dest.attr('emailAdr', source.emailAdr);
		dest.attr('_id', source._id);
		dest.attr('list_id', source.list_id);
		return dest;
	}
	},
	
	addToGlobalList:function(mailingList){
	
		var preExistingList=MailZoom.getByAttribute(MailZoom.emailLists, '_id', mailingList._id);
		if (!preExistingList){
			MailZoom.emailLists.push(this.mailingList);
		}
	},

	newList: function(ev, el) {
		this.attr('listStarted', false);
		
		var initList=this.genList();
		this.attr('mailingList', initList);
	//	this.attr('mailingList').attr('recipientList', new can.List());
		
		
		this.attr('message', "Time to Zoom");
		$('#listNameInput').focus();
	},
	
	devFlag:true,

	savemailingList: function(ev, el) {
		if (/[^A-Za-z0-9\.-_]/.test(this.mailingList.title)){
			this.attr('message', "Title has to be suitable for email. No spaces or weird characters.");
			return;
		}
		
		this.addToGlobalList(this.mailingList);
		





			MailZoom.models.mailingList.save(this.mailingList, function(mailingList) {
				this.attr('title', "Saved: " + this.mailingList.title);
			}.bind(this), function(err) {

				var errNo = err.responseText.match(/^(.*?) /);
				switch (errNo[1]) {
					case 'E11000':
						var fieldName = err.responseText.match(/index: ([a-zA-Z]+).*\{.*:(.*?)\}/);

						humanMessage = "Duplicate " + fieldName[1] + " is not allowed. Value " + fieldName[2] + " is already in use";

						break;
					default:
						humanMessage = err.responseText;
						break;
				}


				//	E11000 duplicate key error collection: MailZoom.users index: userName_1 dup key: { : "tq" }

				this.attr('title', "List save rejected by Server: " + humanMessage);
			}.bind(this)
			)
			
			
			
			
			
			
			
		
		this.attr('listStarted', true);
		
		var initRecipient=this.genRecipient((this.devFlag?'a@b.c':''));
		this.attr('currListItem', initRecipient);
		
		$('#enterListItem').focus();
		this.attr('message', "Time to Zoom");


	},

	saveItem: function(ev, el) {

		this.editBox = el;
		if (!/\S+@\S+\.\S+/.test(el.val())) {
			this.attr('message', "This is not a valid email address format");
			return;
		}

		var _id = this.currListItem.attr('_id');
		var emailAdr = this.currListItem.attr('emailAdr');
		var recipientList=this.attr('mailingList').attr('recipientList');

		if (qtools.getByProperty(recipientList, 'emailAdr', emailAdr)) {
			this.attr('message', "That email address is already on the list");
			return;
		}

		if (_id) {
			for (var i = 0, len = recipientList.length; i < len; i++) {
				var item = recipientList.attr(i);
				if (item.attr('_id') == _id) {
					this.copyRecipient(this.currListItem, item);
				}
			}

		} else {
			//this.currListItem.attr('_id', qtools.newGuid());
			recipientList.push(this.currListItem);
		}
		
		var initRecipient=this.genRecipient((this.devFlag?'b@b.c':''));
		this.attr('currListItem', initRecipient);
		
		this.attr('message', defaultTitle);
		$(el).focus();
	},

	editItem: function(ev, el) {
		var _id = $(el).attr('_id');
		var recipientList=this.attr('mailingList').attr('recipientList');
		
		var editItem = qtools.getByProperty(recipientList, '_id', _id);
		
		this.attr('currListItem', this.copyRecipient(editItem));
		$(this.editBox).focus();
	},

	goToLogin: function() {
		can.route.attr('page', 'login');
	},
	
	openExistingList:function(_id){
		var preExistingList=MailZoom.getByAttribute(MailZoom.emailLists, '_id', _id);
		entry.attr('mailingList', preExistingList);
	}
});



MailZoom.editListHandler=function(_id){
entry.openExistingList(_id);
};

can.Component.extend({
	tag: 'mz-entry',
	template: can.view('/zoomUser/components/zoom/entry/entry.stache'),
	viewModel: entry
});


