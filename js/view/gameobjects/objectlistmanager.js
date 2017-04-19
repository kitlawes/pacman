/**
 * Created by Jean-Baptiste on 10/04/2017.
 */
var list_obj = {disabled: []},
    ArrayUtils = require('../../game/utils/arrayutils'),
    getList = function (listId_str) {
        var result_array = list_obj[listId_str];
        if (!listId_str) {
            return list_obj;
        }
        if (result_array) {
            return list_obj[listId_str];
        } else {
            throw (new Error('List "' + listId_str + '" not found'));
        }
    },
    createList = function (id_str, array) {
        if (!array) {
            array = [];
        }
        list_obj[id_str] = array;
        return list_obj[id_str];
    };

module.exports = {
    createList: createList,
    getList: getList,
    cleanAll: function () {
        var
            items_array,
            n;
        for (n in list_obj) {
            if (list_obj.hasOwnProperty(n)) {
                console.log(n);
                items_array = list_obj[n];

                while (items_array.length > 0) {
                    var
                        item_obj = items_array.pop(),
                        dom_el = item_obj.dom_el;
                    console.log('item_obj : ', item_obj);
                    if (dom_el) {
                        if (dom_el.parentNode) {
                            console.log ('REMOVE');
                            dom_el.parentNode.removeChild(dom_el);
                        }
                    }
                }
            }
        }
        console.log('cleanAll : ', list_obj);
    },
    pushItem: function (listId_str, item_obj) {
        getList(listId_str).push(item_obj);
    },
    disableItemFromList: function (listId_str, item_obj) {
        list_obj.disabled.push(item_obj);
        return createList(listId_str, ArrayUtils.remove(getList(listId_str), item_obj));
    }
};

