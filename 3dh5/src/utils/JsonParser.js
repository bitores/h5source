var JSONJS = function(){};

JSONJS.apply = function(o, c, defaults) {
    if (defaults) {
        // no"this"reference for friendly out of scope calls
        JSONJS.apply(o, defaults);
    }
    if (o && c && typeof c == 'object') {
        for (var p in c) {
            o[p] = c[p];
        }
    }
    return o;
};

JSONJS.apply(JSONJS, {
    docObjs: new Array,



   getAttributeNodeValue: function(doc_el, attributeName) {
        var nodevalue = null;
        var attributes = null;
        if (doc_el != null) {
            attributes = doc_el["@attributes"];
        }

        if(attributes)
        	nodevalue = attributes[attributeName];

        if(nodevalue)
            return nodevalue.replace(/^\s+|\s+$/g,'').replace(/[ ]+/,' ');
        else
            return null;
    },

    getJSONChildNodes: function(root){
    	var itemNodes = [];

    	for(var k in root)
    	{
    		itemNodes.push(k);
    	}


    	return itemNodes;
    },

    getJSONChildNode: function(doc_el, nodeName) {
        var element = doc_el[nodeName]

        if(element)
        	return element;
        return null;
    },


    /**
     * 解析xml
     */
    parseJSON: function(jsonContent) {
        var docObj = JSON.parse(jsonContent);
        
        if(docObj)
        	return docObj;
        return null;
    }
});