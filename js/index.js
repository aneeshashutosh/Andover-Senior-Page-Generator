var shape = null;
var size = null;
var top2 = false;
var bottom = false;
var center = false;
var letterbox = null;

$( "#square" ).click(function() {
	shape = "square";
	$( "#shape-button-container" ).fadeOut( "fast", loadSizeBox)
});

$( "#hexagon" ).click(function() {
	shape = "hexagon";
	$( "#shape-button-container" ).fadeOut( "fast", loadSizeBox)
});

$( "#single" ).click(function() {
	size = "single";
	$( "#size-button-container" ).fadeOut( "fast", loadLetterBox)
});

$( "#small" ).click(function() {
	size = "small";
	$( "#size-button-container" ).fadeOut( "fast", loadLetterBox)
});

$( "#medium" ).click(function() {
	size = "medium";
	$( "#size-button-container" ).fadeOut( "fast", loadLetterBox)
});

$( "#large" ).click(function() {
	size = "large";
	$( "#size-button-container" ).fadeOut( "fast", loadLetterBox)
});

$( "#top2" ).click(function() {
	if (!top2) {
		top2 = true;
		$( "#top-selector" ).fadeIn( "fast" ).css("display", "block");
		$( "#go" ).fadeIn( "fast" ).css("display", "block");
	} else {
		top2 = false;
		$( "#top-selector" ).fadeOut( "fast" );
		if (!bottom && !top2 && !center) {
			$( "#go" ).fadeOut( "fast" );
		}
	}
});

$( "#bottom" ).click(function() {
	if (!bottom) {
		bottom = true;
		$( "#bottom-selector" ).fadeIn( "fast" ).css("display", "block");
		$( "#go" ).fadeIn( "fast" ).css("display", "block");
	} else {
		bottom = false;
		$( "#bottom-selector" ).fadeOut( "fast" );
		if (!bottom && !top2 && !center) {
			$( "#go" ).fadeOut( "fast" );
		}
	}
});

$( "#center" ).click(function() {
	if (!center) {
		center = true;
		$( "#center-selector" ).fadeIn( "fast" ).css("display", "block");
		$( "#go" ).fadeIn( "fast" ).css("display", "block");
	} else {
		center = false;
		$( "#center-selector" ).fadeOut( "fast" )
		if (!bottom && !top2 && !center) {
			$( "#go" ).fadeOut( "fast" );
		}
	}
});

$( "#no-letterbox" ).click(function() {
	top2 = false;
	bottom = false;
	center = false;
	loadCollageEditor();
});

$( "#go" ).click(function() {
	loadCollageEditor();
});

function loadSizeBox () {
	$( "#size-button-container" ).fadeIn( "fast" ).css("display", "flex");
	$( "#description" ).html( "Single senior pages have one photo.<br>Small senior pages have between 2 and 4 photos.<br>Medium-sized senior pages have between 5 and 10 photos.<br>Large senior pages have more than 10 photos." );
}

function loadLetterBox () {
	$( "#letterbox-button-container" ).fadeIn( "fast" ).css("display", "flex");
	$( "#description" ).html( "A letterbox is a space at the top, bottom, or<br>center of your senior page where you can place text.<br>You can choose more than one letterbox option." );
}

function loadCollageEditor() {
	var url = "collage.html?";
	url += "shape=" + shape;
	url += "&size=" + size;
	url += "&letterbox=" + getLetterbox();
	window.open(url, "_self");
}

function getLetterbox() {
	if (!top2 && !bottom && !center) {
		return "none";
	}
	var str = "";
	if (top2) {
		str += "top-"
	}
	if (bottom) {
		str += "bottom-"
	}
	if (center) {
		str += "center-"
	}
	return str.substring(0, str.length - 1);
}