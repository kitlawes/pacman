/**
 * Created by Jean-Baptiste on 2/21/2017.
 */
"use strict";
var
    UserControls = require('../game/utils/usercontrols'),
    Configs = require('./config.js'),
    IntervalManager = require('../game/utils/intervalmanager');

module.exports = function (configId_str, userControl_bool) {
    var
        description_obj = Configs(configId_str),
        position_rect = description_obj.position,
        updatePos = function (point) {
            for (var n in point) {
                position_rect[n] = point[n];
            }
            description_obj.dom_el.setAttribute("x", position_rect.x);
            description_obj.dom_el.setAttribute("y", position_rect.y);
        },
        incrementPos = function (direction_obj) {
            console.log ('incrmentPos: ', direction_obj);
            var
                SPEED_NUM = 5,
                newPos_point =
                {
                    x: position_rect.x + (direction_obj.x * SPEED_NUM),
                    y: position_rect.y + (direction_obj.y * SPEED_NUM)
                };
            updatePos(newPos_point);
        },
        move = function () {
            IntervalManager.set(function () {
                updatePos({x: Number(position_rect.x) + 5});
            }, 20);
        };
    if (userControl_bool) {
        IntervalManager.set(function () {
                var direction_obj = {x: 0, y: 0};
                if (UserControls.pressedKey) {
                    switch (UserControls.pressedKey) {
                        case "ArrowRight":
                            direction_obj.x = 1;
                            break;
                        case "ArrowLeft":
                            direction_obj.x = -1;
                            break;
                        case "ArrowUp":
                            direction_obj.y = -1;
                            break;
                        case "ArrowDown":
                            direction_obj.y = 1;
                            break;
                    }
                    incrementPos(direction_obj);
                }
            }, 20);
    }
    return {
        set pos(point) {
            updatePos(point);
        },
        set moveDirection(point) {
            moveTo(point);
        }
    };
};
