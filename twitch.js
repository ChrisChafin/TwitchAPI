//list of channels we will hit
var channels = ["freecodecamp","syndicate","ESL_SC2", "riotgames", "monstercat", "summit1g", "nightblue3"];

//I used way too many arrays to get this to work
//Hopefully I will be more efficient as I improve
var channelList = [];
var logos = [];
var statusList = [];
var gameList = [];
var urls = [];

var nameList = $('#channel-list');
var nameParent = nameList.parent();

function getChannelInfo() {
  //for each channel
  channels.forEach(function(channel) {
    function buildURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };
    $.getJSON(buildURL("streams", channel), function(data) {
        // console.log(data)
      var game,
          status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      //format the data
      $.getJSON(buildURL("channels", channel), function(data) {
        var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
          name = data.display_name != null ? data.display_name : channel;

        channelList.push(name);
        logos.push(logo);
        statusList.push(status);
        gameList.push(game);
        urls.push(data.url)
        
        
        nameList.detach().empty().each(function(i){
          for (var x = 0; x < channelList.length; x++){
              $(this).append(
                '<li id="channel-name"' + 'class="' + statusList[x] + '">' +
                  '<div class="row">' +
                    '<div class="col col-lg-2 text-center">' +
                      '<img src="' + logos[x] + '" class="logo">' +
                      '</div>' +
                      '<div class="col text-center vert-center">' +'<a href="' + channelList[x] + '" target="_blank">' + channelList[x] + '</a></div>' +
                      '<div class="col text-center vert-center">' + gameList[x] + '</div>' +
                    '</div>' +
                  '</li>');
              if (x === channelList.length -1){
                  $(this).appendTo(nameParent);
              }
          }
        });    
      });
    });
  });
  
};

$(function() {
    getChannelInfo();
});