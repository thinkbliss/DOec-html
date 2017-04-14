window.Void = function() { }; (function($) { $.fn.voidLink = function() { return this.attr('href', 'javascript:Void()'); }; } (jQuery));
var Site = window.Site || {};
(function($) {

    //$.blockUI.defaults.css.cursor = "auto";

    $.stringFormat = function(str, args) {
        for (var i = 0; i < args.length; i++) {
            if (typeof args[i] !== "undefined") {
                str = str.replace("{" + i + "}", args[i]);
            } else {
                str = str.replace("{" + i + "}", "");
            }
        }

        return str;
    }

    Site.Init = function() {
        Site.OverlayContainer.Init();
        Site.PromoCodeResponse.Init();
        Site.CountryDropdown.Init();
        //Site.Validation.Init(); //should be last
    };  


    /* Overlay - Launches modal popup boxes.
    *   
    * @author Danielle Rivers
    * @memberOf Site
    * @namespace
    * @requires jQuery
    * @requires fancybox.js
    */

    Site.OverlayContainer = {
        Init: function() {
            $.fancybox.defaults = $.extend($.fancybox.defaults, {
                padding : 0,
                margin  : 0,
                maxWidth: '800px',
                width: '80%',
                autoDimensions  : false,
                autoScale       : false,
                overlayColor  : '#ffffff'
            });
            $('.various').fancybox(); 
            //$("#various1").fancybox();
        }
    };
    
    
    
    /* Promo code input limit .
    *   
    * @author Danielle Rivers
    * @memberOf Site
    * @namespace
    * @requires jQuery
    * 
    */    
    Site.PromoCodeResponse = {
        Init: function(){
            $counter = 0; // initialize 0 for limitting textboxes
			$('.promoAdd').click(function(){
				if ($counter < 3)
				{
					$counter++;
					$('.promoSuccess').append('<div>'+$('#promoCodeInput').val()+'</div>');
				}else{
					$('.promoInput').hide();
				}
			});
        }
    };    
    
    
    
    /* Country select dropdown .
    *   
    * @author Danielle Rivers
    * @memberOf Site
    * @namespace
    * @requires jQuery
    * 
    */    
    Site.CountryDropdown = {
        Init: function(){
			$('select[name="state"]').hide();
			$('select[name="province"]').hide();

			$('select[name="country"]').change( function(){
				var thisval = $(this).val();
				if( thisval !== 'US') {
					 $('select[name="state"]').hide();
				} else {
					 $('select[name="state"]').show();
				}
			});
			$('select[name="country"]').change( function(){
				var thisval = $(this).val();
				if( thisval !== 'CA') {
					 $('select[name="province"]').hide();
				} else {
					 $('select[name="province"]').show();
				}
			}); 
		}    
    };     
    
    
    
    

    var Utility = {
        formatNumber: function(number) {
            number += "";
            var parts = number.split('.');
            var integer = parts[0];
            var decimal = parts.length > 1 ? '.' + parts[1] : '';
            var regex = /(\d+)(\d{3})/;
            while (regex.test(integer)) {
                integer = integer.replace(regex, '$1' + ',' + '$2');
            }
            return integer + decimal;
        }
    };


    $(Site.Init);
} (jQuery));

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++){
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length));
    }
    return null;
}
