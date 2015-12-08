function getLocation(cb) {
    function displayLocation(latitude, longitude, cb) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                if (data.results[0]) {
                    var add = data.results[data.results.length-3].formatted_address;
                    console.log(add)
                    var value = add.split(",");

                    var count = value.length;
                    var country = value[count - 1];
                    var city = value[count - 2];
                    cb({
                        city: city,
                        country: country
                    });
                }
                else {
                    alert("address not found");
                }
            }
        };
        request.send();
    };
    navigator.geolocation.getCurrentPosition(function(position) {
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        displayLocation(x, y, cb);
    }, function(error) {
        var errorMessage = 'Unknown error';
        switch (error.code) {
            case 1:
                errorMessage = 'Permission denied';
                break;
            case 2:
                errorMessage = 'Position unavailable';
                break;
            case 3:
                errorMessage = 'Timeout';
                break;
        }
        alert(errorMessage);
    }, {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
    });
}

function ComposeCtrl(template) {

    var data = {
        text: null,
        quotebg: 'white',
        user: window.currentUser
    };

    var text = $(template).find('textarea');
    var postTexture = $(template).find('.postTexture');
    var blockquote = $(template).find('blockquote');
    
    var textures = ['white', 'blue', 'red', 'gray', 'green', 'black', 'pink', 'purple', 'orange', 'teal'];
    var textureIndex = 0;

    text.elastic();
    text.focus();

    postTexture.on('click', function(e) {
        var bg = $(this);
        
        if (textureIndex === textures.length - 1) textureIndex = -1;
        textureIndex++;
        
        blockquote.removeClass();
        blockquote.addClass('quote-card ' + textures[textureIndex]);

        data.quotebg = textures[textureIndex];
    });

    $(template).on('click', '.new-compose', function() {
        getLocation(function(location) {
            data.text = text.val();
            data.location = location;
            socket.emit('createPost', data, function() {
                var notification = new phonepack.Notification();
                notification.success('Successfully');

                navigation.closeCurrentPage();
            });
        });

    });

}

module.exports = ComposeCtrl;