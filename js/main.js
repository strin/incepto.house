"use strict";

//Esc Key 
jQuery.fn.escape = function(callback) {
    return this.each(function() {
        jQuery(document).on("keydown", this, function(e) {
            var keycode = ((typeof e.keyCode != 'undefined' && e.keyCode) ? e.keyCode : e.which);
            if (keycode === 27) {
                callback.call(this, e);
            };
        });
    });
};


//Menu Navigation Hamburger
var navigationRight = jQuery('.menu-wrap');
function Navigation() {
    var bodyEl = jQuery('body'),
        content = jQuery('#close-button'),
        navOverlay =jQuery('.nav-overlay'),
        openbtn = jQuery('#open-button, #open-mobile'),
        closebtn = jQuery('#close-button, #close-mobile'),
        isOpen = false;

    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.on('click', function(event) {
            toggleMenu();
        });

        if (closebtn) {
            closebtn.on('click', function(event) {
                toggleMenu();
            });
        }

        // close the menu element if the target it´s not the menu element or one of its descendants..
        content.on('click', function(ev) {
            var target = ev.target;
            if (isOpen && target !== openbtn) {
                toggleMenu();
            }
        });        
        navOverlay.on('click', function(ev) {
            var target = ev.target;
            if (isOpen && target !== openbtn) {
                toggleMenu();
            }
        });
    }

    function toggleMenu() {
        if (isOpen) {
            bodyEl.removeClass('show-menu');
            navOverlay.removeClass('is-open')

        
        } else {
            bodyEl.addClass('show-menu');
            navOverlay.addClass('is-open')
            
        }
        isOpen = !isOpen;
    }

    navigationRight.escape(function() {
        if (isOpen) {
            bodyEl.removeClass('show-menu');
            openbtn.removeClass('active');
            navOverlay.removeClass('is-open');

        }
        isOpen = !isOpen;
    });

    init();
};

(function () {
    var pspZoom;
    pspZoom = function (val, max) {
        return val / max * -25 + 12.5;
    };
    if (!Modernizr.touch) {
        jQuery('.parallax-move').mouseenter(function (e) {
            this.delayStamp = new Date();
            this.lastRatio = 0;
            return jQuery(this).find('img').css({
                '-webkit-transform': 'scale3D(1.5, 1.5, 1)',
                '-moz-transform': 'scale3D(1.5, 1.5, 1)',
                '-ms-transform': 'scale3D(1.5, 1.5, 1)',
                '-o-transform': 'scale3D(1.5, 1.5, 1)',
                'transform': 'scale3D(1.5, 1.5, 1)'
            });
        }).mousemove(function (e) {
            var offset, ratio, timeDiff, x, y;
            timeDiff = new Date() - this.delayStamp;
            ratio = timeDiff > 300 ? 1 : timeDiff / 300;
            ratio = ratio - this.lastRatio > 0.08 ? this.lastRatio + 0.075 : ratio;
            this.lastRatio = ratio;
            offset = jQuery(this).offset();
            x = pspZoom(e.pageX - offset.left, jQuery(this).width());
            y = pspZoom(e.pageY - offset.top, jQuery(this).height());
            return jQuery(this).find('img').css({
                'left': ratio * x + '%',
                'top': ratio * 5 * y + 'px'
            });
        }).mouseleave(function () {
            return jQuery(this).find('img').attr('data-translate-delay-stamp', '-1').css({
                '-webkit-transform': 'scale3D(1, 1, 1)',
                '-moz-transform': 'scale3D(1, 1, 1)',
                '-ms-transform': 'scale3D(1, 1, 1)',
                '-o-transform': 'scale3D(1, 1, 1)',
                'transform': 'scale3D(1, 1, 1)',
                'left': '0',
                'top': '0'
            });
        });
    }
}.call(this));


//Navigation Medium
jQuery('.hamburger-icon').on('click', function() {
    var self = jQuery(this),
        menuWrap = jQuery('.menu-wrap-3'),
        menuOverlay = jQuery('.nav-overlay');
        

    if (menuWrap.hasClass('is-active')) {
        menuWrap.removeClass('is-active')
        menuOverlay.removeClass('is-open');
        self.removeClass('active');
    }

    else{
        menuWrap.addClass('is-active');
        menuOverlay.addClass('is-open');
        self.addClass('active');
    }

});


