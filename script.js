   function FNValidaNuevaPalabra(elEvento){
        var evento = elEvento || window.event;
        var caracter = evento.charCode || evento.keyCode;
        if (((caracter >=65) &&
        (caracter <=90)) ||
        (caracter ==209))
        {
            return true; 
        }
        else
        {
            return false;
        }
    }

    function FNCapturaLetra(elemento){
        var letramayuscula = elemento.value.toUpperCase();
        if (FNSoloMayusculas(letramayuscula) ==1)
        {
            var existe = juego.indexOf(letramayuscula);
            if (existe == -1)
            {
                FnEscribeLetra(letramayuscula);   
                if (ganaste==0) 
                {
                    FnGanaste();
                }    
            }
            else
            {
                alert("*LETRA YA INGRESADA*");
                document.getElementById("textoletra").value ="";
            }
            if (juego.length > 7 )
            {
                FnFindelJuego();
            }
        }
        else
        {
            alert("               CARACTER NO VÁLIDO\n SOLO PUEDE INGRESAR LETRAS MAYUSCULAS");
            document.getElementById("textoletra").value ="";
        }
    }

    function FNSoloMayusculas(letraavalidar){
        if (((letraavalidar.charCodeAt(0) >=65) &&
           (letraavalidar.charCodeAt(0) <=90)) ||
           (letraavalidar.charCodeAt(0) ==209))
        {
            return(1);
        }
        else
        {
            return(0);
        }
    }

    function FnFindelJuego(){
        pincel.font="bold 15pt Verdana";
        pincel.fillStyle = "red";
        pincel.fillText("FIN DEL JUEGO",450,150);
        document.getElementById("textoletra").style.display = "none";
        document.getElementById("btnNuevaPalabra").style.display = "block";   
        document.getElementById("btnDesistir").style.display = "none";
    }

    function FnGanaste(){
        pincel.font="bold 15pt Verdana";
        pincel.fillStyle = "green";
        pincel.fillText("GANASTE,",450,150);
        pincel.fillText("FELICIDADES!!",450,180);
        document.getElementById("textoletra").style.display = "none";
        document.getElementById("btnNuevaPalabra").style.display = "block";  
        document.getElementById("btnDesistir").style.display = "none";  
    }

    function FnDesistir(){
        document.getElementById("textoletra").style.display = "none";
        document.getElementById("btnNuevaPalabra").style.display = "block";  
        document.getElementById("btnDesistir").style.display = "none";  
        
        pincel.fillStyle = "black";   //propiedad
        pincel.fillRect(150,100,650,330);     //canvas principal

        pincel.font="bold 15pt Verdana";
        pincel.fillStyle = "green";
        pincel.fillText("TE RENDISTE...",250,250);
        pincel.fillText("INTENTALO DE NUEVO!!",250,300);
    }

    function FnIniciar(origen){

        pincel.fillStyle = "black";   //propiedad
        pincel.fillRect(150,100,650,270);     //canvas principal
    
        pincel.fillStyle = "#25221b";   //propiedad
        pincel.fillRect(150,380,650,270);     //canvas principal
        
        FNPalabraSecreta(origen);

        document.getElementById("textoletra").value ="";
        document.getElementById("textoletra").style.display = "block";
        document.getElementById("btnNuevaPalabra").style.display = "none";
        document.getElementById("btnDesistir").style.display = "block";
        document.getElementById("textoletra").focus();       

        intentos = 0;
        posicionFallo = 235;
        juego =[];
    }


    function FNPalabraSecreta(origen){
        if (origen ==0){
            seleccion = Math.floor(Math.random()*palabras.length); 
        }
        else
        {
            seleccion = origen; 
        }
        letras = Array.from(palabras[seleccion]);
        posicion = new Array(palabras[seleccion]);
        //Dibujar líneas por cantidad de letras
        lineas(palabras[seleccion].length);
        ganaste =palabras[seleccion].length;
    }

    function FnEscribeLetra(letra){

        var idx = letras.indexOf(letra);
        if (idx != -1)
        {
            //LETRA CORRECTA
            pincel.font="28pt Verdana";
            pincel.fillStyle = "blue";
            while (idx != -1) {
                ganaste = ganaste-1;
                pincel.fillText(letra,posicion[idx],340);
                idx = letras.indexOf(letra, idx + 1);
                document.getElementById("textoletra").value ="";
            }
        }
        else
        {
            //LETRA INCORRECTA
            pincel.font="bold 28pt Verdana";
            pincel.fillStyle = "red";
            pincel.fillText(letra,posicionFallo,420);
            document.getElementById("textoletra").value ="";
            posicionFallo = posicionFallo + 45;
            juego.push(letra); 
            FNDibujarFigura(juego.length);
        }          
    }

    function FNDibujarFigura(item){      
        switch(item) {
            case 1:
                pincel.fillStyle = "white";     //color
                pincel.fillRect(280,120,8,180); //barra vertical
                pincel.fillRect(280,120,120,8); //barra horizontal
                pincel.fillRect(400,120,8,30); //barra bajada
                //base triangulo
                pincel.lineWidth = 5;
                // Color de línea
                pincel.strokeStyle = "#212121";
                // Color de relleno
                pincel.fillStyle = "#81C784";
                // Comenzamos la ruta de dibujo, o path
                pincel.beginPath();
                // Mover a la esquina superior izquierda
                pincel.moveTo(270,280);
                // Dibujar la línea hacia la derecha
                pincel.lineTo(300,280);
                // Ahora la que va hacia abajo
                pincel.lineTo(320,300); // A 80 porque esa es la altura
                // La que va hacia la izquierda
                pincel.lineTo(250,300);
                // Y dejamos que la última línea la dibuje JS
                pincel.closePath();
                // Hacemos que se dibuje
                pincel.stroke();
                // Lo rellenamos
                pincel.fill();

              break;
            case 2:
                //cabeza
                pincel.beginPath();
                pincel.fillStyle = "#F5CBA7";
                pincel.arc(405,172,20,0,(Math.PI/180)*360,true);
                pincel.fill(); 
              break;
            case 3:
                //tronco
                pincel.beginPath();
                pincel.lineWidth = 5;
                // Color de línea
                pincel.strokeStyle = "#212121";
                // Color de relleno
                pincel.fillStyle = "#9B59B6";
                // Las variables indican el nombre de cada argumento para
                // la función ellipse
                let x = 406,
                    y = 230,
                    radioX = 25,
                    radioY = 35,
                    // Rotación expresada en radianes,
                    // que puedes obtener dividiendo
                    // Math.PI. Por ejemplo, para una
                    // elipse "horizontal" la rotación
                    // debería estar en Math.PI / 2
                    rotacion = 0,
                    anguloInicio = 0,
                    anguloFin = Math.PI * 2;
                    pincel.ellipse(x, y, radioX, radioY, rotacion, anguloInicio, anguloFin);
                // Hacemos que se dibuje
                pincel.stroke();
                // Lo rellenamos
                pincel.fill();

              break;
            case 4:
                //pierna izq
                FNDibujaExtremidad(390,250,10,40);
                FNDibujaZapato(395,300,7);
              break;
            case 5:
                //pierna der
                FNDibujaExtremidad(410,250,10,40);
                FNDibujaZapato(415,300,7);
              break;
            case 6:
                //brazo izq
                FNDibujaExtremidad(350,210,40,10);
              break;
            case 7:
                //brazo der
                FNDibujaExtremidad(420,210,40,10);
              break;
            default:
              // code block
          }
    }

    function FNDibujaExtremidad(x,y,ancho,largo){
        pincel.fillStyle = "#9B59B6";   //propiedad
        pincel.fillRect(x,y,ancho,largo); //canvas principal
    }

    function FNDibujaZapato(x,y,radio){
        pincel.beginPath();
        pincel.lineWidth = 5;
        // Color de línea
        pincel.strokeStyle = "gray";
        // Color de relleno
        pincel.fillStyle = "black";
        // Las variables indican el nombre de cada argumento para
        // la función arc
        pincel.arc(x, y, radio, Math.PI,  Math.PI * 2);
        // Una línea para la mitad del círculo, opcional
        pincel.moveTo(x - radio - 2, y);
        pincel.lineTo(x + radio + 2, y)
        // Hacemos que se dibuje
        pincel.stroke();
        // Lo rellenamos
        pincel.fill();
    }

    function lineas(cantidad) {

        var inicioy = 50;
        var iniciox = 170 + (8-cantidad)*30;

        for (var i=0;i<cantidad;i++) {
            pincel.fillStyle = "white";
            pincel.beginPath();
            pincel.fillRect(iniciox,350,inicioy,5);
            pincel.fill();     
            posicion[i] = iniciox+13;
            inicioy = inicioy;
            iniciox = iniciox + 57;
     }
    }

    function FnGuardarNuevaPalabra(){
        if (document.getElementById("TextoNuevaPalabra").value != "")
        {   
            palabras.push(document.getElementById("TextoNuevaPalabra").value);
            FnCancelarNuevaPalabra();
            FnIniciar(palabras.length-1);
        }
        else
        {
            alert("Ingrese Palabra Antes de Grabar");
            document.getElementById("TextoNuevaPalabra").focus();
        }
    }


    function FnNuevaPalabra(){
        document.getElementById("btnGuardarPalabra").style.display = "block";
        document.getElementById("btnCancelarPalabra").style.display = "block";
        document.getElementById("TextoNuevaPalabra").style.display = "block";

        document.getElementById("btnDesistir").style.display = "none";
        document.getElementById("btnNuevaPalabra").style.display = "none";
        document.getElementById("btnIniciarJuego").style.display = "none";
        pincel.clearRect(0, 0,pantalla.width, pantalla.height);
        document.getElementById("TextoNuevaPalabra").value ="";
    }

    function FnCancelarNuevaPalabra(){
        document.getElementById("btnGuardarPalabra").style.display = "none";
        document.getElementById("btnCancelarPalabra").style.display = "none";
        document.getElementById("TextoNuevaPalabra").style.display = "none";

        document.getElementById("btnDesistir").style.display = "none";
        document.getElementById("btnNuevaPalabra").style.display = "block";
        document.getElementById("btnIniciarJuego").style.display = "block";
        
        pincel.fillStyle = "black";   //propiedad
        pincel.fillRect(150,100,650,330);     //canvas principal
    }


    function estrella(){
        ctx = pincel;
        ctx.fillStyle ="white";
        ctx.lineWidth = 6;

        var X = Math.floor(Math.random()*600);
        var Y = Math.floor(Math.random()*400);
        var R = 7;
        
        var L = 12;
        var paso = 5;
        
        var estrella= L / paso;
        var rad = (2*Math.PI) / estrella;
                                                
        // traslada el contexto en el centro del canvas  
        ctx.translate(pantalla.width / 2, pantalla.height / 2);
        //gira el contexto unos 270º
        ctx.rotate(3*Math.PI/2);
        // dibuja el trazado 
        ctx.beginPath();
                for( var i = 0; i < L; i++ ){
                x = X + R * Math.cos( rad*i );
                y = Y + R * Math.sin( rad*i );
                ctx.lineTo(x, y);
                }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    //INICIO PROGRAMA
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    var palabras = ["AGUA","RIO","HTML","ALURA"];
    var seleccion = Math.floor(Math.random()*palabras.length); 
    var letras = Array.from(palabras[seleccion]);
    var posicion = new Array(palabras[seleccion]);
    var intentos = 0;
    var posicionFallo = 235;
    var juego = new Array();
    var ganaste = 0;

    //console.log(letras);
    //console.log(palabras[seleccion].length);
    //console.log(palabras[seleccion]);

    pincel.fillStyle = "black";   //propiedad
    pincel.fillRect(150,100,650,330);     //canvas principal

    //estrella();


