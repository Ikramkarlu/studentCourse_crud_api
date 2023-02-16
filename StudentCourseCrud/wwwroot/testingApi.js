

function geocodeAddress() {
    var address = document.getElementById('address').value;
    $.ajax({
    url: 'https://api.positionstack.com/v1/forward',
    data: {
        access_key: '8a97cb51dc374598b70d65f63b9906ce',
      query: address,
      limit: 1
    }
  }).done(function(data) {
    console.log(JSON.parse(data));
      //if (data.data.length > 0) {
      //    var latitude = data.data[0].latitude;
      //    var longitude = data.data[0].longitude;
      //    // Do something with the latitude and longitude, such as display a map
      //    console.log(latitude, longitude);
      //} else {
      //    // Handle case where no results were found
      //    console.log('No results found for address:', address);
      //}
  });

}

//function GetDataApi() {
//    const addressInput = $('#address');
//    const geocodeButton = $('#geocode-button');

//    // add an event listener to the button to geocode the address
//    geocodeButton.on('click', () => {
//        // get the address from the input field
//        const address = addressInput.val();
//        const accessKey = '8a97cb51dc374598b70d65f63b9906ce';
//        const url = 'https://api.positionstack.com/v1/forward';
//        // make the AJAX request
//        $.ajax({
//            url: url,
//            data: {
//                access_key: accessKey,
//                query: address,
//                limit: 1
//            }
//        }).done(function (data) {
//            console.log(data);
//            // extract geocoding information from the response
//            const latitude = data.data[0].latitude;
//            const longitude = data.data[0].longitude;
//            // display the latitude and longitude on the page
//            $('#latitude').text(latitude);
//            $('#longitude').text(longitude);
//        }).fail(function (jqXHR, textStatus, errorThrown) {
//            console.error(errorThrown);
//        });
//    });
//}