jQuery('.nav-overlay').on('click', function() {
    jQuery('.menu-wrap-3').removeClass('is-active');
    jQuery('.hamburger-icon').removeClass('active');
});

//Tabs
function Tabs() {
    [].slice.call(document.querySelectorAll('.ef-tabs')).forEach(function(el) {
        new CBPFWTabs(el);
    });
};



//Dribble 
function getDribbbleThumbs() {
    var dribbbleUsername = jQuery('.dribbble-list').data('username'),
        dribbbleItems = jQuery('.dribbble-list').data('items');

    jQuery.jribbble.setToken('f688ac519289f19ce5cebc1383c15ad5c02bd58205cd83c86cbb0ce09170c1b4');
    jQuery.jribbble.users(dribbbleUsername).shots({
        per_page: dribbbleItems
    }).then(function(shots) {
        var html = [];
        shots.forEach(function(shot) {
            html.push('<div class="col-md-4 col-sm-4 col-xs-12 mix">');
            html.push('<div class="img dribbble-shot">');
            html.push('<img src="' + shot.images.normal + '">');
            html.push('<div class="overlay-thumb">');
            html.push('<div class="details">');
            html.push('<span class="title">' + shot.title + '</span>');
            html.push('</div>');
            html.push('<span class="btnBefore"></span><span class="btnAfter"></span>');
            html.push('<a class="main-portfolio-link" href="' + shot.html_url + '" target="_blank">');
            html.push('</div>');
            html.push('</div>');
            html.push('</div>');
        });
        jQuery('#work-grid').html(html.join(''));
    });
};





//Scroll Top 
jQuery.fn.scrollToTop = function() {
    jQuery(this).hide().removeAttr('href');
    if (jQuery(window).scrollTop() != '0') {
        jQuery(this).fadeIn();
    }
    var scrollDiv = jQuery(this);
    jQuery(window).scroll(function() {
        if (jQuery(window).scrollTop() == '0') {
            jQuery(scrollDiv).fadeOut(100);
        } else {
            jQuery(scrollDiv).fadeIn();
        }
    });
    jQuery(this).on('click', function() {
        jQuery('html, body').animate({
            scrollTop: 0
        }, 'slow')
    })
};

//Detect Mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

//Parallax Scroll
function parallaxScroll() {
    var scrolledY = jQuery(window).scrollTop();
    var headerImage = jQuery('.ef-parallax-bg');
    headerImage.css('background-position', 'center -' + ((scrolledY * 0.6)) + 'px');
};

//History Slider
function historySlider() {
    //History Images slide
    var historyimages = jQuery('.history-images');
    if (historyimages.length > 0) {
        historyimages.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 2000,
            slideSpeed: 300
        });
    }
};

//Like
// function likeEf() {
//     jQuery('.like-product').on('click',  function() {
//         jQuery(this).find('i').toggleClass('press');
//         jQuery(this).find('i').removeClass('ion-ios-heart-outline');
//         jQuery(this).find('span.like-product').toggleClass('press');
//         if (jQuery(this).find('i').hasClass('press') || jQuery(this).find('i').hasClass('ion-ios-heart-outline')) {
//             jQuery(this).find('.output').html(function(i, val) {
//                 return val * 1 + 1
//             });
//             jQuery(this).find('i').addClass('ion-ios-heart');
//             jQuery(this).find('i').removeClass('ion-ios-heart-outline');
//         } else {
//             jQuery(this).find('.output').html(function(i, val) {
//                 return val * 1 - 1
//             });
//             jQuery(this).find('i').removeClass('ion-ios-heart');
//             jQuery(this).find('i').addClass('ion-ios-heart-outline');

//         }
//     });
// };


function slidesLength(){
    var slidesNumber = jQuery('.owl-wrapper').find('.owl-item').length;
    if (slidesNumber < 2) {
        jQuery('.single-controls').remove();
    }
}

