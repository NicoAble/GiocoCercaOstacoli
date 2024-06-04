//variabili globali
let player, img, img2;
let delayMovement=400; //delay tra cambio immagini nel movimento
let w=725, h=350;
let destra=true; //movimento a destra nella fase di salto
//buleanee per il controllo d'uso della funzione slittamento tramite barra spaziatrice
let slittamentoDestra=false;
let slittamentoSinistra=false;
//controlla se il salto è attivo o meno
let jump=false;

//lista di enemies
let rockets=[];

//variabile per le vite
let vite=6;

//booleana per la fine del gioco
let stopLoop=false;

//lista di monete 
let monete=[]

//punteggio giocatore
let score=0;

//tasto pausa
let xPause=320;
let yPause=0;
let rPause=50;
let pausePossible=true;
//per cambio immagine
let imgPause;

//tasto return
let xRet=370;
let yRet=5;
let rRet=40;

//cambio schermata nel momento della morte
deathTrue=false;




function preload(){
    //caricamento dello sfondo
    bg = loadImage('image/sfondo.jpg');
    //caricamento dei movimenti del personaggio
    //posizione ferma in entrambe le direzioni
    s1 = loadImage('image/s1.png'); 
    s1Inv = loadImage('image/s1.2.png');
    //posizione movimento orizzontale in entrambe le direzioni
    s2 = loadImage('image/s2.png');
    s2Inv = loadImage('image/s2.2.png');
    //posizione movimento verticale in entrambe le direzioni
    s3 = loadImage('image/s3.png');
    s3Inv = loadImage('image/s3.2.png');
    //posizione movimento di slittamento/calcio in aria in entrambe le direzioni
    s4 = loadImage('image/s4.png');
    s4Inv = loadImage('image/s4.2.png');
    //posizione movimento di slittamento/calcio in aria in entrambe le direzioni
    se1 = loadImage('image/se1.png');
    se1Inv = loadImage('image/se1.2.png');
    //cuoricino vuoto e pieno per rappresentare le vite
    vita_a_1= loadImage('image/vita1.png');
    vita_a_1_2= loadImage('image/vita1_2.png');
    vita_a_0= loadImage('image/vita0.png');
    //quando viene colpito
    hit1=loadImage('image/hit.png');
    hit1Inv=loadImage('image/hitInv.png');
    //quando muore
    death=loadImage('image/death.png');
    deathInv=loadImage('image/deathInv.png');
    //monete
    money=loadImage('image/money.png');
    money2=loadImage('image/money2.png');
    //tasto pausa
    pause=loadImage('image/Pause.png');
    //tasto ricomincia
    resume=loadImage('image/resume.png');
    //tasto riprova
    ret=loadImage('image/return.png');
    //schermata game over
    gameOver=loadImage('image/game_over.png');
}

//funzione setup che inizializza il player, la tela e l'azione del player
function setup() {
    createCanvas(w, h);
    player = new Player();
    img=s1;
    img2=se1Inv;
    //creo un'istanza per visualizzare le vite
    vita=new Vite();
    imgPause=pause;
}

function keyPressed(event){
    //console.log(event);
    //spostamento a destra tramite freccia destra
    if((event.key=='ArrowRight'||event.key=='d') && player.x<650){
        //console.log("eccomi");
        destra=true;//controlla la direzione del player
        player.moveRight();  
        
    //movimento a sinistra tramite freccia a sinistra
    }else if((event.key=='ArrowLeft'||event.key=='a') && player.x>10){
        //console.log("eccomi");
        destra=false;//controlla la direzione del player
        player.moveLeft();   
    }else if(event.key=='ArrowUp' || event.key=='w'){
        player.jumpPlayer();
    }else if(event.key==' '){
        if(jump==true){
            player.longJump();
        }else player.slide();
    }
}
//game over
function direct(){
    window.location.href = "gameOver.html";
}

//ritorno alla prima pagina 
function redirect(){
    window.location.href = "index.html";
}

