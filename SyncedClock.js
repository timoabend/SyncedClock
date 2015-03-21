if (Meteor.isClient) {
    Meteor.startup(function () {
        setInterval(function () {
            Meteor.call("getServerTime", function (error, result) {
                Session.set("time_server", result);
            });
        }, 1000);
    });

    Template.clock_string.helpers({
      time_server: function () {
        return Session.get("time_server");
      },
      time_offset: function() {
        var time_server_milliseconds = new Date(Date.parse(Session.get("time_server"))).getTime();
        var time_client_milliseconds = new Date().getTime();
        var time_offset = time_server_milliseconds - time_client_milliseconds;
        return time_offset;
      }
    });
}

if (Meteor.isServer) {
    Meteor.methods({
        getServerTime: function () {
            var _time = (new Date).toISOString();
            return _time;
        }
    });
}
