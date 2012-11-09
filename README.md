jQuery.justifyMenu
==================

A jQuery plugin to justify elements in a container to fill the entire horizontal space in each row


Example use case
----------------
```
    var menuWidth = $('#menu').width(); 
    
    if (menuWidth < 940 && menuWidth > 480)
        $('#menu ul.level-1').justifyMenu();
     
    var resizeTimeout;
    
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
```