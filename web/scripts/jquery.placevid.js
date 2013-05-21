/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* placevid 1.0
*
* Copyright 2013, Sam Beckham - http://www.sambeckham.com
*
* Date: Tue May 21 18:00:00 2013 -0500
*/

(function($) {

    'use strict';

    $.fn.placevid = function(options) {

        options = options || {};
        var video = {},
            element = this,
            settings = {
                width     : $(this).data('width') || options.width || false,
                height    : $(this).data('height') || options.height || false,
                keyword   : $(this).data('keyword').replace(' ', '') || options.keyword || 'cats',
                classes   : $(this).attr('class') || options.classes || false,
                autoplay  : $(this).data('autoplay') || options.autoplay || false,
                color     : $(this).data('color') || options.color || false
            },
            getProperty = function(property, name) {
                name = name || property;
                if (!settings[property]) {
                    return '';
                }
                return name + '="' + settings[property] + '" ';
            };

            $.ajax({
                url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%0Awhere%20url%3D%22https%3A%2F%2Fvimeo.com%2Fsearch%3Fq%3D" + settings.keyword + "%22%0Aand%20compat%3D%22html5%22%0Aand%20xpath%3D'(%2F%2Fli%5B%40id%5Bstarts-with(.%2C%22video_%22)%5D%5D)%5B1%5D'&format=json&callback=?",
                dataType: 'jsonp',
                async: false,
                success: function(data) {
                    var videoId = data.query.results.li.id || 57691432;
                    video.id = videoId.replace("video_", "");
                    video.url = 'src="http://player.vimeo.com/video/' + video.id + '?byline=0&amp;portrait=0&amp;title=0" ';
                    video.width = getProperty('width');
                    video.height = getProperty('height');
                    video.classes = getProperty('classes', 'class');
                    video.embedCode = '<iframe ' + video.url + video.width + video.height + video.classes + 'frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                    $(element).replaceWith(video.embedCode);
                }
            });
    };

})(jQuery);

/*

TODO:
[ ] Add color functionality
[ ] Add autoplay functionality
[ ] Speed up the default video / add image placeholder whilst loading

*/