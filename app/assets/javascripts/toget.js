var currentList = 0;
var currentItem = 0;
var dataSource = null;

//load the lists
$(document).ready(fetchAndBuildList());

function fetchAndBuildList(){
	$.ajax({
				url: location.protocol + '//' +location.host + '/lists',
				type: 'GET',
				dataType: 'json',
				async: true,
				success: function(data){ 
					dataSource = data.lists;
					$("#lists").html(buildList(data.lists));
				}
	});
}

function buildList (lists){
	//will populate the list pane
	var newListPane = '<div style="height:15px;"></div><div class=col-md-12><ul id="myLists" class="nav nav-pills nav-stacked">';
	for (i=0; i<lists.length; i++){
		newListPane += '<li id="list_'+ lists[i].id +'"><a href="#" onclick="selectList(' + lists[i].id + ');"><span id="badge_'+ lists[i].id +'" class="badge pull-right">'+lists[i].items.length+'</span>'+lists[i].list_name+'</a></li>';
	}
	newListPane +="</ul></div>"
	return newListPane;
}
function clearItemDetail(){
	$("#item_detail").html('<h4 class="text-center"><small>Select an Item</small></h4>');
}
function clearItemsList(){
	$("#items").html('<h4 class="text-center"><small>Select a List</small></h4>');
}


function selectList(id){
	//change property to be selected and load data
	console.log('selecting list'+id);
	if (currentItem !=0) {
		clearItemDetail();
		currentItem = 0;
	}
	if (currentList != 0) {
		$("#list_"+currentList).removeClass('active');
	}
	$("#list_"+id).addClass('active');
	currentList = id;
	$.ajax({
		url: location.protocol + '//' +location.host + '/lists/'+id,
		type: "GET",
		datatype: "json",
		async: true,
		success: function(data) {
			items = data.list.items;
			var newItemsPane = '<div class="col-md-12">\n<div class="input-group">\n<input id="field_new_items" type="text" placeholder="New Item" class="form-control">\n<span class="input-group-btn">\n<button class="btn btn-default" type="button" onclick="createItem();"><span class="glyphicon glyphicon-plus"></span></button>\n</span>\n</div>\n<div style="height:15px;"></div></div><div class="col-md-12"><ul id="myItems" class="nav nav-pills nav-stacked">';
			for (i=0; i<items.length; i++){
				newItemsPane += '<li id="item_'+ items[i].id +'"><a href="#" onclick="selectItem(' + items[i].id + ');">'+items[i].item_name+'</a></li>';
			}
			newItemsPane +='</ul></div><div class="row"><div style="height:20px"></div></div><div style="height:15px;"></div><div class="row"><div class="col-md-10 col-md-offset-1"><button type="button" class="btn btn-default btn-block"onclick="deleteList();">Delete List</button></div></div>'
			$("#items").html(newItemsPane);
			$("#list_"+data.list.id).addClass('active');
		}
	});
	
}
function deleteList(){
	//delete the current list
	$.ajax({
		url: location.protocol + '//' +location.host + '/lists/'+currentList,
		type: "DELETE",
		datatype: "json",
		async: true,
		success: function(data){
			clearItemDetail();
			clearItemsList();
			fetchAndBuildList(); 
		}
	})
}

function deleteItem(){
	//delete the current list
	$.ajax({
		url: location.protocol + '//' +location.host + '/items/'+currentItem,
		type: "DELETE",
		datatype: "json",
		async: true,
		success: function(data){
			clearItemDetail();
			selectList(currentList);
		}
	})
}


function selectItem(id){
	if (currentItem != 0) {
		$("#item_"+currentItem).removeClass('active');
	}
	$("#item_"+id).addClass('active');
	currentItem = id;
	buildItemDetail(id);
}

function createItem(){
	if ($('#field_new_items').val() == ""){
		var itemName = "New Item";
	} else {
		var itemName = $('#field_new_items').val();
	}
	$.ajax({
		url: location.protocol + '//' +location.host + '/items',
		type: "POST",
		datatype: "json",
		data: { item: {
				list_id: currentList,
				item_name: itemName
			}
		},
		async: true,
		success: function(data) {
			buildListItems(currentList);
			selectItem(data.item.id);
			$("#item_"+data.item.id).addClass('active');
		}
	});
}
function pretty(val){
	if (val) {
		return val;
	} else
	{ 
		return "";
	}
}
function editItem(id){
	$.ajax({
		url: location.protocol + '//' +location.host + '/items/'+id,
		type: "GET",
		datatype: "json",
		async: true,
		success: function(data) {
			
			formHtml = '<div class="col-md-12"><form id="item_data" role="form"><input type="hidden" id="item_id" value="'+data.item.id+'"/><div class="form-group"><label for="item[quantity]">Quantity</label><input type="text" class="form-control" id="item_quantity"  value="'+pretty(data.item.quantity)+'" placeholder="1"></div>';
			formHtml += '<div class="form-group"><label for="item[item_name]">Item Name</label><input type="text" class="form-control" id="item_item_name" placeholder="Computer" value="'+pretty(data.item.item_name)+'"></div>';
			formHtml += '<div class="form-group"><label for="item[approximate_cost]">Approximate Cost</label><div class="input-group"><span class="input-group-addon">$</span><input type="text" class="form-control" id="item_approximate_cost" placeholder="1999.00" value="'+pretty(data.item.approximate_cost)+'"></div></div>';
			formHtml += '<div class="form-group"><label for="item[source]">Where to purchase</label><input type="text" class="form-control" id="item_source" placeholder="Apple" value="'+pretty(data.item.source)+'"></div>';
			formHtml += '<div class="form-group"><label for="item[source_url]">URL of Where to purchase</label><input type="text" class="form-control" id="item_source_url" placeholder="http://store.apple.com/"value="'+pretty(data.item.source_url)+'"></div>';
			formHtml += '<div class="form-group"><label for="item[reason_for_item]">Reason for the item</label><textarea class="form-control" id="item_reason_for_item" placeholder="My reason for working">'+pretty(data.item.reason_for_item)+'</textarea></div>';
			formHtml += '<button type="button" class="btn btn-success"onclick="saveItem();">Save Item</button> <button type="button" class="btn btn-default" onclick="deleteItem('+data.item.id+');">Delete Item</button></div>';
			$("#item_detail").html(formHtml);
		}
	});	
}

