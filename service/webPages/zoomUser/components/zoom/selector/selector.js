var selector = can.Map.extend({});
selector = new selector({
	message: 'Click to Edit.',
	emailLists:MailZoom.attr('emailLists'),
	infoBoxPresent:false,
	infoBoxPresent:'',
	
	showListInfo:function(ev, el){
		var present=this.attr('infoBoxPresent');
		var refId = $(el).attr('refId');
		var listItem=qtools.getByProperty(this.emailLists, 'refId', refId);
	if (!present){
		this.attr('infoBoxPresent', $("<div can-click='clearListInfo' style='position:absolute;top:0px;left:20vw;min-width:15vw;min-height:20vh;background:rgba(100,100,100,.4);'>hello "+listItem.title+"</div>"));
		$(el).append(this.infoBoxPresent);
		}
	else{
		$(this.attr('infoBoxPresent')).remove();
		this.attr('infoBoxPresent', '');;
	}
	return false;
	},
	
	editList:function(el, ev){
	var handler=MailZoom.editListHandler;
	handler($(el).attr('refId'));
	}
	
});
	
	can.Component.extend({
	tag: 'mz-selector',
	template: can.view('/zoomUser/components/zoom/selector/selector.stache'),
	viewModel: selector
});
/*

		if (!this.infoBoxPresent) {
			var infoBox = $("<div can-click='clearListInfo' style='position:absolute;top:0px;left:10vw;min-width:15vw;min-height:20vh;background:rgba(100,100,100,.4);'>hello</div>");
			$(el).append(infoBox);
			this.attr('infoBoxPresent', infoBox);
		} else {
			$(this.attr('infoBoxPresent')).remove();
			this.attr('infoBoxPresent', '');
		}
		ev.stopPropagation();
	
	*/