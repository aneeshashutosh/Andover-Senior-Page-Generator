const shape = "square";
var size = "single";

var top2 = false;
var bottom = false;
var center = false;
var centerVert = false;

var listOfLayouts = []

$.ajax({
  url: "layouts",
  success: function(data) {
     $(data).find("a").each(function() {
        listOfLayouts.push( $(this).attr("href"));
     });

     for (var i = 1; i < listOfLayouts.length; i++) {
     	$("#layout-preview-container").append('<li>' + listOfLayouts[i] + '</li>');
  	}
  	refreshRecommendedLayouts();
}
});

function refreshRecommendedLayouts() {
	var query = "";
	query += shape + "-" + size;
	$("#layout-preview-container").css("display", "none");
	$("#layout-preview-container").empty();
	var firstItem = "";
	for (var i = 0; i < listOfLayouts.length; i++) {
		if (listOfLayouts[i].indexOf(query) > -1) {
			if (firstItem === "") {
				firstItem = listOfLayouts[i];
			}
			$("#layout-preview-container").append('<center><li id="' + listOfLayouts[i].substring(0, listOfLayouts[i].length - 5) + '"><img id="' + listOfLayouts[i].substring(0, listOfLayouts[i].length - 5) + '" src = "/apps/Andover-Senior-Page-Generator/layouts/img/' + listOfLayouts[i].substring(0, listOfLayouts[i].length - 5) + '.png"></li></center>');
			$("#" + listOfLayouts[i].substring(0, listOfLayouts[i].length - 5) ).click(function(event) {
				console.log("MEH! " + event.target.id + ".html");
				loadLayout(event.target.id + ".html");
			});
		}
	}
	$("#layout-preview-container").fadeIn( "slow" ).css("display", "block");
	if (! ($('.container').length)) {
		if (firstItem !== "") {
			loadLayout(firstItem);
		}
	}
}

function handleFileSelect(e) {
    if(e.originalEvent.dataTransfer) {
        if(e.originalEvent.dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();
            var files = e.originalEvent.dataTransfer.files;
            console.log(e.target.id);
            for (var i = 0, f; f = files[i]; i++) {
		        var url = URL.createObjectURL(f);
		        $(this).css("background-image", "url(" + url + ")");

				var image_url = $(this).css('background-image'),
				    image;

				image_url = image_url.match(/^url\("?(.+?)"?\)$/);

				if (image_url[1]) {
				    image_url = image_url[1];
				    image = new Image();
				    console.log(image_url);

				    var $bgImg = $(this);

				    $(image).load(function () {
				    	console.log (image.width);
				    	console.log (image.height);
				    	if ($bgImg.width() === $bgImg.height()) {
					        if (image.width > image.height) {
								$bgImg.backgroundDraggable({ axis: 'x' });
							} else {
								$bgImg.backgroundDraggable({ axis: 'y' });
							}
						}
						if ($bgImg.width() > $bgImg.height()) {
							if (image.width / image.height > $bgImg.width() / $bgImg.height()) {
								$bgImg.backgroundDraggable({ axis: 'x' });
							} else {
								$bgImg.backgroundDraggable({ axis: 'y' });
							}
						}
						if ($bgImg.width() < $bgImg.height()) {
							if (image.height / image.width > $bgImg.height() / $bgImg.width()) {
								$bgImg.backgroundDraggable({ axis: 'y' });
							} else {
								$bgImg.backgroundDraggable({ axis: 'x' });
							}
						}
				    });

				    image.src = image_url;
				}
				$(this).css("background-size", "cover");
				$(this).css("background-color", "transparent");
	        	$(this).css("background-repeat", "no-repeat");
				$(this).css("background-position", "initial");
		    }
        }   
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
}

function loadLayout(str) {
	$( "#editor-container" ).empty();
	$( "#editor-container" ).load("layouts/" + str, function() {
		$(".grid-item").dblclick(function(event) {
			if ( $(this).css("background-color") === "rgb(255, 255, 255)" ) {
				$(this).css("background", "url('img/background.jpg')");
				$(this).css("background-size", "cover");
				if ($(this).hasClass("hexagon")) {
					$(this).css("-webkit-background-clip", "text");
    				$(this).css("-webkit-text-fill-color", "transparent");
				}
			} else {
		    	$(this).css("background", "rgb(255, 255, 255)");
		    }
		});

		$( '.grid-item' ).on('dragover', handleDragOver);
		$( '.grid-item' ).on('drop', handleFileSelect);
		$( '.hexagon-overlay' ).on('dragover', handleDragOver);
		$( '.hexagon-overlay' ).on('drop', handleFileSelect);

		$( "#editor-container" ).css("transform", "scale(.4, .4)");
		$( "#editor-container" ).css("vertical-align", "top");
		$('body').css('height', '320')
		$('body').css('width', 'auto')

		if (center) {
			addHorizontalLetterbox();
		}
		if (centerVert) {
			addVerticalLetterbox();
		}
		if (top2) {
			addTopLetterbox();
		}
		if (bottom) {
			addBottomLetterbox();
		}
	});
}

function getVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable) {
			return pair[1];
		}
	}
	return(false);
}

