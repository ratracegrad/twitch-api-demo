$(document).ready(main);

var runOnce = false;
channelObj = {
    title: '',
    image: '',
    online: false,
    descr: '',
    link: ''
};
var channelArr = [];


function main() {

    function getFeatured() {
        $.ajax({
                   method: 'GET',
                   dataType: 'json',
                   url: 'https://api.twitch.tv/kraken/streams/featured',
                   success: function(channels) {
                       channels.featured.forEach(function(item) {
                           channelObj.title = item.stream.channel.name;
                           channelObj.image = item.image;
                           channelObj.descr = item.title;
                           channelObj.link = item.stream.channel.url;
                           channelArr.push(_.clone(channelObj));
                       });
                       console.log(channels);
                       channelArr.forEach(function(value) {
                           $.ajax({
                                      method: 'GET',
                                      url: 'https://api.twitch.tv/kraken/streams/' + value.title,
                                      dataType: 'json',
                                      success: function(results) {
                                          if (results.stream) {
                                              value.online = true;
                                          }
                                          var html = "<a href='" + value.link + "'><div class='row entry'>";
                                          html += "<div class='col-md-2'><span class='img'><img src='" + value.image + "' class='img-responsive img-circle' /></span></div>";
                                          html += "<div class='col-md-4'><span class='title'><br>" + value.title + "</span></div>";
                                          var st = (value.online === true) ? 'Online' : 'Offline';
                                          html += "<div class='col-md-2'><span class='status'><br>" + st + "</span></div>";
                                          html += "<div class='col-md-4'><span class='descr'><br>" + value.descr + "</span></div>";
                                          html += "</div></a>";
                                          $('.startHere').append(html);
                                      }
                                  });

                       })

                   }
               })
    }



    if (!runOnce) {
        getFeatured();
        runOnce = true;
    }
}