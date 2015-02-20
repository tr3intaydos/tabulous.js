/*!
 * tabulous.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {

    var pluginName = "tabulous",
        defaults = {
            effect: 'scale',
            target_class: 'tab-content',
			mainDiv: '#tabs_container'
        };

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var links = this.$elem.children('ul').find('a');
            var firstchild = this.$elem.find('li:first-child').find('a');
            var lastchild = this.$elem.find('li:last-child').after('<span class="tabulousclear"></span>');

			tab_content = this.$elem.find('.' + this.options.target_class).not(':first').not(':nth-child(1)');
            if (this.options.effect == 'scale') {
                tab_content.addClass('hidescale');
            } else if (this.options.effect == 'slideLeft') {
                tab_content.addClass('hideleft');
            } else if (this.options.effect == 'scaleUp') {
                tab_content.addClass('hidescaleup');
            } else if (this.options.effect == 'flip') {
                tab_content.addClass('hideflip');
            }

            var firstdiv = $( this.options.mainDiv );
            var firstdivheight = firstdiv.find('div:first').outerHeight();

            var alldivs = this.$elem.find('div:first').find('.' + this.options.target_class);

            alldivs.css({'position': 'absolute'});

            firstdiv.css('height',firstdivheight+'px');

            firstchild.addClass('tabulous_active');

            links.bind('click', {myOptions: this.options}, function(e) {
                e.preventDefault();

                var $options = e.data.myOptions;
                var effect = $options.effect;

                var mythis = $(this);
                var thisform = $( $options.mainDiv );
                var thislink = mythis.attr('href');


                firstdiv.addClass('transition');

                links.removeClass('tabulous_active');
                mythis.addClass('tabulous_active');
                thisdivwidth = thisform.find('div'+thislink).outerHeight();
				
				alldivs.addClass('make_transist');
				thisform.find('div'+thislink).addClass('make_transist')
				
                if (effect == 'scale') {
                    alldivs.removeClass('showscale').addClass('hidescale');
                    thisform.find('div'+thislink).addClass('showscale');
                } else if (effect == 'slideLeft') {
                    alldivs.removeClass('showleft').addClass('hideleft');
                    thisform.find('div'+thislink).addClass('showleft');
                } else if (effect == 'scaleUp') {
                    alldivs.removeClass('showscaleup').addClass('hidescaleup');
                    thisform.find('div'+thislink).addClass('showscaleup');
                } else if (effect == 'flip') {
                    alldivs.removeClass('showflip').addClass('hideflip');
                    thisform.find('div'+thislink).addClass('showflip');
                }

                firstdiv.css('height',thisdivwidth+'px');
            });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            new Plugin( this, options );
        });
    };

})( jQuery, window, document );