//Document Ready
jQuery(document).ready(function($) {


    //Navigation Sub Menu Triggering
    jQuery('.menu-item-has-children, .page_item_has_children').hover(function() {
        jQuery(this).children('.sub-menu, .children').stop().slideDown(200);
    }, 
    function() {
        jQuery(this).children('.sub-menu, .children').stop().slideUp(200);
    });

    //Mobile Menu Open/Close 
    jQuery('#open-mobile-menu').on('click', function() {
        var self = jQuery(this);
        var mobileMenu = jQuery('.menu-wrap-2');

        if (mobileMenu.hasClass('is-open')) {
            self.removeClass('active');
            mobileMenu.removeClass('is-open');
        } else {
            mobileMenu.addClass('is-open');
            self.addClass('active');
        }
    });

    //Dribbble
    if (jQuery('.dribble-grid').length > 0) {
        getDribbbleThumbs();
    };

    //Menu Right Side
    if (navigationRight.length > 0) {
        Navigation();
    };

    //Parallax Background on Desktop
    if (!isMobile.any()) {
        jQuery(window).on('scroll', function() {
            parallaxScroll();
        });
    };

    // Switch class on filter
    var showfilter = jQuery('.works-filter');
    jQuery('button.nav').on('click', function() {
        var self = jQuery(this);
        self.toggleClass('open');
        showfilter.toggleClass('open');
    });

    //Architecure Slider
    var archSlider = jQuery('.carousel-wide-slider');
    var prev = jQuery('.prev-slide');
    var next = jQuery('.next-slide');
    //Arch slider
    if (archSlider.length > 0) {
        archSlider.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 5000,
            slideSpeed: 300,

        });
        prev.on('click', function() {
            archSlider.trigger('owl.prev');
        });
        next.on('click', function() {
            archSlider.trigger('owl.next');
        });
    };

    //Single Project Slider
    var singleProjectSlider = jQuery('.single-slider');
    if (singleProjectSlider.length > 0) {
        singleProjectSlider.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 5000,
            slideSpeed: 300,

        });
        prev.on('click', function() {
            singleProjectSlider.trigger('owl.prev');
        });
        next.on('click', function() {
            singleProjectSlider.trigger('owl.next');
        });
    };

    //Team Slider
    var teamMembers = jQuery('.team');
    if (teamMembers.length > 0) {
        teamMembers.owlCarousel({
            pagination: true,
            items: 3,
            margin: 20,
            autoHeight: true,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [980, 2],
            itemsTablet: [768, 2],
            itemsMobile: [479, 1]
        });
    };

    //Tabs Slider
    var tabsSlider = jQuery('#tabs-slider');
    if (tabsSlider.length > 0) {
        tabsSlider.owlCarousel({
            singleItem: true,
            pagination: false,
            autoPlay: 3000,
            slideSpeed: 600,
        });
    };

    //Search
    var wrap = jQuery('.js-ui-search');
    var close = jQuery('.js-ui-close');
    var input = jQuery('.js-ui-text');
    close.on('click', function() {
        wrap.toggleClass('open');
    });
    input.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
        if (wrap.hasClass('open')) {
            input.focus();
        } else {
            return;
        }
    });

    //Finished loader
    Pace.on("done", function() {
        jQuery(".preloader").addClass('animated fadeOutRight').fadeOut(1000);
    });

    //Magnific Popup  
    jQuery('.popup-video').magnificPopup({
        type: 'iframe',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

    //Kenburnsy Slides
    jQuery('.slider-ef').kenburnsy();

    //Scroll Top
    jQuery('#scroll-top').scrollToTop();

    //Like
//  likeEf();

    //Slider 
    historySlider();


    //Init Tabs
    Tabs();

    //WOW Animation init 
    new WOW().init();

});

//Window Load
jQuery(window).load(function($) {

    slidesLength();
    
    /*Init Portfolio*/
    var container = jQuery("#work-grid");
    if (container.length > 0) {
        container.isotope({
            layoutMode: 'masonry',
            itemSelector: '.mix',
            columnWidth: 60,

        });
    };

    //Filter Portfolio
    jQuery('a.filter').on('click', function() {
        var to_filter = jQuery(this).attr('data-filter');
        if (to_filter == 'all') {
            container.isotope({
                filter: '.mix'
            });
        } else {
            container.isotope({
                filter: '.' + to_filter
            });
        }
    });

    //Switch Classes portfolio
    jQuery('.filter').on('click', function() {
        jQuery('a.filter').removeClass('active');
        jQuery(this).addClass('active');
    });
});