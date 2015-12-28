var entry = can.Map.extend({});
var defaultTitle='Time to Zoom';
entry = new entry({
	message: defaultTitle,
	listStarted:false,
	
	currListItem: '',

	mailingList: new can.Map({
		title: '',
		refId: qtools.newGuid(),
			recipientList: new can.List()
	}),
//	recipientList: new can.List(),
	
	genList:function(title){
		return new can.Map({
			title: title,
			refId: qtools.newGuid(),
			recipientList: new can.List()
		})
	},
	
	genRecipient:function(emailAdr){
		return new can.Map({
			emailAdr: emailAdr,
			refId: '',
			listRefId: this.mailingList.refId
		});
	},
	
	copyRecipient:function(source, dest){
	if (!dest){
		return new can.Map({
			emailAdr: source.emailAdr,
			refId: source.refId,
			listRefId: this.mailingList.refId
		});
	}
	else{
		dest.attr('emailAdr', source.emailAdr);
		dest.attr('refId', source.refId);
		dest.attr('listRefId', source.listRefId);
		return dest;
	}
	},
	
	addToGlobalList:function(mailingList){
	
		var preExistingList=MailZoom.getByAttribute(MailZoom.emailLists, 'refId', mailingList.refId);
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

		var refId = this.currListItem.attr('refId');
		var emailAdr = this.currListItem.attr('emailAdr');
		var recipientList=this.attr('mailingList').attr('recipientList');

		if (qtools.getByProperty(recipientList, 'emailAdr', emailAdr)) {
			this.attr('message', "That email address is already on the list");
			return;
		}

		if (refId) {
			for (var i = 0, len = recipientList.length; i < len; i++) {
				var item = recipientList.attr(i);
				if (item.attr('refId') == refId) {
					this.copyRecipient(this.currListItem, item);
				}
			}

		} else {
			this.currListItem.attr('refId', qtools.newGuid());
			recipientList.push(this.currListItem);
		}
		
		var initRecipient=this.genRecipient((this.devFlag?'b@b.c':''));
		this.attr('currListItem', initRecipient);
		
		this.attr('message', defaultTitle);
		$(el).focus();
	},

	editItem: function(ev, el) {
		var refId = $(el).attr('refId');
		var recipientList=this.attr('mailingList').attr('recipientList');
		
		var editItem = qtools.getByProperty(recipientList, 'refId', refId);
		
		this.attr('currListItem', this.copyRecipient(editItem));
		$(this.editBox).focus();
	},

	goToLogin: function() {
		can.route.attr('page', 'login');
	},
	
	openExistingList:function(refId){
		var preExistingList=MailZoom.getByAttribute(MailZoom.emailLists, 'refId', refId);
		entry.attr('mailingList', preExistingList);
	}
});



MailZoom.editListHandler=function(refId){
entry.openExistingList(refId);
};

can.Component.extend({
	tag: 'mz-entry',
	template: can.view('/zoomUser/components/zoom/entry/entry.stache'),
	viewModel: entry
});


