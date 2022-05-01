"use strict";
exports.__esModule = true;
exports.wff = exports.wf = void 0;
var list_1 = require("./list");
var getRandomInt = function (max) { return Math.floor(Math.random() * max); };
var wf = function (send) {
    var offline = list_1.list.map(function (player) { return player.id; });
    var online = [];
    var connectTimer = setTimeout(function tick() {
        connectTimer = setTimeout(tick, 2000);
        var targetIdx = getRandomInt(offline.length);
        if (!offline[targetIdx]) {
            return;
        }
        // console.log(JSON.stringify({
        //   connect: offline[targetIdx],
        // }));
        send(JSON.stringify({
            connect: offline[targetIdx]
        }));
        online.push(offline[targetIdx]);
        offline.splice(targetIdx, 1);
        // console.log(online);
        // console.log(offline);
    }, 2000);
    var disconnectTimer = setTimeout(function tick() {
        disconnectTimer = setTimeout(tick, 3000);
        var targetIdx = getRandomInt(online.length);
        if (!online[targetIdx]) {
            return;
        }
        send(JSON.stringify({
            disconnect: online[targetIdx]
        }));
        offline.push(online[targetIdx]);
        online.splice(targetIdx, 1);
        // console.log(offline);
        // console.log(online);
    }, 3000);
};
exports.wf = wf;
var wff = function (message, send) {
    var id;
    try {
        id = JSON.parse(message).info;
    }
    catch (err) {
        console.warn("json parse error: ".concat(err));
    }
    if (!id) {
        return;
    }
    send(JSON.stringify(list_1.list.find(function (player) { return player.id === id; })));
};
exports.wff = wff;
