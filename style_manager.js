$(function() {

    // Define Base Function
    var style_manager	= new Function;
    
    // Save all css property
    var map		= {};

    // Extend Protptype Base Plugin
    $.extend( style_manager.prototype, map );

    $.extend({ 'sm': new style_manager()});

    $(window).load(function() {

        for (var styleSheetsNum = 0; styleSheetsNum < document.styleSheets.length; styleSheetsNum++) {

            var rules = (document.styleSheets[styleSheetsNum]['rules'] != undefined) ?
                document.styleSheets[styleSheetsNum]['rules'] :
                document.styleSheets[styleSheetsNum]['cssRules'];

            set_rules(rules, styleSheetsNum);

            if (styleSheetsNum == document.styleSheets.length - 1) {
		$.extend({ 'sm': map });
                delete map;
            }
        }
    });

    function set_rules(rules, styleSheetsNum, rec_flg) {

        var rec_flg = (rec_flg == undefined) ? false : rec_flg;

        for (var style_num = 0; style_num < rules.length; style_num++) {

            if (rules[style_num]['parentRule'] == null) {
                var media = (rules[style_num]['parentStyleSheet']['media']['mediaText'] != '') ?
                    rules[style_num]['parentStyleSheet']['media']['mediaText'] : 'all';
            } else {
                var media = (rules[style_num]['parentRule']['media']['mediaText'] != '') ?
                    rules[style_num]['parentRule']['media']['mediaText'] : 'all';
            }

            if (map[media] == undefined) map[media] = {};

            switch (rules[style_num]['type']) {
                case 3:
                    set_import(rules, media, style_num);
                    break;
                case 4:

                    var dig_key = (rules[style_num]['rules'] != undefined) ? 'rules' : 'cssRules';
                    set_rules(rules[style_num][dig_key], styleSheetsNum, true);
                    break;
                case 5:
                    set_fontface(rules, media, style_num);
                    break;
                case 6:
                    set_page(rules, media, style_num);
                    break;
                case 7:
                    set_keyframe(rules, media, style_num);
                    break;
                default:
                    set_style(rules, media, style_num, rules[style_num]['type']);
                    break;
            }
        }
    }

    function set_page(rules, media, style_num, type) {

        if (map[media]['@page'] == undefined) {
            map[media]['@page'] = {};
        }

        for (var i = 0; i < rules[style_num]['style'].length; i++) {

            map[media]['@page'][rules[style_num]['style'][i]] =
                rules[style_num]['style'][rules[style_num]['style'][i]];
        }
    }

    function set_import(rules, media, style_num) {

        if (map[media]['@import'] == undefined) {
            map[media]['@import'] = new Array();
        }

        map[media]['@import'].push(rules[style_num]['cssText'].replace('@import ', ''));
    }

    function set_style(rules, media, style_num) {

        for (var i = 0; i < rules[style_num]['style'].length; i++) {

            if (map[media][rules[style_num]['selectorText']] == undefined) {

                map[media][rules[style_num]['selectorText']] = {};
            }

            map[media][rules[style_num]['selectorText']][rules[style_num]['style'][i]] =
                rules[style_num]['style'][rules[style_num]['style'][i]];
        }
    }

    function set_fontface(rules, media, style_num) {

        var font_face = {};

        if (map[media]['@font-face'] == undefined) {
            map[media]['@font-face'] = new Array();
        }

        for (var i = 0; i < rules[style_num]['style'].length; i++) {
            font_face[rules[style_num]['style'][i]] = rules[style_num]['style'][rules[style_num]['style'][i]];
        }

        map[media]['@font-face'].push(font_face);
    }

    function set_keyframe(rules, media, style_num) {

        var key_name = rules[style_num]['cssText'].split(rules[style_num]['name'])[0].replace(' ', '');

        if (map[media][key_name] == undefined) {

            map[media][key_name] = {};
        }

        if (map[media][key_name][rules[style_num]['name']] == undefined) {

            map[media][key_name][rules[style_num]['name']] = {};
        }

        var dig_key = (rules[style_num]['rules'] != undefined) ? 'rules' : 'cssRules';
        var css_text_array = rules[style_num]['cssText'].split(rules[style_num]['name']);

        for (var i = 0; i < rules[style_num][dig_key].length; i++) {

            if (map[media][key_name][rules[style_num]['name']] == undefined) {

                map[media][key_name][rules[style_num]['name']] = {};
            }

            for (var j = 0; j < rules[style_num][dig_key][i]['style'].length; j++) {

                if (map[media][key_name][rules[style_num]['name']][rules[style_num][dig_key][i]['keyText']] == undefined) {

                    map[media][key_name][rules[style_num]['name']][rules[style_num][dig_key][i]['keyText']] = {}
                }

                map[media][key_name][rules[style_num]['name']][rules[style_num][dig_key][i]['keyText']][rules[style_num][dig_key][i]['style'][j]] =
                    rules[style_num][dig_key][i]['style'][rules[style_num][dig_key][i]['style'][j]];
            }
        }
    }
});
