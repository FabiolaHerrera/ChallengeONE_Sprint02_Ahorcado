    function FnCopiar(){
        resultado.select()
        navigator.clipboard.writeText(resultado.value)
        resultado.value = ""
        alert("Texto Copiado");
    }
    

    function FnEncriptar(){
        var texto_encriptar    = document.getElementById("textoEncriptar").value;    
        //Quito espacios en blanco
        texto_encriptar = texto_encriptar.trim();
        //valido texto no vacío
        if (texto_encriptar != ""){
            document.getElementById("sinmensaje").style.display = "none";
            document.getElementById("resultado").style.display = "block";
            document.getElementById("mensajerectangulo").style.display = "none";
            document.getElementById("muneco-position").style.display = "none";
            document.getElementById("btnCopiar").style.display = "flex";
            
            document.getElementById("resultado").value =TextoEncriptar(texto_encriptar);
            document.getElementById("textoEncriptar").value ="";    
        }
        else
        {
            alert("Ingrese un Texto Para Encriptar");
            document.getElementById("textoEncriptar").focus();
        }
    }

    function TextoEncriptar(texto){
        //con expresiones regulares
        var texto_encriptar    = texto;    

        texto_encriptar = quitarAcentos(texto_encriptar);
            
        texto_encriptar = texto_encriptar.replace(/e/g,'enter');
        texto_encriptar = texto_encriptar.replace(/i/g,'imes');
        texto_encriptar = texto_encriptar.replace(/a/g,'ai');
        texto_encriptar = texto_encriptar.replace(/o/g,'ober');
        texto_encriptar = texto_encriptar.replace(/u/g,'ufat');
            
        return (texto_encriptar);
    }

    function TextoDesEncriptar(texto){
        //con arreglos
        var texto_desencriptar    = quitarAcentos(texto); 
        
        // La letra "e" es convertida para "enter"
        // La letra "i" es convertida para "imes"
        // La letra "a" es convertida para "ai"
        // La letra "o" es convertida para "ober"
        // La letra "u" es convertida para "ufat"

        let matrizCodigo= [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];

        for (let i=0;i<matrizCodigo.length;i++)
        {
            if (texto_desencriptar.includes(matrizCodigo[i][1])) {
                texto_desencriptar = texto_desencriptar.replaceAll(matrizCodigo[i][1],matrizCodigo[i][0])                   
            }
        }            
        return (texto_desencriptar);
    }

    function FnDesencriptar(){
        var texto_desencriptar    = document.getElementById("textoEncriptar").value;    
        //Quito espacios en blanco
        texto_desencriptar = texto_desencriptar.trim();
        //valido texto no vacío
        if (texto_desencriptar != ""){
            document.getElementById("sinmensaje").style.display = "none";
            document.getElementById("resultado").style.display = "block";
            document.getElementById("mensajerectangulo").style.display = "none";
            document.getElementById("muneco-position").style.display = "none";
            document.getElementById("btnCopiar").style.display = "flex";
            
            document.getElementById("resultado").value =TextoDesEncriptar(texto_desencriptar);
            document.getElementById("textoEncriptar").value ="";    
        }
        else
        {
            alert("Ingrese un Texto Para DesEncriptar");
            document.getElementById("textoEncriptar").focus();
        }
    }   
    
    function quitarAcentos(texto) {
    return texto
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
    }