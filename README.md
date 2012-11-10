jQuery Plugin to Justify Menu
=============================

A jQuery plugin to justify elements in a container to fill the entire horizontal space in each row

Installation
------------
To install this plugin first include jQuery and the justifyMenu JS files
```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" type="text/javascript"></script>
<script src="scripts/jquery.justifymenu.js" type="text/javascript"></script>
```
The targeting menu might be e.g.
```
<ul id="main-menu">
    <li>
        <a href="#first">First</a>
    </li>
    <li>
        <a href="#second">Second</a>
    </li>
    <li>
        <a href="#third">Third</a>
    </li>
    <li>
        <a href="#fourth">Fourth</a>
    </li>
    <li>
        <a href="#fifth">Fifth</a>
    </li>
</ul>
```
Apply then the plugin in sites js
```
jQuery(function($) {
    $('#main-menu').justifyMenu();
});
```

Example use case
----------------
Live: http://www.kokkolansuunnistajat.fi

```
jQuery(function($) {

    var menuWidth = $('#menu').width(); 
    
    if (menuWidth < 940 && menuWidth > 480)
        $('#menu ul.level-1').justifyMenu();
     
    var resizeTimeout;
    
    // Re-check on resize
    $(window).resize(function() {
        
        if (resizeTimeout)
        {
            clearTimeout(resizeTimeout);
        }
        else // reset menu
        {
            $('#menu ul.level-1 a').css({
                'padding-left'  : 0,
                'padding-right' : 0
            });
        }
        
        resizeTimeout = setTimeout(function() {
        
            menuWidth = $('#menu').width();
            
            if (menuWidth < 940 && menuWidth > 480)
                $('#menu ul.level-1').justifyMenu();
                
            resizeTimeout = null;
            
        }, 200);
    });
});
```
