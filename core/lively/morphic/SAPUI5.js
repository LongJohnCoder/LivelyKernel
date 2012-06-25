module('lively.morphic.SAPUI5').requires('lively.morphic.HTML').toRun(function() {

lively.morphic.Morph.subclass('lively.morphic.SAPUI5.Button',

'settings',{
    classes: 'sapUiBtn sapUiBtnNorm sapUiBtnS sapUiBtnStd',    
    activeClasses: 'sapUiBtn sapUiBtnNorm sapUiBtnS sapUiBtnAct'
},
'HTML render settings', {
    htmlDispatchTable: {
        updateLabel: 'updateLabelHTML',
        getButtonExtent: 'getButtonExtentHTML',
    },
},
'initializing', {
    initialize: function($super, bounds, optLabel) {
        $super(bounds);
        if (optLabel) this.setLabel(optLabel);
    },
    createShape: function(label) {
        var node = XHTMLNS.create('button');
        node.type = 'checkbox';
        if (label) node.innerHTML = label;
        return new lively.morphic.Shapes.External(node);
    },
},

'rendering', {
    initHTML: function($super, ctx) {
        if (!ctx.buttonNode)
            ctx.buttonNode= this.createButtonNodeHTML();
        ctx.subNodes = [];
        $super(ctx);
        if (this.shape) // FIXME should also be done when no shape exists...?
            this.updateLabel(this.label || [])
    },
    appendHTML: function($super, ctx, optMorphAfter) {
        $super(ctx, optMorphAfter);
        this.appendButtonHTML(ctx);
    },
    appendButtonHTML: function(ctx) {
        ctx.shapeNode.appendChild(ctx.buttonNode);
        this.resizeButtonHTML(ctx);
    },

    setClipModeHTML: function(ctx, clipMode) {
        // FIXME duplication wiht super, delay logic
        // can be extracted
        if (!ctx.listNode || this.delayedClipMode) {
            this.delayedClipMode = clipMode;
            return;
        }
        this.setClipModeHTMLForNode(ctx, ctx.listNode, clipMode);
    },

},

'node creation', {
    createButtonNodeHTML: function() {
        var node = XHTMLNS.create('button');
        node.style.cssText = 'white-space: pre';
        node.className = 'visibleSelection';
        return node;
    },
    getListExtentHTML: function(ctx) {
        return ctx.listNode.scrollHeight != 0 ? pt(ctx.listNode.scrollWidth, ctx.listNode.scrollHeight) : this.getExtent()
    },
},

'accessing', {
    setExtent: function($super, extent) {
        $super(extent);
        this.resizeButton();
    },
    resizeButton: function(idx) {
        return this.renderContextDispatch('resizeButton');
    },
    getButtonExtent: function() { return this.renderContextDispatch('getButtonExtent') }
},
'event handling', {

    onClick: function(evt) {
         if (evt.isCommandKey() || !evt.isLeftMouseButtonDown()) {
            evt.stop()
            return true;
        }
        lively.bindings.signal(this, 'fire', true);
         return true;
     },

},
'serialization', {
    prepareForNewRenderContext: function ($super, renderCtx) {
        $super(renderCtx);

    },
});


}) // end of module