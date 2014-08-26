$(function() {

    var map = {};

    // Define Base Function
    var style_manager = new Function;

    var inner_css_no = 1;

    function get_file_name(styles_num) {

        if (document.styleSheets[styles_num]['ownerNode']['dataset']['href'] != undefined) {

            var href_array = document.styleSheets[styles_num]['ownerNode']['dataset']['href'].split('/');

            for (var href_array_num = 0; href_array_num < href_array.length; href_array_num++) {

                if (href_array[href_array_num].indexOf('.css') >= 0) {
                    var file_names = href_array[href_array_num].split('.css');
                    return file_names[0].replace('.', '_');
                    break;
                }
            }
        } else {
            return '_style' + inner_css_no++;
        }
    }

    $(window).load(function() {

        for (var styleSheetsNum = 0; styleSheetsNum < document.styleSheets.length; styleSheetsNum++) {

            var file_name = get_file_name(styleSheetsNum);

            map[file_name] = {};

            var rules = (document.styleSheets[styleSheetsNum]['rules'] != undefined) ?
                document.styleSheets[styleSheetsNum]['rules'] :
                document.styleSheets[styleSheetsNum]['cssRules'];

            set_rules(file_name, rules, styleSheetsNum);

            if (styleSheetsNum == document.styleSheets.length - 1) {

                // Extend Protptype Base Plugin
                $.extend(style_manager.prototype, map);

                delete map;

                $.extend({
                    sm: new style_manager()
                });
            }
        }
    });

    function set_rules(file_name, rules, styleSheetsNum, rec_flg) {

        var rec_flg = (rec_flg == undefined) ? false : rec_flg;

        for (var style_num = 0; style_num < rules.length; style_num++) {

            if (rules[style_num]['parentRule'] == null) {
                var media = (rules[style_num]['parentStyleSheet']['media']['mediaText'] != '') ?
                    rules[style_num]['parentStyleSheet']['media']['mediaText'] : 'all';
            } else {
                var media = (rules[style_num]['parentRule']['media']['mediaText'] != '') ?
                    rules[style_num]['parentRule']['media']['mediaText'] : 'all';
            }

            if (map[file_name][media] == undefined) map[file_name][media] = {};

            switch (rules[style_num]['type']) {
                case 3:
                    set_import(file_name, rules, media, style_num);
                    break;
                case 4:
                    var dig_key = (rules[style_num]['rules'] != undefined) ? 'rules' : 'cssRules';
                    set_rules(file_name, rules[style_num][dig_key], styleSheetsNum, true);
                    break;
                case 5:
                    set_fontface(file_name, rules, media, style_num);
                    break;
                case 6:
                    set_page(file_name, rules, media, style_num);
                    break;
                case 7:
                    set_keyframe(file_name, rules, media, style_num);
                    break;
                default:
                    set_style(file_name, rules, media, style_num, rules[style_num]['type']);
                    break;
            }
        }
    }

    function set_page(file_name, rules, media, style_num, type) {

        if (map[file_name][media]['@page'] == undefined) {
            map[file_name][media]['@page'] = {};
        }

        for (var i = 0; i < rules[style_num]['style'].length; i++) {

            map[file_name][media]['@page'][rules[style_num]['style'][i]] =
                rules[style_num]['style'][rules[style_num]['style'][i]];
        }
    }

    function set_import(file_name, rules, media, style_num) {

        if (map[file_name][media]['@import'] == undefined) {
            map[file_name][media]['@import'] = new Array();
        }

        map[file_name][media]['@import'].push(rules[style_num]['cssText'].replace('@import ', ''));
    }

    function set_style(file_name, rules, media, style_num) {

        for (var i = 0; i < rules[style_num]['style'].length; i++) {

            if (map[file_name][media][rules[style_num]['selectorText']] == undefined) {

                map[file_name][media][rules[style_num]['selectorText']] = {};
            }

            map[file_name][media][rules[style_num]['selectorText']][rules[style_num]['style'][i]] =
                rules[style_num]['style'][rules[style_num]['style'][i]];
        }
    }

    function set_fontface(file_name, rules, media, style_num) {

        var font_face = {};

        if (map[file_name][media]['@font-face'] == undefined) {
            map[file_name][media]['@font-face'] = new Array();
        }

        for (var i = 0; i < rules[style_num]['style'].length; i++) {
            font_face[rules[style_num]['style'][i]] = rules[style_num]['style'][rules[style_num]['style'][i]];
        }

        map[file_name][media]['@font-face'].push(font_face);
    }

    function set_keyframe(file_name, rules, media, style_num) {

        var key_name = rules[style_num]['cssText'].split(rules[style_num]['name'])[0].replace(' ', '');

        if (map[file_name][media][key_name] == undefined) {

            map[file_name][media][key_name] = {};
        }

        if (map[file_name][media][key_name][rules[style_num]['name']] == undefined) {

            map[file_name][media][key_name][rules[style_num]['name']] = {};
        }

        var dig_key = (rules[style_num]['rules'] != undefined) ? 'rules' : 'cssRules';
        var css_text_array = rules[style_num]['cssText'].split(rules[style_num]['name']);

        for (var i = 0; i < rules[style_num][dig_key].length; i++) {

            if (map[file_name][media][key_name][rules[style_num]['name']] == undefined) {

                map[file_name][media][key_name][rules[style_num]['name']] = {};
            }

            for (var j = 0; j < rules[style_num][dig_key][i]['style'].length; j++) {

                if (map[file_name][media][key_name][rules[style_num]['name']][rules[style_num][dig_key][i]['keyText']] == undefined) {

                    map[file_name][media][key_name][rules[style_num]['name']][rules[style_num][dig_key][i]['keyText']] = {}
                }

                map[file_name][media][key_name][rules[style_num]['name']][rules[style_num][dig_key][i]['keyText']][rules[style_num][dig_key][i]['style'][j]] =
                    rules[style_num][dig_key][i]['style'][rules[style_num][dig_key][i]['style'][j]];
            }
        }
    }
});
