config.saves.autosave = true;
config.saves.autoload = "prompt";
Config.passages.nobr = false;
Config.cleanupWikifierOutput = true;

if (!window.GE) {
	window.GE = {};
}

GE.setCountry = function(cName) {
	State.variables.country = cName;
};

GE.setRegion = function(rName) {
	State.variables.region = rName;
};

$(document).on(':passagedisplay', function(ev) {
	if ( State.length < 2 ) {
	$( ".backButton" ).addClass( "disabled" );
		};
if (State.length === State.size) {
	$( ".forwardButton" ).addClass( "disabled" );
		};
});



//Enable scroll-triggered animations on elements, except on the Action Items list page
$(document).on(':passagedisplay', function(ev) {
	if (ev.passage.title != "Action Items") {
		$('.aniview').AniView();
  } 
});

/* Sidebar widget
   Syntax:
    <<sidebar [optional: title for sidebar]>>
        [Twine markup embodying the content of the sidebar]
    <</sidebar>> */
Macro.add("sidebar", {
    version: { major: 1, minor: 0, revision: 0 },
    tags: null,
    handler: function ()
    {
        if (this.payload.length !== 0)
        {
            // create the basic elements
            var   box = document.createElement("div");

            // set up the basic elements
            box.className = this.name;
					  if (this.args.length > 0) {
							var header = document.createElement("h3");
							header.className  = "sidebar";
							header.innerHTML  = this.args[0];
							box.appendChild(header);
						}
            
					  // process the payload
            var wikitext = this.payload[0].contents.trim();
					  var contentbox = document.createElement("div");
				  	contentbox.className = "sidebar-content";
            new Wikifier(contentbox, wikitext);
                box.appendChild(contentbox);

            // append the sidebar to the output buffer
            this.output.appendChild(box);
        }
    }
});


/* Deep Dive Widget
   Syntax:
    <<deepdive [optional:path to image to use as an accent]>>
        [Twine markup embodying the content of the sidebar]
    <</deepdive>> */
Macro.add("deepdive", {
    version: { major: 1, minor: 0, revision: 0 },
    tags: null,
    handler: function ()
    {
        if (this.payload.length !== 0)
        {
            // create the basic elements
            var   box = document.createElement("div")
                , header = document.createElement("h3");

            // set up the basic elements
            box.className = this.name;
            header.className  = "deepdive-header aniview";
            header.innerHTML  = "Dive Deeper";
	    header.setAttribute("data-av-animation", "slideInLeft");
            if (this.args.length > 0) {
		var image = document.createElement("img");
		image.className   = "deepdive-accent aniview";
		image.setAttribute("data-av-animation", "slideInRight");
		image.src = this.args[0]
		box.appendChild(image);
	    }
	    box.appendChild(header);
            // process the payload
            var wikitext = this.payload[0].contents.trim();
	    var contentbox = document.createElement("div");
	    contentbox.className = "deepdive-content";
            new Wikifier(contentbox, wikitext);
                box.appendChild(contentbox);

            // append the sidebar to the output buffer
            this.output.appendChild(box);
        }
    }
});

/* Resource Listings widget
   Syntax:
    <<resources>>
        [Twine markup embodying the content of the sidebar]
    <</resources>> */
Macro.add("resources", {
    version: { major: 1, minor: 0, revision: 0 },
    tags: null,
    handler: function ()
    {
        if (this.payload.length !== 0)
        {
            // create the basic elements
            var box = document.createElement("div"),
								header = document.createElement("h3");

            // set up the basic elements
            box.className = this.name;
					  
	    header.className  = "resources";
	    header.innerHTML  = "Resources";
	    box.appendChild(header);
            
	    // process the payload
            var contentbox = document.createElement("div");
	    contentbox.className = "resources-content";
            var wikitext = this.payload[0].contents.trim().split(/\s*\n\s*/);
            for (var i = 0; i < wikitext.length; i++)
            {
                var para = document.createElement("p");
                new Wikifier(para, wikitext[i]);
                contentbox.appendChild(para);
            }
            box.appendChild(contentbox);

            // append the div to the output buffer
            this.output.appendChild(box);
        }
    }
});

