style_manager.js
==============

Style Collective management in javascript.  
You can solve the 'double definition of style' in  javascript and css.

#HTML
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/jQuery.example.css" />
    <link rel="stylesheet" type="text/css" href="css/app.css" />
    <style type="text/css">
                                                .   
                                                .   
    </style>
</head>
```
# ○ Usage
## $.sm
All css properties is in one structure.

###Example1
```javascript

$.sm

>Object {

    /* Media type list*/
    all: Object

        /* Selector and properties */
        #element: Object
            font-size: "18px"
            left: "-2px"
            position: "relative"
            vertical-align: "super"
        @-webkit-keyframes: Object
            blink: Object
                0%: Object
                    opacity: "0"
                100%: Object
            blink2: Object
        @font-face: Array[2]
            0: Object
                font-family: "sample1"
                src: "url(http://example.com/css/sample1.ttf), local(sample1.ttf)"
            1: Object
        @import: Array[1]
            0: "url("http://example.com/css/sample.css") handheld, tv;"
            length: 1
        @page: Object
            margin-bottom: "3px"
            margin-left: "3px"
            margin-right: "3px"
            margin-top: "3px"
            
    /* Media type list*/
    screen and (max-width: 480px): Object
    screen and (max-width: 659px): Object
    screen and (max-width: 768px): Object
    screen, tv: Object
        
        #element: Object
            font-size: "28px"
            left: "-20px"
                                                .   
                                                .   
```

And attach new css property in this structure.  

###Example1
```javascript

$.sm['all']['#plus']   = {background-color: 'rgba( 100, 100, 100, 0.65 )'};

```
###Example2
```javascript

$.sm['js_define'] =  {};
$.sm['js_define'] =  {body: function(){ 
                                return {position: 'fixed', font-size: '12px'}
                            }}
$.sm['js_define'] =  {#main_stage:   {display: 'block', background-color: 'rgba( 10, 10, 10, 1 )'},
                     .sub_stage:     {display: 'none', background-color: 'rgba( 0, 0, 0, 0 )'}}

```

# ○ License

MIT License Copyright (C) 2014 mirazle