$( document ).ready(function() {
    shape = getVariable("shape");
    size = getVariable("size");
    var letterbox = getVariable("letterbox");

    if (letterbox.indexOf("top") > -1) {
    	top2 = true;
    	$( "#top-selector" ).fadeIn( "fast" ).css("display", "block");
    }
    if (letterbox.indexOf("bottom") > -1) {
    	bottom = true;
    	$( "#bottom-selector" ).fadeIn( "fast" ).css("display", "block");
    }
    if (letterbox.indexOf("center") > -1) {
    	center = true;
    	$( "#center-selector" ).fadeIn( "fast" ).css("display", "block");
    }
    if (letterbox.indexOf("vert") > -1) {
    	center = true;
    	$( "#center-vert-selector" ).fadeIn( "fast" ).css("display", "block");
    }

    if (shape === "hexagon") {
    	$("#shape").css("background-image", "url('img/hexagon.png')");
    }
    if (size === "small") {
    	$("#size").css("background-image", "url('img/small.png')");
    } else if (size === "medium") {
    	$("#size").css("background-image", "url('img/medium.png')");
    } else if (size === "large") {
    	$("#size").css("background-image", "url('img/large-full.png')");
    }
});

$("#shape").click(function(event) {
	if (shape === "square") {
		shape = "hexagon";
    	$("#shape").css("background-image", "url('img/hexagon.png')");
	} else {
		shape = "square";
    	$("#shape").css("background-image", "url('img/square.png')");
    }
    refreshRecommendedLayouts();
});

$("#size").click(function(event) {
	if (size === "single") {
		size = "small";
    	$("#size").css("background-image", "url('img/small.png')");
	} else if (size === "small") {
		size = "medium";
    	$("#size").css("background-image", "url('img/medium.png')");
    } else if (size === "medium") {
		size = "large";
    	$("#size").css("background-image", "url('img/large-full.png')");
    } else {
    	size = "single"
    	$("#size").css("background-image", "url('img/single.png')");
    }
    refreshRecommendedLayouts();
});

$( "#top2" ).click(function() {
	if (!top2) {
		top2 = true;
		$( "#top-selector" ).fadeIn( "fast" ).css("display", "block");
		addTopLetterbox();
	} else {
		top2 = false;
		$( "#top-selector" ).fadeOut( "fast" );
		removeTopLetterbox();
	}
});

$( "#bottom" ).click(function() {
	if (!bottom) {
		bottom = true;
		$( "#bottom-selector" ).fadeIn( "fast" ).css("display", "block");
		addBottomLetterbox();
	} else {
		bottom = false;
		$( "#bottom-selector" ).fadeOut( "fast" );
		removeBottomLetterbox();
	}
});

$( "#center" ).click(function() {
	if (!center) {
		center = true;
		$( "#center-selector" ).fadeIn( "fast" ).css("display", "block");
		addHorizontalLetterbox();
	} else {
		center = false;
		$( "#center-selector" ).fadeOut( "fast" )
		removeHorizontalLetterbox();
	}
});

