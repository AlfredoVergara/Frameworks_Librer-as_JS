
var busqhorizontal=0;
var busqvertical=0;
var bNuevosDulces=0;
var lencolumna=["","","","","","",""];
var lenresto=["","","","","","",""];
var maximo=0;
var matriz=0;
var intervalo=0;
var eliminimoar=0;
var nuevosDulces=0;
var tiempo=0;
var i=0;
var totalcontador=0;
var espera=0;
var score=0;
var movimiento=0;
var minimo=2;
var segundo=0;

// Inicia Efecto titulo estilos

$(document).ready(function() {
     setInterval(function(){
      $(".main-titulo").switchClass("main-titulo","main-titulo-efecto", 800),
      $(".main-titulo").switchClass("main-titulo-efecto","main-titulo", 800)
    }, 1000);
});

// Iniciar el juego al hacer click en el boton.

$(".btn-reinicio").click(function(){
	i=0;
	score=0;
	movimiento=0;
	$(".panel-score").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();
	$("#score-text").html("0");
	$("#movimientoimientos-text").html("0");
	$(this).html("Reiniciar")
	clearInterval(intervalo);
	clearInterval(eliminimoar);
	clearInterval(nuevosDulces);
	clearInterval(tiempo);
	minimo=2;
	segundo=0;
	borrartotal();
	intervalo=setInterval(function(){
		desplazamiento()
	},500);
	tiempo=setInterval(function(){
		timer()
	},1000);
});

//  Comenzar el Juego con dulces

function desplazamiento(){
	i=i+1
	var numero=0;
	var imagen=0;
	$(".elemento").draggable({disabled:true});
	if(i<8){
		for(var j=1;j<8;j++){
			if($(".col-"+j).children("img:nth-child("+i+")").html()==null){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
			}}}
	if(i==8){
	clearInterval(intervalo);
	eliminimoar=setInterval(function(){
		eliminimoarhorver()
	},150);}
};

// Temporizador

function timer(){
	if(segundo!=0){
		segundo=segundo-1;}
	if(segundo==0){
		if(minimo==0){
			clearInterval(eliminimoar);
			clearInterval(nuevosDulces);
			clearInterval(intervalo);
			clearInterval(tiempo);
			$(".panel-tablero").hide("drop","slow",funcioncita);
			$(".time").hide();}
		segundo=59;
		minimo=minimo-1;}
	$("#timer").html("0"+minimo+":"+segundo);
};

// Función para poner el los movimientoimientos y puntos de toda la pantalla

function funcioncita(){
	$( ".panel-score" ).animate({width:'100%'},3000);
};

// Función para borrar todo

function borrartotal(){
	for(var j=1;j<8;j++){
		$(".col-"+j).children("img").detach();}
};

// Función para eliminimoar los Dulces

function eliminimoarhorver(){
	matriz=0;
	busqhorizontal=horizontal();
	busqvertical=vertical();
	for(var j=1;j<8;j++){
		matriz=matriz+$(".col-"+j).children().length;}

	//Condicional si no encuentra 3 dulces o más, llamamos a la función para volver a completar el juego

	if(busqhorizontal==0 && busqvertical==0 && matriz!=49){
		clearInterval(eliminimoar);
		bNuevosDulces=0;
		nuevosDulces=setInterval(function(){
			nuevosdulces()
		},600);}

	if(busqhorizontal==1||busqvertical==1){
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$(".activo").hide("pulsate",1000,function(){
			var scoretmp=$(".activo").length;
			$(".activo").removimientoe("img");
			score=score+scoretmp*10;
			$("#score-text").html(score);//Cambiamos la puntuación
		});
	}
	if(busqhorizontal==0 && busqvertical==0 && matriz==49){
		$(".elemento").draggable({
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				movimiento=movimiento+1;
				$("#movimientoimientos-text").html(movimiento);}
		});
	}
	$(".elemento").droppable({
		drop:function (event,ui){
			var dropped=ui.draggable;
			var droppedOn=this;
			espera=0;
			do{
				espera=dropped.swap($(droppedOn));}
			while(espera==0);
			busqhorizontal=horizontal();
			busqvertical=vertical();
			if(busqhorizontal==0 && busqvertical==0){
				dropped.swap($(droppedOn));}
			if(busqhorizontal==1 || busqvertical==1){
				clearInterval(nuevosDulces);
				clearInterval(eliminimoar);
				eliminimoar=setInterval(function(){
					eliminimoarhorver()
				},150);}},
	});
};

// Función para intercambiar dulces

jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removimientoeChild(t);
	return this;
};

// Función para crear nuevos dulces

function nuevosdulces(){
	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
	for(var j=1;j<8;j++){
		lencolumna[j-1]=$(".col-"+j).children().length;}
	if(bNuevosDulces==0){
		for(var j=0;j<7;j++){
			lenresto[j]=(7-lencolumna[j]);}
		maximo=Math.max.apply(null,lenresto);
		totalcontador=maximo;}
	if(maximo!=0){
		if(bNuevosDulces==1){
			for(var j=1;j<8;j++){
				if(totalcontador>(maximo-lenresto[j-1])){
					$(".col-"+j).children("img:nth-child("+(lenresto[j-1])+")").removimientoe("img");}}
		}
		if(bNuevosDulces==0){
			bNuevosDulces=1;
			for(var k=1;k<8;k++){
				for(var j=0;j<(lenresto[k-1]-1);j++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
		}
		for(var j=1;j<8;j++){
			if(totalcontador>(maximo-lenresto[j-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");}
		}
	}
	if(totalcontador==1){
		clearInterval(nuevosDulces);
		eliminimoar=setInterval(function(){
			eliminimoarhorver()
		},150);
	}
	totalcontador=totalcontador-1;
};

// Función para la busqueda horizontal de dulces

function horizontal(){
	var busHori=0;
	for(var j=1;j<8;j++){
		for(var k=1;k<6;k++){
			var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
			var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
			var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				busHori=1;
			}
		}
	}
	return busHori;
};

// Función para la busqueda vertical de dulces

function vertical(){
	var busVerti=0;
	for(var l=1;l<6;l++){
		for(var k=1;k<8;k++){
			var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
			var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
			var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
				busVerti=1;
			}
		}
	}
	return busVerti;
};
