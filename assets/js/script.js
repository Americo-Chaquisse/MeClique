/**
 * Created by Américo Chaquisse on 1/17/2016.
 */
var clsTemporizador = function(){

    var horaDeFim = 0;

    this.emExecucao = false;

    this.iniciar = function(totSegundos){

        this.emExecucao = true;

        horaDeFim = new Date();

        horaDeFim.setSeconds(new Date().getSeconds()+totSegundos);

    };

    this.agora = function(){


        var dataDif =  horaDeFim - new Date();

        var microSec = new Date(dataDif).getMilliseconds();
        var segundos = Math.floor((dataDif/1000)%60);
        var minutos = Math.floor((dataDif/1000/60) % 60);

        if(minutos.toString().length<2){
            minutos = "0"+minutos;
        }

        if(segundos.toString().length<2){
            segundos = "0"+segundos;
        }

        if(microSec.toString().length==2){
            microSec = "0"+microSec;
        }

        if(microSec<5){
            microSec = 0;
        }

        if(microSec.toString().length==1){
            microSec = "00"+microSec;
        }

        if(dataDif<0){

            this.emExecucao = false;

            return null;

        } else {

            return {
                'microsec':microSec,
                'segundos':segundos,
                'minutos':minutos
            }

        }

    };

};

var x = new clsTemporizador();
var tempoIntervalo;

function actualizarHTML(){

    var agora = x.agora();

    if(agora){

        document.getElementById('min').innerHTML = String(agora.minutos);
        document.getElementById('sec').innerHTML = String(agora.segundos);
        document.getElementById('microsec').innerHTML = String(agora.microsec);


        if(agora.segundos<10){
            document.getElementsByClassName('timer')[0].style.color = "#FF6F31";
        }

        if(agora.segundos<5){
            document.getElementsByClassName('timer')[0].style.color = "#FF1A28";
        }

    } else{
        clearInterval(tempoIntervalo);
        fimDoJogo();
    }

}

var totalCliques;

function iniciarJogo(){

    if(!x.emExecucao){
        totalCliques = 0;
        tempoIntervalo = setInterval("actualizarHTML()",1);

        document.getElementById('clickStart').style.display = 'none';
        document.getElementById('clickTotal').style.display = 'block';
        document.getElementsByClassName('outer')[0].style.background = '#FF3F76';
        document.getElementById('clickTotal').innerHTML = '0 CLIQUES';

        x.iniciar(15);
    } else {

        totalCliques++;

        if(totalCliques != 1){
            document.getElementById('clickTotal').innerHTML = totalCliques+' CLIQUES';
        } else {
            document.getElementById('clickTotal').innerHTML = totalCliques+' CLIQUE';
        }


    }

}

function fimDoJogo(){

    document.getElementsByClassName('button')[0].style.display ='none';

    if(totalCliques != 1){
        document.getElementById('clickTotalReport').innerHTML = totalCliques+' cliques';
    } else {
        document.getElementById('clickTotalReport').innerHTML = totalCliques+' clique';
    }

    document.getElementsByClassName('fim')[0].style.display ='block';


    document.getElementById('clickStart').style.display = 'block';
    document.getElementById('clickTotal').style.display = 'none';
    document.getElementsByClassName('outer')[0].style.background = 'rgba(0,0,0,0.65)';
}

function restart(){
    document.getElementsByClassName('timer')[0].style.color = "#2cb900";
    document.getElementsByClassName('fim')[0].style.display ='none';
    document.getElementsByClassName('button')[0].style.display ='block';
    document.getElementById('sec').innerHTML = '15';
}



//Facebook
window.fbAsyncInit = function() {
    FB.init({
        appId      : '1064852843566140',
        xfbml      : true,
        version    : 'v2.5'
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));