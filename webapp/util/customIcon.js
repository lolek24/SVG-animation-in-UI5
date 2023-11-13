sap.ui.define(["sap/ui/core/IconPool"], 
function (IconPool) {
	'use strict';
	
   var customIconPool = function () {};

    var aCustomIcons = [
        { iconName: "noun-people-search", iconContent: "e900", iconType: "ci" }
    ];

    customIconPool.prototype.addIcon = function () {
         IconPool.addIcon(aCustomIcons[0].iconName, "customIcon", "icomoon", aCustomIcons[0].iconContent);
    }
    return customIconPool;
});