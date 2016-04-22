(function($){
    $(document).ready(function(){
        $('#mhmbrowsercheckjs').html(
            '<h3>You are using ' + basicBrowserInfo() + '</h3>'
            + detailedBrowserInfo()
            + '<button class="mhmbrowsercheckjs">Send this information to the site administrator</button>'
        );
        
        $(window).on('MHMBrowserCheckJs:initbutton', function(){
            $('button.mhmbrowsercheckjs').on('click', function(){
                $(window).trigger('MHMBrowserCheckJs:send');
            });
        }).trigger('MHMBrowserCheckJs:initbutton');
    });
})(jQuery);