function saveItem(){
	//saves the item being edited

	$.ajax({
		url:location.protocol + '//' + location.host + '/items/'+currentItem,
		type: "PUT",
		data: {item:{
			id: $('#item_id').val(),
			item_name: $('#item_item_name').val(),
			quantity: $('#item_quantity').val(),
			approximate_cost: $('#item_approximate_cost').val(),
			source: $('#item_source').val(),
			source_url: $('#item_source_url').val(),
			reason_for_item: $('#item_reason_for_item').val()
			}
		},
		datatype:"json",
		async: true,
		success: function(data){
			buildItemDetail(currentItem);
		}
	})
}

function deleteItem(id){
	//deletes an item
	$.ajax({
		url: location.protocol + '//' + location.host + '/items/'+id,
		type: "delete",
		datatype:'json',
		anync: true,
		success: function(data){
			buildListItems(currentList);
			clearItemDetail();
		}
	})
}

function buildItemDetail(id){
	$.ajax({
		url: location.protocol + '//' +location.host + '/items/'+id,
		type: "GET",
		datatype: "json",
		async: true,
		success: function(data) {
			item = data.item;
			var itemHtml = '<dl class="dl-horizontal">\n';
			itemHtml += '<dt>Quantity</dt><dd>'+item.quantity +'</dd>\n';
			itemHtml += '<dt>Name</dt><dd>'+item.item_name +'</dd>\n';
			itemHtml += '<dt>Approx Cost</dt><dd>$'+item.approximate_cost +'</dd>\n';
			itemHtml += '<dt>Where to acquire</dt><dd>';
			if (item.source_url !=""){
				itemHtml += '<a href="'+item.source_url+'">'+item.source+'</a></dd>\n';
			} else {
				itemHtml += item.source + '</dd>';
			}
			itemHtml += '<dt>Reason</dt><dd>'+item.reason_for_item +'</dd>\n';
			itemHtml += '</dl><div class=col-md-12><button type="button" class="btn btn-default btn-block" onclick="editItem('+item.id+')">Edit Item</button></div>';
			$("#item_detail").html(itemHtml);
		}
	});
}
function buildListItems(list_id){
	$.ajax({
		url: location.protocol + '//' +location.host + '/lists/'+list_id,
		type: "GET",
		datatype: "json",
		async: false,
		success: function(data) {
			items = data.list.items;
			var newItemsPane = '<div class="col-md-12">\n<div class="input-group">\n<input id="field_new_items" type="text" placeholder="New Item" class="form-control">\n<span class="input-group-btn">\n<button class="btn btn-default" type="button" onclick="createItem();"><span class="glyphicon glyphicon-plus"></span></button>\n</span>\n</div>\n<div style="height:15px;"></div></div><div class="col-md-12">\n<ul id="myItems" class="nav nav-pills nav-stacked">';
			for (i=0; i<items.length; i++){
				newItemsPane += '<li id="item_'+ items[i].id +'"><a href="#" onclick="selectItem(' + items[i].id + ');">'+items[i].item_name+'</a></li>';
			}
			newItemsPane +='</ul><div class="row"><div style="height:20px"></div></div><div class="row"><div class="col-md-10 col-md-offset-1"><button type="button" class="btn btn-default btn-block"onclick="deleteList();">Delete List</button></div></div>'
			$("#items").html(newItemsPane);
			//update count of items in list
			$("#badge_"+data.list.id).html(items.length);
			console.log('badge '+ data.list.id + 'set to '+items.length);
			
		}
	});
}

function createList(){
	//adds a new list
	if ($('#field_new_list').val() == ""){
		var listName = "New List";
	} else {
		var listName = $('#field_new_list').val();
	}
	$.ajax({
		url: location.protocol + '//' +location.host + '/lists',
		type: "POST",
		datatype: "json",
		data: { list_name: listName},
		async: true,
		success: function(data) {
			fetchAndBuildList();
			selectList(data.list.id);
			$("#list_"+data.list.id).addClass('active');
		}
	});
}