//funzione per quando si schiaccia il mouse
function mouseClicked(){
    //se si schiaccia il tasto pausa ed è possibile (pausePossible), viene fatta il cambio di immagine e leggermente spostato per reinderizzare la grandezza
    //si ferma il loop che ripartirà solo al prossimo click
    if (mouseX >= xPause && mouseX <= (xPause+rPause) && mouseY >= yPause && mouseY <= (yPause+rPause) && pausePossible){
        imgPause=resume;
        rPause=40;
        yPause+=5;
        noLoop();
        pausePossible=false;
    }else if(mouseX >= xPause && mouseX <= (xPause+rPause) && mouseY >= yPause && mouseY <= (yPause+rPause) && pausePossible==false){
        imgPause=pause;
        rPause=50;
        yPause-=5;
        loop();
        pausePossible=true;
    //se il tasto return (alla home page) viene schiacciato si ritorna alla prima pagina
    }else if(mouseX >= xRet && mouseX <= (xRet+rRet) && mouseY >= yRet && mouseY <= (yRet+rRet)){
        redirect();
    }
}

//tutto il gioco è qua dentro
function game(){
    background(bg);
    //visualizzo a schermo il tasto pause
    image(imgPause, xPause, yPause, rPause, rPause);
    //visualizzo a schermo il tasto return
    image(ret, xRet, yRet, rRet, rRet);
    //30 percento di uscita
    if (random(10) < 0.05) {
        //inserimento nuovo nemico
        //console.log(rockets);
        rockets.push(new Rocket());
    }

    if (random(10) < 0.035) {
        //inserimento nuova moneta
        monete.push(new Moneta());
        //console.log(monete);
    }

    for(let k=0; k<monete.length; k++){
        if(monete[k]!=null){
            //console.log(m);
            monete[k].show();

            //se il personaggio prende una moneta lo score aumenta
            if (player.take1(monete[k])) {
                if(monete[k].goldMoney)
                    score+=150;
                else score+=50;
                if(k==(monete.length-1))
                    monete.pop();
                else{
                    monete[k]=null;
                }
            }
        }
    }
    
    for (let r of rockets) {
        //console.log("eccomi");
        r.move();
        r.show();

        //se il player colpisce l'ostacolo perdi vite
        
        if (player.hits(r)) {
            vite-=1;
            if(destra){
                img=hit1;
                setTimeout(() => {
                    img=s1; //cambio di immagine per effetto di movimento
                }, delayMovement+50); 
            }else{
                img=hit1Inv;
                setTimeout(() => {
                    img=s1Inv; //cambio di immagine per effetto di movimento
                }, delayMovement+50);
            }
        }
        
        if(vite==0){
            //funzione che stampa un messaggio sulla console web del propio browser
            player.y=height-player.r-player.distance;
            //immagine personaggio morto, a seconda della direzione
            if(destra) img=death;
            else img=deathInv;
            console.log("game over");
            //visualizza a schermo il player
            player.show();
            //dopo il loop() cambio schermata
            deathTrue=true;  
        }   
    }

    //visualizza a schermo le vite
    vita.show();
    //visualizza a schermo il player
    player.show();
    //imposta gravità del personaggio
    player.move();
    //console.log(player.y);
    stampaPunteggio(true)
}

function stampaPunteggio(game){
    if(game){
        //stampaggio a schermo del punteggio
        textSize(25);
        textAlign(RIGHT)
        fill(255,255,255)
        text('score: '+score, 720, 20);
    }else{
        //stampaggio a schermo del punteggio
        textSize(10);
        textAlign(RIGHT)
        fill(255,255,255)
        text('complimenti, il tuo punteggio è: '+score, 434, 250);
        text('torna a giocare premendo RESET', 429, 300);
    }
    
}

function draw(){
    //subito vengono date le istruzioni, se no va game tranne quando si muore che parte la schermata di game over
    
    if(deathTrue){
        background(gameOver);
        stampaPunteggio(false);
        setTimeout(() => {
            //dopo 10 secondi manda nella sezione in cui puoi schiacciare reset
            direct();
        },10000); //dieci secondi  
    }else game()
}
    
