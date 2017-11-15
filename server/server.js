var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

var connections = []
var state =  {
  "channels": [
    {
      "id": "C0G9QF9GW",
      "name": "random",
      "is_channel": true,
      "created": 1449709280,
      "creator": "U0G9QF9C6",
      "is_archived": false,
      "is_general": false,
      "name_normalized": "random",
      "is_shared": false,
      "is_org_shared": false,
      "is_member": true,
      "is_private": false,
      "is_mpim": false,
      "members": ["U0G9QF9C6", "U0G9WFXNZ"],
      "topic": {
        "value": "Other stuff",
        "creator": "U0G9QF9C6",
        "last_set": 1449709352
      },
      "purpose": {
        "value":
          "A place for non-work-related flimflam, faffing, hodge-podge or jibber-jabber you'd prefer to keep out of more focused work-related channels.",
        "creator": "",
        "last_set": 0
      },
      "previous_names": [],
      "num_members": 2
    },
    {
      "id": "C0G9QKBBL",
      "name": "general",
      "is_channel": true,
      "created": 1449709280,
      "creator": "U0G9QF9C6",
      "is_archived": false,
      "is_general": true,
      "name_normalized": "general",
      "is_shared": false,
      "is_org_shared": false,
      "is_member": true,
      "is_private": false,
      "is_mpim": false,
      "members": ["U0G9QF9C6", "U0G9WFXNZ"],
      "topic": {
        "value": "Talk about anything!",
        "creator": "U0G9QF9C6",
        "last_set": 1449709364
      },
      "purpose": {
        "value": "To talk about anything!",
        "creator": "U0G9QF9C6",
        "last_set": 1449709334
      },
      "previous_names": [],
      "num_members": 2
    }
  ],
  "messages": [
    {
      "channel_id": "C0G9QKBBL",
      "type": "message",
      "ts": "1358546515.000008",
      "user": "U2147483896",
      "text": "Hello"
    },
    {
      "channel_id": "C0G9QKBBL",
      "type": "message",
      "ts": "1358546515.000007",
      "user": "U2147483896",
      "text": "World",
      "is_starred": true,
      "reactions": [
        {
          "name": "space_invader",
          "count": 3,
          "users": ["U1", "U2", "U3"]
        },
        {
          "name": "sweet_potato",
          "count": 5,
          "users": ["U1", "U2", "U3", "U4", "U5"]
        }
      ]
    },
    {
      "channel_id": "C0G9QKBBL",
      "type": "something_else",
      "ts": "1358546515.000007",
      "wibblr": true
    },
    {
      "channel_id": "C0G9QKBBL",
      "text": "Containment unit is 98% full",
      "username": "ecto1138",
      "bot_id": "B19LU7CSY",
      "attachments": [
        {
          "text": "Don't get too attached",
          "id": 1,
          "fallback": "This is an attachment fallback"
        }
      ],
      "type": "message",
      "subtype": "bot_message",
      "ts": "1503435956.000247"
    }
  ],
  "users": [
    {
      "id": "W012A3CDE",
      "team_id": "T012AB3C4",
      "name": "shawn",
      "deleted": false,
      "color": "9f69e7",
      "real_name": "shawn",
      "tz": "America/Los_Angeles",
      "tz_label": "Pacific Daylight Time",
      "tz_offset": -25200,
      "profile": {
        "avatar_hash": "ge3b51ca72de",
        "status_text": "Print is dead",
        "status_emoji": ":books:",
        "real_name": "Egon Spengler",
        "display_name": "spengler",
        "real_name_normalized": "Egon Spengler",
        "display_name_normalized": "spengler",
        "email": "spengler@ghostbusters.example.com",
        "image_24": "https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg",
        "image_32": "https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg",
        "image_48": "https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg",
        "image_72": "https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg",
        "image_192":
          "https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg",
        "image_512":
          "https://.../avatar/e3b51ca72dee4ef87916ae2b9240df50.jpg",
        "team": "T012AB3C4"
      },
      "is_admin": true,
      "is_owner": false,
      "is_primary_owner": false,
      "is_restricted": false,
      "is_ultra_restricted": false,
      "is_bot": false,
      "updated": 1502138686,
      "is_app_user": false,
      "has_2fa": false
    },
    {
      "id": "W07QCRPA4",
      "team_id": "T0G9PQBBK",
      "name": "glinda",
      "deleted": false,
      "color": "9f69e7",
      "real_name": "Glinda Southgood",
      "tz": "America/Los_Angeles",
      "tz_label": "Pacific Daylight Time",
      "tz_offset": -25200,
      "profile": {
        "avatar_hash": "8fbdd10b41c6",
        "image_24": "https://a.slack-edge.com...png",
        "image_32": "https://a.slack-edge.com...png",
        "image_48": "https://a.slack-edge.com...png",
        "image_72": "https://a.slack-edge.com...png",
        "image_192": "https://a.slack-edge.com...png",
        "image_512": "https://a.slack-edge.com...png",
        "image_1024": "https://a.slack-edge.com...png",
        "image_original": "https://a.slack-edge.com...png",
        "first_name": "Glinda",
        "last_name": "Southgood",
        "title": "Glinda the Good",
        "phone": "",
        "skype": "",
        "real_name": "Glinda Southgood",
        "real_name_normalized": "Glinda Southgood",
        "display_name": "Glinda the Fairly Good",
        "display_name_normalized": "Glinda the Fairly Good",
        "email": "glenda@south.oz.coven"
      },
      "is_admin": true,
      "is_owner": false,
      "is_primary_owner": false,
      "is_restricted": false,
      "is_ultra_restricted": false,
      "is_bot": false,
      "updated": 1480527098,
      "has_2fa": false
    }
  ],
  "map": {
    "markers": [
      {
        "name": "Rixos The Palm Dubai",
        "position": [25.1212, 55.1535]
      },
      {
        "name": "Shangri-La Hotel",
        "location": [25.2084, 55.2719]
      },
      {
        "name": "Grand Hyatt",
        "location": [25.2285, 55.3273]
      }
    ]
  }
}

server.listen(process.env.PORT || 3001)

app.get('/', (req,res) => {res.sendFile(__dirname + '/index.html')})

io.sockets.on('connection', socket => {
  connections.push(socket)
  console.log(`Connected: ${connections.length}`)
  // io.sockets.emit('state', state)

  socket.on('message', data => {
    console.log(`Message ${data}`)
    io.sockets.emit('state', state)
  })

  socket.on('disconnect', socket => {
    connections.splice(connections.indexOf(socket),1)
    console.log(`Disconnected: ${connections.length}`)
  })
})