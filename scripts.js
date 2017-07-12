$(function(){

	var urlParams = {
		url: '/products',
		contentType: 'application/json',
		success: createHtmlFromResponse // createHtmlFromResponse(response from server);
	};

	// Call back function for the forEach loop
	function createTableRows(product){
		var tbodyEl = $('tbody');
		tbodyEl.append('<tr>\
							<td class="id">' 
								+ product.id + 
							'</td>\
							<td>\
								<input type="text" class="name" value="' 
								+ product.name +
								'">\
							</td>\
							<td>\
								<button class="update-button">UPDATE/PUT</button>\
							</td>\
							<td>\
								<button class="delete-button">DELETE</button>\
							</td>\
						</tr>');
	
}

	// Call back function for successful service call
	function createHtmlFromResponse(response){
		$('tbody').html('');
		response.products.forEach(createTableRows);
	}



	//GET/READ
	$('#get-button').on('click', function() {
		$.ajax(urlParams);
	});
	//CREATE/POST

	$('#create-form').on('submit', function() {
		event.preventDefault();
		var createInput = $('#create-input');
		$.ajax({

				url: '/products',
				method: 'post',
				contentType: 'application/json',
				data: JSON.stringify({ name: createInput.val() }),
				success: function(response){
					console.log(response);
					createInput.val('');
					$('#get-button').click();
				}

		});

	});
	//UPDATE/PUT
	$('table').on('click','.update-button', function(data){
		var rowEl = $(this).closest('tr');
		var id= rowEl.find('.id').text();
		var newName = rowEl.find('.name').val();
		$.ajax({

				url: '/products/' + id,
				method: 'put',
				contentType: 'application/json',
				data: JSON.stringify({ newName: newName }),
				success: function(response){
					console.log(response);
					$('#get-button').click();

				}


			});
		});
});
