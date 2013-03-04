window.onload = function(){multipleChart.init()};
//
var multipleChart = function(id){
	return multipleChart.f.identify(id)
};
var $mc;
(function(multipleChart){
	"use strict";
	var $mc;	
	multipleChart.f = {
		//	CONFIGS
		settedY: 		false,
		tables: 		[],
		chart: "",
		chartWidth: 	910,
		chartHeight: 	250,
		chartSubtitle: [],
		container: "data-chart",
		 
		init: function(){
			var tb = multipleChart.findTableCharts();
			this.findMaxNumber(tb);
			this.print();
		},
		//
		identify: function(ident, context){
			var type = ident[0],
				name = ident.replace(type, ""),
				context = context || document;				
			switch(type)
			{
			case "#":
			  return context.getElementById(name);
			  break;
			case ".":
				var elem = context.getElementsByTagName("*"),
					count = elem.length,
					identClass=[];
				for(var x=0;x<count;x++) if(elem[x].className == name) identClass.push(elem[x]);
			  	return identClass;
			  	break;
			default:
			  return context.getElementsByTagName(ident)
			};
		},
		//
		findTableCharts: function(){
			var tables = multipleChart("table"),
				arr = [],
				count = tables.length;
			for (var x=0; x < count; x++) if (tables[x].attributes["data-chart"]) arr.push(tables[x]);
			return arr
		},
		
		// encontra o maior número entre todas as tabelas
		compareTables: function(context){
			var tables = context,
				count =	 tables.length,
				arr = [];
				for (var x=0;x<count;x++){
					var line 	= this.identify(".data", tables[x]),
						tds 	= this.identify("td", line[0]),
						arrLine = tables[x].id,
						countTd = tds.length;
					for (var y=0; y<countTd; y++){
						var temp = temp || [];
						temp.push(parseInt(tds[y].innerHTML))
					};
					temp.sort(function(a,b){return b - a});
					arr.push([arrLine,temp[0]]);
				};
			// retorna ordenado maior para menor as tabelas consultadas
			return (arr.sort(function(a,b){return b[1] - a[1]}))			
		},
		//
		findMaxNumber: function(tb){
			var biggerToSmaller = this.compareTables(tb),
				arr =[],
				count = biggerToSmaller.length;
				for(var x=0;x<count;x++) arr.push(biggerToSmaller[x][0]);
			this.tables = arr;
		},
		// calcula a cor que cada linha deve ter.
		currentColor: 0,
		colorInterval:40,
		currentShade: 50,
		opacity: 0.8,
		saturation: 100,
		saturationInterval: 20,
		setColorHLSA: function(){
			var current 			= this.currentColor,
				saturation 			= this.saturation,
		 		color 				= "hsla("+current+"," + saturation + "%, 40%, "+this.opacity+")";
				current 			+= this.colorInterval;
				this.currentColor 	= (current >= 360)? this.colorInterval :current;
				if(current >= 360){
					saturation = saturation-this.saturationInterval;
					this.saturation = (saturation >= 0)? saturation: 100; ;
				}
			return color;
		},	
		setColor: function(){
			return this.setColorHLSA()
		},
		// monta os gráficos
		createChart: function(ident, color){
			// este teste verifica se já existe o SVG onde aparecerão os dados
			var first =  this.identify("#" + this.container).innerHTML,
			reg = new RegExp("[a-zA-Z]");
			
			// se não existe, crie
			if(first.match(reg) == null){
				var chart = document.getElementById("data-chart");
				chart.style.overflow = "hidden";
				chart.style.width = this.chartWidth + "px";				
				this.chart = Raphael('data-chart', this.chartWidth, this.chartHeight);
				this.chart.lineChart({
					data_holder: ident,
					width: this.chartWidth,
					typeData: "Cadastros",
				//	no_grid: true,  
				//	show_area: true,
					x_labels_step: 1,
					y_labels_count: 10,
					colors: {
						master: color
					}
				});
			}else{
				// caso exista, reescreve a função inteira para apenas adicionar mais dados
				this.createChart = function(ident, color){
					this.chart.lineChart({
						data_holder: ident,
						width: this.chartWidth,
						typeData: "Cadastros",			
						no_grid: true,      // whether to display background grid
				//		show_area: true,
						colors: {
							master: color
						}
					});						
				};
				this.createChart(ident, color)
			};
		},
		createSubTitles: function(ident, color){
			var tab = this.identify("#"+ident);
			this.chartSubtitle.push([tab.getAttribute("data-chart"), color]);
		},
		printSubtitles: function(){
			
			var div 		= document.createElement("div"),
				li 			= "<li style=\"margin: 0 0 0 10px; line-height:20px;list-style-type:none; color:[color]; float:left\" tilte=\"brand\">"+
							  	"<span style=\"background-color:[color]; width: 8px; height:8px; display:block; float:left;margin:5px 5px 0 0px\"></span>"+
								"[brand]"+
							  "</li>",
				data 		= this.chartSubtitle,
				count	 	= data.length,
				parent 		= this.identify("#"+this.container),
				content 	= "";
			
			for(var x=0; x<count; x++){
				content += li	.replace(/\[brand\]/g, data[x][0])
								.replace(/\[color\]/g, data[x][1])
			};
			content = "<ul>" + content + "</ul>";
			div.innerHTML = content;
			parent.insertBefore(div,parent.childNodes[0]);
			//this.container
		},
		print: function(){
			var tables = this.tables,
				count = tables.length;
			for(var x=0; x<count;x++) {
				var color = this.setColor();	
				this.createSubTitles(tables[x], color);
				// replace: fix some weird thing on lib's colors
				this.createChart(tables[x], color.replace(/\%/g, ""));

			};
			this.printSubtitles();
		}
	};
	for(var x in multipleChart.f) multipleChart[x] = multipleChart.f[x];
	window["multipleChart"] = multipleChart;
	window["$mc"] = multipleChart;
})(multipleChart);