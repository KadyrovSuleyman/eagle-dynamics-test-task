"use strict";
exports.__esModule = true;
exports.wff = exports.wf = void 0;
var list_1 = require("./list");
var CONNECTION_PERIOD = 2100;
var DISCONNECTION_PERIOD = 3500;
var DELAY_BEFORE_START_DISCONNECTIONS = 4000;
var getRandomInt = function (max) { return Math.floor(Math.random() * max); };
var wf = function (send) {
    var offline = list_1.list.map(function (player) { return player.id; });
    var online = [];
    var connectTimer = setTimeout(function tick() {
        connectTimer = setTimeout(tick, CONNECTION_PERIOD);
        var targetIdx = getRandomInt(offline.length);
        if (!offline[targetIdx]) {
            return;
        }
        send(JSON.stringify({
            connect: offline[targetIdx]
        }));
        online.push(offline[targetIdx]);
        offline.splice(targetIdx, 1);
    }, CONNECTION_PERIOD);
    setTimeout(function () {
        var disconnectTimer = setTimeout(function tick() {
            disconnectTimer = setTimeout(tick, DISCONNECTION_PERIOD);
            var targetIdx = getRandomInt(online.length);
            if (!online[targetIdx]) {
                return;
            }
            send(JSON.stringify({
                disconnect: online[targetIdx]
            }));
            offline.push(online[targetIdx]);
            online.splice(targetIdx, 1);
        }, DISCONNECTION_PERIOD);
    }, DELAY_BEFORE_START_DISCONNECTIONS);
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
