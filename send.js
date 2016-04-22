var ajaxurl;

(function($){

	$(window).on('MHMBrowserCheckJs:send', function(e){
    	
    	if(ajaxurl){
    		$button = $('button.mhmbrowsercheckjs');
    		$wait = $('<p>Sending…</p>');
    		$button = $button.replaceWith($wait);
    		
    		mailtext = '';
    		$('div.inner').find('table').each(function(){
    			mailtext+='<table>'+$(this).html()+'</table>';
    		});
    
    		var jqxhr = $.ajax({
        		url: ajaxurl,
        		type: 'POST',
    		    data: { action: 'mhmbrowsercheckjs', data: mailtext },
    		    success: function(responseText){
                    $wait.replaceWith('<p class="success">' +responseText+ '</p>');
    		    },
    		    error: function(response){
        		    window.alert(response.responseText);
        		    $wait.replaceWith($button);
                    $(window).trigger('MHMBrowserCheckJs:initbutton');
    		    }
            });
        }
	});

})(jQuery);