/* Action Item Widget
   Creates action item interface with buttons.

   Syntax:
    <<actionitem [variable name] [name of next passage]>>
        [Twine markup embodying the content of the action item]
    <</actionitem>> 
		
    where the first argument is the corresponding variable found on the Action Item page, minus its "$action" prefix.
	  */
Macro.add("actionitem", {
    version: { major: 1, minor: 0, revision: 0 },
    tags: null,
    handler: function ()
    {
        if (this.payload.length !== 0)
        {
					// create the basic elements
					var box = document.createElement("div"),
							stack = document.createElement("div"),
							container = document.createElement("div");

	    		// set up the basic elements
	    		stack.className = "action-card-back";
					stack.setAttribute("aria-hide", "true");
					box.className = "actionitem aniview fast";
					box.setAttribute("data-av-animation", "dropIn");
					container.className = "actionitem-container";
					
	    		//this.output.appendChild(banner);
					var wikitext = '<<sectionheader "Action Item">>';
					new Wikifier(this.output, wikitext);
            
            // process the payload
            wikitext = this.payload[0].contents.trim();
	    			wikitext += '<<action-buttons "' + this.args[0] + '" "' + this.args[1] + '">>';
					
	    			new Wikifier(box, wikitext);
	    			new Wikifier(stack, wikitext);
					
						container.appendChild(stack);
						container.appendChild(box);

	    			// append the action item div to the output buffer
	    			this.output.appendChild(container);
        }
    }
});



//Code to install the JQuery Anivew animation library
(function (window, define, exports) {

(function($) {

    //custom scroll replacement to allow for interval-based 'polling'
    //rathar than checking on every pixel
    var uniqueCntr = 0;
    $.fn.scrolled = function(waitTime, fn) {
        if (typeof waitTime === 'function') {
            fn = waitTime;
            waitTime = 200;
        }
        var tag = 'scrollTimer' + uniqueCntr++;
        this.scroll(function() {
            var self = $(this);
            var timer = self.data(tag);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function() {
                self.removeData(tag);
                fn.call(self[0]);
            }, waitTime);
            self.data(tag, timer);
        });
    };

    $.fn.AniView = function(options) {

        //some default settings. animateThreshold controls the trigger point
        //for animation and is subtracted from the bottom of the viewport.
        var settings = $.extend({
            animateThreshold: 0,
            scrollPollInterval: 20
        }, options);

        //keep the matched elements in a variable for easy reference
        var collection = this;

        //cycle through each matched element and wrap it in a block/div
        //and then proceed to fade out the inner contents of each matched element
        $(collection).each(function(index, element) {
            $(element).wrap('<div class="av-container"></div>');
            $(element).css('opacity', 0);
        });

        /**
         * returns boolean representing whether element's top is coming into bottom of viewport
         *
         * @param HTMLDOMElement element the current element to check
         */
        function EnteringViewport(element) {
            var elementOffset = $(element).offset();
            var elementTop = elementOffset.top + $(element).scrollTop();
            var elementBottom = elementOffset.top + $(element).scrollTop() + $(element).height();
            var viewportBottom = $(window).scrollTop() + $(window).height();
            return (elementTop < (viewportBottom - settings.animateThreshold)) ? true : false;
        }

        /**
         * cycle through each element in the collection to make sure that any
         * elements which should be animated into view, are...
         *
         * @param collection of elements to check
         */
        function RenderElementsCurrentlyInViewport(collection) {
            $(collection).each(function(index, element) {
                var elementParentContainer = $(element).parent('.av-container');
                if ($(element).is('[data-av-animation]') && !$(elementParentContainer).hasClass('av-visible') && EnteringViewport(elementParentContainer)) {
                    $(element).css('opacity', 1);
                    $(elementParentContainer).addClass('av-visible');
                    $(element).addClass('animated ' + $(element).attr('data-av-animation'));
                }
            });
        }

        //on page load, render any elements that are currently in view
        RenderElementsCurrentlyInViewport(collection);

        //enable the scrolled event timer to watch for elements coming into the viewport
        //from the bottom. default polling time is 20 ms. This can be changed using
        //'scrollPollInterval' from the user visible options
        $(window).scrolled(settings.scrollPollInterval, function() {
            RenderElementsCurrentlyInViewport(collection);
        });
    };
})(jQuery);

}).call(window, window);









































