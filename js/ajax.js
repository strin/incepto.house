"use strict";

jQuery(window).load(function($) {

    var container = jQuery("#work-grid");
    //  Load more Portfolio Home

    //Load more Portfolio
    jQuery('#load-more').on('click', function (e) {
        e.preventDefault();
        var self = jQuery(this);
        var data = self.data();
            self.addClass('spinef');
        data['action'] = 'oak_load_more_portfolio';
        jQuery.ajax({
            url: ajax_url,
            type: 'post',
            dataType: 'json',
            data: data
        }).done(function (data) {
            self.data('page', data.page);
            
            container.isotope('insert', jQuery(data.content)).imagesLoaded( function() {
                    container.isotope('layout');
                    jQuery('.ef-fade').each(function(index, portfolio) {
                        setTimeout(function() {
                            container.isotope('reloadItems').isotope();
                            jQuery(portfolio).addClass('in');
                        }, index * 600);
                    });

                    self.removeClass('spinef');

            });


            
            if(data.page == self.data('mnp')){
                self.parent().remove();
            }
        }).fail(function () {
            alert('fail');
        });
    });
    
});
