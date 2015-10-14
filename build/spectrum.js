function SpectrumViewer(a){"string"===typeof a&&(a=document.getElementById(a));d3.select(a).selectAll("*").remove();this.svg=d3.select(a).append("svg").style("width","100%").style("height","100%");this.peptideFragKey=new PeptideFragmentationKey(this.svg,this);this.graph=new Graph(this.svg,this,{xlabel:"m/z",ylabel:"intensity"});this.peptideFragKey.highlightChanged.add(this.graph.setHighlights).context=this.graph;this.graph.highlightChanged.add(this.peptideFragKey.setHighlights).context=this.peptideFragKey}
SpectrumViewer.cmap=colorbrewer.Paired[6];SpectrumViewer.p1color=SpectrumViewer.cmap[5];SpectrumViewer.p1color_loss=SpectrumViewer.cmap[4];SpectrumViewer.p2color=SpectrumViewer.cmap[1];SpectrumViewer.p2color_loss=SpectrumViewer.cmap[0];SpectrumViewer.lossFragBarColour="#cccccc";SpectrumViewer.highlightColour="yellow";SpectrumViewer.highlightWidth=11;SpectrumViewer.notUpperCase=/[^A-Z]/g;
SpectrumViewer.prototype.setData=function(a,b,c,e,d){this.pep1=a.replace(SpectrumViewer.notUpperCase,"");this.pep2=c.replace(SpectrumViewer.notUpperCase,"");this.annotatedPeaks=d3.csv.parse(d.trim());this.linkPos1=b;this.linkPos2=e;this.lossyShown=!1;this.peptideFragKey.setData(this.pep1,this.linkPos1,this.pep2,this.linkPos2,this.annotatedPeaks);this.graph.setData(this.annotatedPeaks)};SpectrumViewer.prototype.clear=function(){this.pep2=this.pep1="";this.peptideFragKey.clear();this.graph.clear()};
SpectrumViewer.prototype.resize=function(){this.graph.resize()};SpectrumViewer.prototype.getSVG=function(){var a=this.svg[0][0].parentNode.innerHTML,a=a.replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" ');return'<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'+a};
SpectrumViewer.prototype.showLossy=function(a){this.lossyShown=a;this.peptideFragKey.clear();this.peptideFragKey.setData(this.pep1,this.linkPos1,this.pep2,this.linkPos2,this.annotatedPeaks);this.graph.setData(this.annotatedPeaks)};function PeptideFragmentationKey(a,b,c){this.highlightChanged=new signals.Signal;this.spectrumViewer=b;this.options=c||{};this.margin={top:this.options.title?40:20,right:20,bottom:this.options.xlabel?60:40,left:this.options.ylabel?100:80};this.g=a.append("g").attr("transform","translate("+this.margin.left+","+this.margin.top+")")}
PeptideFragmentationKey.prototype.setData=function(a,b,c,e,d){function f(a){for(var b=[],c=0;c<a;c++)b.push("#");return b}function k(a,b,c){for(var e=a.length,d=0;d<e;d++)"#"!=a[d]&&g.g.append("text").attr("x",20*d).attr("y",b).attr("text-anchor","middle").attr("fill",c).text(a[d])}function p(a,b,c){for(var e=q.length,d=0;d<e;d++){var f=a[d];if("#"!=f&&"--"!=f){var m=20*d+10;if(-1!=f.indexOf("b")){var h="M"+m+","+(b-20)+" L"+m+","+b+" L"+(m-5)+","+(b+5),k=g.g.append("path").attr("d",h).attr("stroke",
SpectrumViewer.highlightColour).attr("stroke-width",SpectrumViewer.highlightWidth).attr("opacity",0).attr("peptide",c).attr("fragKeyIndex",d),h=k[0][0];h.onmouseover=function(a){l(this.getAttribute("peptide"),this.getAttribute("fragKeyIndex"))};h.onmouseout=function(a){l()};h.ontouchstart=function(a){l(this.getAttribute("peptide"),this.getAttribute("fragKeyIndex"))};h.ontouchend=function(a){l()};c===g.spectrumViewer.pep1?g.pep1bFragHighlights[d]=k:g.pep2bFragHighlights[d]=k;h=g.g.append("line").attr("x1",
m).attr("y1",b).attr("x2",m-5).attr("y2",b+5).attr("class","fragBar");-1!=f.indexOf("bloss")?h.attr("stroke",SpectrumViewer.lossFragBarColour):h.attr("stroke","black")}-1!=f.indexOf("y")&&(h="M"+m+","+b+" L"+m+","+(b-20)+" L"+(m-5)+","+(b-20-5),k=g.g.append("path").attr("d",h).attr("stroke",SpectrumViewer.highlightColour).attr("stroke-width",SpectrumViewer.highlightWidth).attr("opacity",0).attr("peptide",c).attr("fragKeyIndex",d),h=k[0][0],h.onmouseover=function(a){l(this.getAttribute("peptide"),
this.getAttribute("fragKeyIndex"))},h.onmouseout=function(a){l()},h.ontouchstart=function(a){l(this.getAttribute("peptide"),this.getAttribute("fragKeyIndex"))},h.ontouchend=function(a){l()},c===g.spectrumViewer.pep1?g.pep1yFragHighlights[d]=k:g.pep2yFragHighlights[d]=k,h=g.g.append("line").attr("x1",m).attr("y1",b-20).attr("x2",m+5).attr("y2",b-20-5).attr("class","fragBar"),-1!=f.indexOf("yloss")?h.attr("stroke",SpectrumViewer.lossFragBarColour):h.attr("stroke","black"));m=g.g.append("line").attr("x1",
m).attr("y1",b).attr("x2",m).attr("y2",b-20).attr("class","fragBar");2==(f.match(/loss/g)||[]).length||"-yloss"==f||"bloss-"==f?m.attr("stroke",SpectrumViewer.lossFragBarColour):m.attr("stroke","black")}}}function l(a,b){g.clearHighlights();var c;a===g.spectrumViewer.pep1?(g.pep1bFragHighlights[b]&&g.pep1bFragHighlights[b].attr("opacity",1),g.pep1yFragHighlights[b]&&g.pep1yFragHighlights[b].attr("opacity",1),c=b-g.pep1offset):(g.pep2bFragHighlights[b]&&g.pep2bFragHighlights[b].attr("opacity",1),g.pep2yFragHighlights[b]&&
g.pep2yFragHighlights[b].attr("opacity",1),c=b-g.pep2offset);g.highlightChanged.dispatch(a,c)}function s(a,b){for(var c=[],d=1;d<b.length+1;d++){var e="-",f="-",k="a"+d,h="b"+d,l="c"+d;-1!=a.indexOf(k)||-1!=a.indexOf(h)||-1!=a.indexOf(l)?e="b":-1==a.indexOf(k+"loss")&&-1==a.indexOf(h+"loss")&&-1==a.indexOf(l+"loss")||1!=g.spectrumViewer.lossyShown||(e="bloss");k="x"+(b.length-d);h="y"+(b.length-d);l="z"+(b.length-d);-1!=a.indexOf(k)||-1!=a.indexOf(h)||-1!=a.indexOf(l)?f="y":-1==a.indexOf(k+"loss")&&
-1==a.indexOf(h+"loss")&&-1==a.indexOf(l+"loss")||1!=g.spectrumViewer.lossyShown||(f="yloss");c.push(e+f)}return c}var g=this;this.clear();this.pepSeq1=a;this.linkPos1=b;this.pepSeq2=c;this.linkPos2=e;var q=this.pepSeq1.replace(SpectrumViewer.notUpperCase,"");a=this.pepSeq2.replace(SpectrumViewer.notUpperCase,"");var r=/(.\d*)/g,n=d3.set();c=d3.set();for(var w=d.length,u=0;u<w;u++){var t=d[u];r.lastIndex=0;var v=r.exec(t.fragment_name.trim());""!=t.fragment_name.trim()&&(ion=-1==t.fragment_name.indexOf("_")?
v[0]:v[0]+"loss",t.matchedpeptide.replace(SpectrumViewer.notUpperCase,"")==q?n.add(ion):c.add(ion))}n=n.values();c=c.values();console.log(n);console.log(c);d=s(n,q);c=s(c,a);n=b-e;r=f(Math.abs(n));this.pep2offset=this.pep1offset=0;0>=n?(q=Array(Math.abs(n)+1).join("#")+q,d=r.concat(d),b=e,this.pep1offset=Math.abs(n)-0):(a=Array(n+1).join("#")+a,c=r.concat(c),this.pep2offset=n-0);console.log("linkpos: "+b);e=q.length-a.length;r=f(Math.abs(e));0>=e?(q+=Array(Math.abs(e)+1).join("#"),d=d.concat(r)):
(a+=Array(e+1).join("#"),c=c.concat(r));console.log(d);console.log(c);k(q,20,SpectrumViewer.p1color);k(a,60,SpectrumViewer.p2color);g.g.append("line").attr("x1",20*(b-1)).attr("y1",22).attr("x2",20*(b-1)).attr("y2",42).attr("stroke","black").attr("stroke-width",1.5);p(d,25,g.spectrumViewer.pep1);p(c,65,g.spectrumViewer.pep2)};
PeptideFragmentationKey.prototype.clear=function(){this.linkPos2=this.pep2offset=this.pepSeq2=this.linkPos1=this.pep1offset=this.pepSeq1=null;this.pep1bFragHighlights=[];this.pep1yFragHighlights=[];this.pep2bFragHighlights=[];this.pep2yFragHighlights=[];this.g.selectAll("*").remove()};
PeptideFragmentationKey.prototype.setHighlights=function(a){this.clearHighlights();for(var b=a.length,c=0;c<b;c++){var e=a[c],d,f,k;this.spectrumViewer.pep1==e.peptide?(d="pep1",f=this.pep1offset,k=this.pepSeq1.length):(d="pep2",f=this.pep2offset,k=this.pepSeq2.length);var p=e.ionType;d+=p+"FragHighlights";"b"==p?this[d][e.ionNumber+f-1].attr("opacity",1):this[d][k-e.ionNumber+f-1].attr("opacity",1)}};
PeptideFragmentationKey.prototype.clearHighlights=function(){function a(a){for(var c=a.length,e=0;e<c;e++)a[e]&&a[e].attr("opacity",0)}a(this.pep1bFragHighlights);a(this.pep1yFragHighlights);a(this.pep2bFragHighlights);a(this.pep2yFragHighlights)};Graph=function(a,b,c){this.x=d3.scale.linear();this.y=d3.scale.linear();this.highlightChanged=new signals.Signal;this.spectrumViewer=b;this.margin={top:c.title?140:120,right:30,bottom:c.xlabel?60:40,left:c.ylabel?120:100};this.g=a.append("g").attr("transform","translate("+this.margin.left+","+this.margin.top+")");this.xaxis=this.g.append("g").attr("class","x axis");this.yaxis=this.g.append("g").attr("class","y axis");this.plot=this.g.append("rect").style("fill","white").attr("pointer-events","all");
this.innerSVG=this.g.append("svg").attr("top",0).attr("left",0).attr("class","line");this.highlights=this.innerSVG.append("g");this.peaks=this.innerSVG.append("g");this.lossiAnnotations=this.innerSVG.append("g");this.annotations=this.innerSVG.append("g");c.title&&(this.title=this.g.append("text").attr("class","axis").text(c.title).attr("dy","-0.8em").style("text-anchor","middle"));c.xlabel&&(this.xlabel=this.g.append("text").attr("class","aWWWAAAAAxis").text(c.xlabel).attr("dy","2.4em").style("text-anchor",
"middle"));c.ylabel&&(this.ylabel=this.g.append("g").append("text").attr("class","axis").text(c.ylabel).style("text-anchor","middle"))};
Graph.prototype.setData=function(a){this.clear();this.xmaxPrimary=d3.max(a,function(a){return 1==a.isprimarymatch?a.expmz-0:0})+50;this.xminPrimary=d3.min(a,function(a){return 1==a.isprimarymatch?a.expmz-0:this.xmaxPrimary})-50;a=d3.nest().key(function(a){return a.expmz+"-"+a.absoluteintensity}).entries(a);this.points=[];for(var b=0;b<a.length;b++)this.points.push(new Peak(a[b].values,this));this.xmax=this.xmaxPrimary;this.xmin=this.xminPrimary;this.ymax=d3.max(this.points,function(a){return a.y});
for(b=this.ymin=0;b<this.points.length;b++)this.points[b].init();this.resize()};
Graph.prototype.resize=function(){var a=this.g.node().parentNode.parentNode.clientWidth,b=this.g.node().parentNode.parentNode.clientHeight;this.g.attr("width",a).attr("height",b);a=a-this.margin.left-this.margin.right;b=b-this.margin.top-this.margin.bottom;this.x.domain([this.xmin,this.xmax]).range([0,a]);this.y.domain([0,this.ymax]).nice().range([b,0]).nice();var c=b/40,e=a/100;this.yaxis.call(d3.svg.axis().scale(this.y).ticks(c).orient("left"));this.xAxis=d3.svg.axis().scale(this.x).ticks(e).orient("bottom");
this.xaxis.attr("transform","translate(0,"+b+")").call(this.xAxis);this.g.selectAll(".axis line, .axis path").style({stroke:"Black",fill:"none","stroke-width":"1.2px"});this.plot.attr("width",a).attr("height",b);this.innerSVG.attr("width",a).attr("height",b).attr("viewBox","0 0 "+a+" "+b);this.zoom=d3.behavior.zoom().x(this.x).on("zoom",this.redraw());this.plot.call(d3.behavior.zoom().x(this.x).on("zoom",this.redraw()));this.innerSVG.call(this.zoom);this.title&&this.title.attr("x",a/2);this.xlabel.attr("x",
a/2).attr("y",b);this.ylabel.attr("transform","translate(-90 "+b/2+") rotate(-90)");this.redraw()()};Graph.prototype.redraw=function(){var a=this;return function(){for(var b=0;b<a.points.length;b++)a.points[b].update();a.xaxis.call(a.xAxis);a.plot.call(d3.behavior.zoom().x(a.x).on("zoom",a.redraw()));a.innerSVG.call(d3.behavior.zoom().x(a.x).on("zoom",a.redraw()))}};
Graph.prototype.clear=function(){this.points=[];this.highlights.selectAll("*").remove();this.peaks.selectAll("*").remove();this.lossiAnnotations.selectAll("*").remove();this.annotations.selectAll("*").remove()};
Graph.prototype.setHighlights=function(a,b){this.clearHighlights();if(a)for(var c=this.points.length,e=0;e<c;e++){for(var d=!1,f=this.points[e],k=f.fragments.length,p=0;p<k;p++){var l=f.fragments[p],s=l.peptide;a==l.peptide&&("y"==l.ionType&&l.ionNumber==s.length-b-1||"b"==l.ionType&&l.ionNumber==b-0+1)&&(d=!0)}!0===d&&this.points[e].highlight(!0)}};Graph.prototype.clearHighlights=function(a,b){for(var c=this.points.length,e=0;e<c;e++)0<this.points[e].fragments.length&&this.points[e].highlight(!1)};function Peak(a,b){this.x=a[0].expmz-0;this.y=a[0].absolute_intensity-0;this.graph=b;this.notLossyFragments=[];this.lossyFragments=[];for(var c=a.length,e=0;e<c;e++)if(""!=a[e].fragment_name.trim()){var d=new Fragment(a[e]);!1===d.lossy?this.notLossyFragments.push(d):this.lossyFragments.push(d)}}
Peak.prototype.init=function(){this.fragments=0==this.graph.spectrumViewer.lossyShown?this.notLossyFragments:this.notLossyFragments.concat(this.lossyFragments);this.line=this.graph.peaks.append("line").attr("stroke-width","1");this.line.append("svg:title").text("m/z: "+this.x+", i: "+this.y);if(0<this.fragments.length){this.fragments[0].peptide===this.graph.spectrumViewer.pep1&&!1===this.fragments[0].lossy?this.line.attr("stroke",SpectrumViewer.p1color):this.fragments[0].peptide===this.graph.spectrumViewer.pep2&&
!1===this.fragments[0].lossy?this.line.attr("stroke",SpectrumViewer.p2color):this.fragments[0].peptide===this.graph.spectrumViewer.pep1&&!0===this.fragments[0].lossy?this.line.attr("stroke",SpectrumViewer.p1color_loss):this.fragments[0].peptide===this.graph.spectrumViewer.pep2&&!0===this.fragments[0].lossy&&this.line.attr("stroke",SpectrumViewer.p2color_loss);this.highlightLine=this.graph.highlights.append("line").attr("stroke",SpectrumViewer.highlightColour).attr("stroke-width",SpectrumViewer.highlightWidth).attr("opacity",
"0");this.highlightLine.append("svg:title").text("m/z: "+this.x+" i: "+this.y);var a=this,b=this.line[0][0];b.onmouseover=function(b){a.highlight(!0);a.graph.highlightChanged.dispatch(a.fragments)};b.onmouseout=function(b){a.highlight(!1);a.graph.highlightChanged.dispatch([])};b.ontouchstart=function(b){a.highlight(!0);a.graph.highlightChanged.dispatch(a.fragments)};b.ontouchend=function(b){a.highlight(!1);a.graph.highlightChanged.dispatch([])};b=this.highlightLine[0][0];b.onmouseover=function(b){a.highlight(!0);
a.graph.highlightChanged.dispatch(a.fragments)};b.onmouseout=function(b){a.highlight(!1);a.graph.highlightChanged.dispatch([])};b.ontouchstart=function(b){a.highlight(!0);a.graph.highlightChanged.dispatch(a.fragments)};b.ontouchend=function(b){a.highlight(!1);a.graph.highlightChanged.dispatch([])};this.labels=[];for(var b=this.fragments.length,c=0;c<b;c++){var e=this.fragments[c],d=this.graph.annotations.append("text").text(e.name).attr("text-anchor","middle").attr("class","peakAnnot"),f="pink",f=
this.graph.spectrumViewer.pep1==e.peptide?"p1":"p2",f=-1==e.name.indexOf("_")?SpectrumViewer[f+"color"]:SpectrumViewer[f+"color_loss"];d.attr("fill",f);d.append("svg:title").text("m/z: "+this.x+", i: "+this.y);this.labels.push(d)}}else this.line.attr("stroke","black")};Peak.prototype.highlight=function(a){1==a?this.highlightLine.attr("opacity","1"):this.highlightLine.attr("opacity","0")};
Peak.prototype.update=function(){this.line.attr("x1",this.graph.x(this.x));this.line.attr("y1",this.graph.y(this.y));this.line.attr("x2",this.graph.x(this.x));this.line.attr("y2",this.graph.y(0));if(0<this.fragments.length){this.highlightLine.attr("x1",this.graph.x(this.x));this.highlightLine.attr("y1",this.graph.y(this.y));this.highlightLine.attr("x2",this.graph.x(this.x));this.highlightLine.attr("y2",this.graph.y(0));for(var a=this.labels.length,b=0;b<a;b++){var c=this.labels[b];c.attr("x",this.graph.x(this.x));
c.attr("y",this.graph.y(this.y)-5-15*b)}}};function Fragment(a){this.name=a.fragment_name.trim();this.peptide=a.matchedpeptide.replace(SpectrumViewer.notUpperCase,"");a=this.name.split("")[0];this.ionType="a"==a||"b"==a||"c"==a?"b":"y";this.ionNumber=/(.(\d*))/g.exec(this.name)[2]-0;this.lossy=!1;-1!=this.name.indexOf("_")&&(this.lossy=!0)};