$( "#center-vert" ).click(function() {
	if (!centerVert) {
		centerVert = true;
		$( "#center-vert-selector" ).fadeIn( "fast" ).css("display", "block");
		addVerticalLetterbox();
	} else {
		centerVert = false;
		$( "#center-vert-selector" ).fadeOut( "fast" )
		removeVerticalLetterbox();
	}
});

$(function() { 
    $("#download-2").click(function() { 
		$( "#editor-container" ).css("transform", "scale(1, 1)");
        html2canvas($("#editor-container"), {
        	height : 1500,
        	width : 1200, 
        	logging : true,
        	useCORS : true,
            onrendered : function(canvas) {
                theCanvas = canvas;
                document.body.appendChild(canvas);
				var img = canvas.toDataURL("image/png");
			    document.write('<img src="' + img + '"/>');
			    var imageInsert = document.createElement("img");
                document.body.removeChild(canvas);
            }
        });
        $( "#editor-container" ).css("transform", "scale(0.4, 0.4)");
    });
}); 

function addHorizontalLetterbox() {
    if ($('.container').length){
        $('.collage').append('<div id="square-horizontal-letterbox" class="letterbox grid-item layout-item-square" style="width: 900px; height: 556px; left: 140px; top: 462px; background-color: rgb(255, 255, 255); background-image: none;"></div>');
    	$("#square-horizontal-letterbox").dblclick(function(event) {
			if ( $(this).css("background-color") === "rgb(255, 255, 255)" ) {
				$(this).css("background", "url('img/background.jpg')");
				$(this).css("background-size", "cover");
			} else {
		    	$(this).css("background", "rgb(255, 255, 255)");
		    }

		$( '#square-horizontal-letterbox' ).on('dragover', handleDragOver);
		$( '#square-horizontal-letterbox' ).on('drop', handleFileSelect);
		});
    }
}

function removeHorizontalLetterbox() {
    if ($('.container').length){
        $('#square-horizontal-letterbox').remove();
    }
}

function addVerticalLetterbox() {
    if ($('.container').length){
        $('.collage').append('<div id="square-vertical-letterbox" class="letterbox grid-item layout-item-square" style="height: 888px; width: 580px; left: 295px; top: 300px; background-color: rgb(255, 255, 255); background-image: none;"></div>');
    	$("#square-vertical-letterbox").dblclick(function(event) {
			if ( $(this).css("background-color") === "rgb(255, 255, 255)" ) {
				$(this).css("background", "url('img/background.jpg')");
				$(this).css("background-size", "cover");
			} else {
		    	$(this).css("background", "rgb(255, 255, 255)");
		    }
		});

		$( '#square-vertical-letterbox' ).on('dragover', handleDragOver);
		$( '#square-vertical-letterbox' ).on('drop', handleFileSelect);
    }
}

function removeVerticalLetterbox() {
    if ($('.container').length){
        $('#square-vertical-letterbox').remove();
    }
}

function addTopLetterbox() {
    if ($('.container').length){
        $('.collage').append('<div id="top-letterbox" class="letterbox layout-item-square" style="width: 1200px; height: 100px; left: 0px; top: 0px; background-color: rgb(255, 255, 255); background-image: none;"></div>');
    }
}

function removeTopLetterbox() {
    if ($('.container').length){
        $('#top-letterbox').remove();
    }
}

function addBottomLetterbox() {
    if ($('.container').length){
        $('.collage').append('<div id="bottom-letterbox" class="letterbox layout-item-square" style="height: 100px; width: 1190px; left: 0px; top: 1390px; background-color: rgb(255, 255, 255); background-image: none;"></div>');
    }
}

function removeBottomLetterbox() {
    if ($('.container').length){
        $('#bottom-letterbox').remove();
    }
}

$( "#popup-close" ).click(function() {
	$( "#download-popup" ).fadeOut( "fast" ).css("display", "block");
});

$( "#download" ).click(function() {
	$( "#download-popup" ).fadeIn( "slow" ).css("display", "block");
});

$( "#help-close" ).click(function() {
	$( "#help-popup" ).fadeOut( "fast" ).css("display", "block");
});

$( "#help" ).click(function() {
	$( "#help-popup" ).fadeIn( "slow" ).css("display", "block");
});


$( document ).ready(function() {
    $( "#help-popup" ).fadeIn( "slow" ).css("display", "block");
 });