/*
 Highcharts JS v5.0.12 (2017-05-24)
 Exporting module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(p){"object"===typeof module&&module.exports?module.exports=p:p(Highcharts)})(function(p){(function(e){var p=e.defaultOptions,t=e.doc,B=e.Chart,u=e.addEvent,K=e.removeEvent,H=e.fireEvent,n=e.createElement,D=e.discardElement,I=e.css,x=e.merge,E=e.pick,k=e.each,F=e.objectEach,y=e.extend,z=e.win,J=z.navigator.userAgent,G=e.SVGRenderer,L=e.Renderer.prototype.symbols,M=/Edge\/|Trident\/|MSIE /.test(J),N=/firefox/i.test(J);y(p.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",
downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});p.navigation={buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}};p.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",
menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};e.post=function(a,b,c){var d=n("form",x({method:"post",action:a,enctype:"multipart/form-data"},c),
{display:"none"},t.body);F(b,function(a,b){n("input",{type:"hidden",name:b,value:a},null,d)});d.submit();D(d)};y(B.prototype,{sanitizeSVG:function(a,b){if(b&&b.exporting&&b.exporting.allowHTML){var c=a.match(/<\/svg>(.*?$)/);c&&c[1]&&(c='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+b.chart.width+'" height\x3d"'+b.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+c[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",a=a.replace("\x3c/svg\x3e",c+"\x3c/svg\x3e"))}return a=a.replace(/zIndex="[^"]+"/g,
"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (NS[0-9]+\:)?href=/g," xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,
"\u00a0").replace(/&shy;/g,"\u00ad")},getChartHTML:function(){this.inlineStyles();return this.container.innerHTML},getSVG:function(a){var b,c,d,v,l,g=x(this.options,a);t.createElementNS||(t.createElementNS=function(a,b){return t.createElement(b)});c=n("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},t.body);d=this.renderTo.style.width;l=this.renderTo.style.height;d=g.exporting.sourceWidth||g.chart.width||/px$/.test(d)&&parseInt(d,10)||600;l=g.exporting.sourceHeight||
g.chart.height||/px$/.test(l)&&parseInt(l,10)||400;y(g.chart,{animation:!1,renderTo:c,forExport:!0,renderer:"SVGRenderer",width:d,height:l});g.exporting.enabled=!1;delete g.data;g.series=[];k(this.series,function(a){v=x(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});v.isInternal||g.series.push(v)});k(this.axes,function(a){a.userOptions.internalKey||(a.userOptions.internalKey=e.uniqueKey())});b=new e.Chart(g,this.callback);a&&k(["xAxis","yAxis","series"],function(d){var c=
{};a[d]&&(c[d]=a[d],b.update(c))});k(this.axes,function(a){var d=e.find(b.axes,function(b){return b.options.internalKey===a.userOptions.internalKey}),c=a.getExtremes(),f=c.userMin,c=c.userMax;!d||void 0===f&&void 0===c||d.setExtremes(f,c,!0,!1)});d=b.getChartHTML();d=this.sanitizeSVG(d,g);g=null;b.destroy();D(c);return d},getSVGForExport:function(a,b){var c=this.options.exporting;return this.getSVG(x({chart:{borderRadius:0}},c.chartOptions,b,{exporting:{sourceWidth:a&&a.sourceWidth||c.sourceWidth,
sourceHeight:a&&a.sourceHeight||c.sourceHeight}}))},exportChart:function(a,b){b=this.getSVGForExport(a,b);a=x(this.options.exporting,a);e.post(a.url,{filename:a.filename||"chart",type:a.type,width:a.width||0,scale:a.scale,svg:b},a.formAttributes)},print:function(){var a=this,b=a.container,c=[],d=b.parentNode,e=t.body,l=e.childNodes,g=a.options.exporting.printMaxWidth,f,m;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,0);H(a,"beforePrint");if(m=g&&a.chartWidth>g)f=[a.options.chart.width,void 0,
!1],a.setSize(g,void 0,!1);k(l,function(a,b){1===a.nodeType&&(c[b]=a.style.display,a.style.display="none")});e.appendChild(b);z.focus();z.print();setTimeout(function(){d.appendChild(b);k(l,function(a,b){1===a.nodeType&&(a.style.display=c[b])});a.isPrinting=!1;m&&a.setSize.apply(a,f);H(a,"afterPrint")},1E3)}},contextMenu:function(a,b,c,d,e,l,g){var f=this,m=f.chartWidth,q=f.chartHeight,v="cache-"+a,h=f[v],r=Math.max(e,l),C,w;h||(f[v]=h=n("div",{className:a},{position:"absolute",zIndex:1E3,padding:r+
"px"},f.container),C=n("div",{className:"highcharts-menu"},null,h),w=function(){I(h,{display:"none"});g&&g.setState(0);f.openMenu=!1},f.exportEvents.push(u(h,"mouseleave",function(){h.hideTimer=setTimeout(w,500)}),u(h,"mouseenter",function(){clearTimeout(h.hideTimer)}),u(t,"mouseup",function(b){f.pointer.inClass(b.target,a)||w()})),k(b,function(a){if(a){var b;b=a.separator?n("hr",null,null,C):n("div",{className:"highcharts-menu-item",onclick:function(b){b&&b.stopPropagation();w();a.onclick&&a.onclick.apply(f,
arguments)},innerHTML:a.text||f.options.lang[a.textKey]},null,C);f.exportDivElements.push(b)}}),f.exportDivElements.push(C,h),f.exportMenuWidth=h.offsetWidth,f.exportMenuHeight=h.offsetHeight);b={display:"block"};c+f.exportMenuWidth>m?b.right=m-c-e-r+"px":b.left=c-r+"px";d+l+f.exportMenuHeight>q&&"top"!==g.alignOptions.verticalAlign?b.bottom=q-d-r+"px":b.top=d+l-r+"px";I(h,b);f.openMenu=!0},addButton:function(a){var b=this,c=b.renderer,d=x(b.options.navigation.buttonOptions,a),e=d.onclick,l=d.menuItems,
g,f,m=d.symbolSize||12;b.btnCount||(b.btnCount=0);b.exportDivElements||(b.exportDivElements=[],b.exportSVGElements=[]);if(!1!==d.enabled){var q=d.theme,k=q.states,h=k&&k.hover,k=k&&k.select,r;delete q.states;e?r=function(a){a.stopPropagation();e.call(b,a)}:l&&(r=function(){b.contextMenu(f.menuClassName,l,f.translateX,f.translateY,f.width,f.height,f);f.setState(2)});d.text&&d.symbol?q.paddingLeft=E(q.paddingLeft,25):d.text||y(q,{width:d.width,height:d.height,padding:0});f=c.button(d.text,0,0,r,q,h,
k).addClass(a.className).attr({title:b.options.lang[d._titleKey],zIndex:3});f.menuClassName=a.menuClassName||"highcharts-menu-"+b.btnCount++;d.symbol&&(g=c.symbol(d.symbol,d.symbolX-m/2,d.symbolY-m/2,m,m).addClass("highcharts-button-symbol").attr({zIndex:1}).add(f));f.add().align(y(d,{width:f.width,x:E(d.x,b.buttonOffset)}),!0,"spacingBox");b.buttonOffset+=(f.width+d.buttonSpacing)*("right"===d.align?-1:1);b.exportSVGElements.push(f,g)}},destroyExport:function(a){var b=a?a.target:this;a=b.exportSVGElements;
var c=b.exportDivElements,d=b.exportEvents,e;a&&(k(a,function(a,d){a&&(a.onclick=a.ontouchstart=null,e="cache-"+a.menuClassName,b[e]&&delete b[e],b.exportSVGElements[d]=a.destroy())}),a.length=0);c&&(k(c,function(a,d){clearTimeout(a.hideTimer);K(a,"mouseleave");b.exportDivElements[d]=a.onmouseout=a.onmouseover=a.ontouchstart=a.onclick=null;D(a)}),c.length=0);d&&(k(d,function(a){a()}),d.length=0)}});G.prototype.inlineToAttributes="fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");
G.prototype.inlineBlacklist=[/-/,/^(clipPath|cssText|d|height|width)$/,/^font$/,/[lL]ogical(Width|Height)$/,/perspective/,/TapHighlightColor/,/^transition/];G.prototype.unstyledElements=["clipPath","defs","desc"];B.prototype.inlineStyles=function(){function a(a){return a.replace(/([A-Z])/g,function(a,b){return"-"+b.toLowerCase()})}function b(c){function q(b,e){n=u=!1;if(l){for(A=l.length;A--&&!u;)u=l[A].test(e);n=!u}"transform"===e&&"none"===b&&(n=!0);for(A=v.length;A--&&!n;)n=v[A].test(e)||"function"===
typeof b;n||r[e]!==b&&f[c.nodeName][e]!==b&&(-1!==d.indexOf(e)?c.setAttribute(a(e),b):p+=a(e)+":"+b+";")}var h,r,p="",w,n,u,A;if(1===c.nodeType&&-1===g.indexOf(c.nodeName)){h=z.getComputedStyle(c,null);r="svg"===c.nodeName?{}:z.getComputedStyle(c.parentNode,null);f[c.nodeName]||(m||(m=t.createElementNS(e.SVG_NS,"svg"),m.setAttribute("version","1.1"),t.body.appendChild(m)),w=t.createElementNS(c.namespaceURI,c.nodeName),m.appendChild(w),f[c.nodeName]=x(z.getComputedStyle(w,null)),m.removeChild(w));
if(N||M)for(var y in h)q(h[y],y);else F(h,q);p&&(h=c.getAttribute("style"),c.setAttribute("style",(h?h+";":"")+p));"svg"===c.nodeName&&c.setAttribute("stroke-width","1px");"text"!==c.nodeName&&k(c.children||c.childNodes,b)}}var c=this.renderer,d=c.inlineToAttributes,v=c.inlineBlacklist,l=c.inlineWhitelist,g=c.unstyledElements,f={},m;b(this.container.querySelector("svg"));m.parentNode.removeChild(m)};L.menu=function(a,b,c,d){return["M",a,b+2.5,"L",a+c,b+2.5,"M",a,b+d/2+.5,"L",a+c,b+d/2+.5,"M",a,b+
d-1.5,"L",a+c,b+d-1.5]};B.prototype.renderExporting=function(){var a=this,b=a.options.exporting,c=b.buttons,d=a.isDirtyExporting||!a.exportSVGElements;a.buttonOffset=0;a.isDirtyExporting&&a.destroyExport();d&&!1!==b.enabled&&(a.exportEvents=[],F(c,function(b){a.addButton(b)}),a.isDirtyExporting=!1);u(a,"destroy",a.destroyExport)};B.prototype.callbacks.push(function(a){a.renderExporting();u(a,"redraw",a.renderExporting);k(["exporting","navigation"],function(b){a[b]={update:function(c,d){a.isDirtyExporting=
!0;x(!0,a.options[b],c);E(d,!0)&&a.redraw()}}})})})(p)});
