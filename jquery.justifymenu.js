// jQuery plugin for filling the space within parent element 
// by increasing padding of floated child elements
(function($) {
    
    $.fn.justifyMenu = function(options) {
        
        var $menu, 
            maxWidth, 
            rows,
            $items, 
            $links,
            beginInd,
            endInd,
            lineWidth,
            selector,
            $rowItems,
            addLength,
            i;
        
        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            includeMargin   : false,
            elementTag      : 'a',
            extendProperty  : 'padding'
        }, options);
            
        return this.each(function() {
        
            $menu = $(this);
            maxWidth = $menu.width();  // Available width
            $items = $menu.children(); // Menu items
                        
            // No items
            if (!$items.length)
                return;
                                   
            // By default padding is added to A elements to extend the hit area
            // Check if menu item is the target. Otherwise define selector
            if ($items.prop('tagName') != settings.elementTag.toUpperCase())
                selector = settings.elementTag;
            
            // Default amount of items / rows
            rows = getInitialItemsInRows($items, maxWidth, settings.includeMargin);
            
            // Start from first row
            beginInd = 0;
            
            // Justify row by row
            for (i in rows)
            {
                i = parseInt(i);
            
                // Ensure that items fit in row
                // Loop and drop items until the length to add is positive
                do {
                    lineWidth = 0;
                    endInd = beginInd + rows[i];
                    
                    // Calculate the width of current line                    
                    $rowItems = $items.filter(function(index) {
                        // Filter out items that are not on current row
                        return index >= beginInd && index < endInd;
                    }).each(function() {
                        lineWidth += $(this).outerWidth(settings.includeMargin);
                    });
                
                    // Length of empty space on current row
                    addLength = maxWidth - lineWidth;
                    
                    // Negative length - too many items -> push one to next row
                    if (addLength < 0)
                    {
                        rows[i]--;
                        // Add a row if it does not exist
                        rows[i + 1] = rows[i + 1] ? rows[i + 1] + 1 : 1;
                    }
                    
                } while (addLength < 0 && rows[i]);
                
                // Adjust items evenly with available space length
                adjustItems($rowItems, Math.floor(addLength / rows[i]), settings.extendProperty, selector);                
                
                // Update beginInd to next row
                beginInd = endInd;
            }
        });
    };
    
    
   /**
    * Get amount of needed rows
    */
    function getInitialItemsInRows($items, maxWidth, includeMargin) {
    
        var rowCount, 
            totalWidth = 0, 
            rows = new Array();
        
        $items.each(function() {
            // Total width
            totalWidth += $(this).outerWidth(includeMargin); 
        });

        rowCount = Math.ceil(totalWidth / maxWidth);
              
        // Set default item amount / row          
        for (var i = 0; i < rowCount; i++) 
        {
            if (i == 0) // More items to first line
                rows.push(Math.ceil($items.length / rowCount));
            else if (i == rowCount - 1) // Less to last
                rows.push(Math.floor($items.length / rowCount));
            else
                rows.push(Math.round($items.length / rowCount));
        }
        
        return rows;
    };
    
    
   /**
    * Adjust items evenly with given properties
    */
    function adjustItems($items, extendWidth, property, selector) {
        
        var leftAdd = Math.floor(extendWidth / 2),
            rightAdd = Math.ceil(extendWidth / 2);
    
        $items.each(function() {
            if (!selector)
            {
                $(this)
                    .css(property + '-right', rightAdd)
                    .css(property + '-left', leftAdd);
            }
            else
            {   
                $(this).children(selector)
                    .css(property + '-right', rightAdd)
                    .css(property + '-left', leftAdd);
            }
        });
        
    };
        
})(jQuery);