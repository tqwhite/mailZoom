var entry = can.Map.extend({});
entry = new entry({
	message: 'Time to Zoom',
	listStarted:false,
	
	currListItem: '',

	recipientList: new can.List(),
	listHeader: new can.Map({
		title: '',
		refId: qtools.newGuid()
	}),

	newList: function(ev, el) {
		this.attr('listStarted', false);
		this.attr('listHeader', new can.Map({
			title: '',
			refId: qtools.newGuid()
		}));
		this.attr('recipientList', new can.List());
		this.attr('message', "Time to Zoom");
		$('#listNameInput').focus();
	},

	saveListHeader: function(ev, el) {
		if (/[^A-Za-z0-9\.-_]/.test(this.listHeader.title)){
			this.attr('message', "Title has to be suitable for email. No spaces or weird characters.");
			return;
		}
		
		this.attr('listStarted', true);
		this.attr('currListItem', new can.Map({
			emailAdr: 'a@b.c',
			refId: '',
			listRefId: this.listHeader.refId
		}));
		
		$('#enterListItem').focus();
		this.attr('message', "Time to Zoom");
		
		MailZoom.emailLists.push(this.listHeader);


	},

	saveItem: function(ev, el) {

		this.editBox = el;
		if (!/\S+@\S+\.\S+/.test(el.val())) {
			this.attr('message', "This is not a valid email address format");
			return;
		}

		var refId = this.currListItem.attr('refId');
		var emailAdr = this.currListItem.attr('emailAdr');

		if (qtools.getByProperty(this.recipientList, 'emailAdr', emailAdr)) {
			this.attr('message', "That email address is already on the list");
			return;
		}

		if (refId) {
			for (var i = 0, len = this.recipientList.length; i < len; i++) {
				var item = this.recipientList.attr(i);
				if (item.attr('refId') == refId) {
					item.attr('emailAdr', this.currListItem.emailAdr);
					this.recipientList.attr(i, item);
				}
			}

		} else {
			this.currListItem.attr('refId', qtools.newGuid());
			this.recipientList.push(this.currListItem);
		}
		this.attr('currListItem', new can.Map({
			emailAdr: 'b@b.c',
			refId: '',
			listRefId: this.listHeader.refId
		}));

		$(el).focus();
	},

	editItem: function(ev, el) {
		var refId = $(el).attr('refId');
		var editItem = qtools.getByProperty(this.recipientList, 'refId', refId);
		this.attr('currListItem', editItem);
		$(this.editBox).focus();
	},

	goToLogin: function() {
		can.route.attr('page', 'login');
	},
	
	openExistingList:function(refId){
		var existingList=MailZoom.getByAttribute(MailZoom.emailLists, 'refId', refId);
		console.log('existingTitle='+existingList.attr('title'));
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


