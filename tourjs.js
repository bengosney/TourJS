/*

    Copyright Ben Gosney 2013
    bengosney@googlemail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
          

(function( $ ) {
    
    function highlightItem(selector) {
	var $item = $(selector);

	$item.data('zindex', $item.css('z-index'));

	var itemStyles = {
	    'z-index': 1000
	};

	if($item.css('position') == 'static') {
	    itemStyles.position = 'relative';
	}

	$item.css(itemStyles);

	if($('#tour-block').length == 0) {
	    $(document.body).append('<div id="tour-block"></div>');
	    
	    var blockStyles = {
		'border':'none',
		'top': 0,
		'left': 0, 
		'border': 'none', 
		'padding': 0, 
		'margin':0, 
		'position': 'fixed', 
		'width': '100%',
		'height': '100%',
		'background': 'rgb(0,0,0)',
		'opacity': 0.6,
		'z-index': 999
	    };
	    
	    $('#tour-block').css(blockStyles);
	}else{
	    resetItem();
	    $('#tour-block').css('display','block');
	}

	$('#tour-block').data('highlightItem',selector);
    }

    function removeHeighlight() {
	resetItem();

	$('#tour-block').css('display','none');
    }

    function resetItem() {
	var $item = $($('#tour-block').data('highlightItem'));

	$item.css('z-index',$item.data('zindex'));
    }

    $.startTour = function( data ) {
	
	highlightItem(data[0].selector);

	$('#tour-block').data('tourNum', 1);

	$('#tour-block').click(function () {
		if(typeof data[$('#tour-block').data('tourNum')] != 'undefined') {
		    highlightItem(data[$('#tour-block').data('tourNum')].selector);
		    $('#tour-block').data('tourNum', $('#tour-block').data('tourNum') + 1);
		}else{
		    removeHeighlight();
		}
	});

	return this;
    }
}( jQuery ));