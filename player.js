class Player{
    constructor() {
        //x, y e grandezza del player
        this.x = 100;
        this.r = 50;
        this.distance=47; //distanza dal bordo inferiore per far si che il player inizi subito dal layer presente nello sfondo
        this.y = (height - this.r-this.distance); //y iniziale del player

        //la variabile vy rappresenta la velocità, il movimento del mio player

        this.vy = 0;

        //creo la gravità, in quanto dopo il salto il palyer deve tornare a terra 

        this.gravity = 1;
        
        this.numColpo=0;
        this.prec=new Rocket();
        //variabile che controlla che il razzo non faccia più di un danno
        this.open=true;
    }

    //aggiorna a ogni draw() la gravità
    move() {
        //ogni volta che il mio playersalta y cambia posizione in base al salto
        this.y += this.vy;
        

        //la velocità aumenta dopo ogni slato in questo modo il player torna a terra
        if(this.y<300) this.vy += this.gravity;

        //La funzione constrain() vincola un valore compreso tra un valore minimo e massimo

        this.y = constrain(this.y, 0, (height - this.r-this.distance));
    }

    //setta velocità di discesa e, se possibile effettua il secondo salto
    jump(){
        if (this.y == (height-this.r-this.distance)) { //primo salto
            this.vy = -15;
            this.possible=true;  
        }else if(this.y <= ((height*2) - this.r-this.distance) && this.possible==true){ //secondo salto
            this.vy = -12;
            this.possible=false;
        }
    }

    //richiamando la funzione jump, avviene il cambio direzionale di immagine nella fase di salto
    jumpPlayer(){
        jump=true;
        slittamentoDestra=false;
        slittamentoSinistra=false;
        if(destra==true){
            img=s3;
            this.jump();
            setTimeout(() => {
                img=s1; //cambio di immagine per effetto di movimento
            }, delayMovement);
        }else{
            img=s3Inv;
            this.jump();
            setTimeout(() => {
                img=s1Inv; //cambio di immagine per effetto di movimento
            }, delayMovement);
        }
    }

    //salto lungo, disponibile solo dopo il primo salto
    longJump(){
        if(jump==true && (this.y<(height-this.r-this.distance) && this.y>=120)){  //120 è la y massima raggiunta dal primo salto
            this.possible=false;
            //console.log("eccomi");
            if(destra==true){
                this.x+=50;
                this.y-=20;
            }else{
                this.x-=50;
                this.y-=20;
            }

        }
    }

    //movimento a destra
    moveRight(){
        img=s2;
        this.x+=20;
        setTimeout(() => {
            img=s1; //cambio di immagine per effetto di movimento
        }, delayMovement); 
        slittamentoDestra=true;
        slittamentoSinistra=false;
        jump=false;
    }

    //movimento a sinistra
    moveLeft(){
        img=s2Inv;
        this.x-=20;
        setTimeout(() => {
            img=s1Inv; //cambio di immagine per effetto di movimento
        }, delayMovement); 
        slittamentoDestra=false;
        slittamentoSinistra=true;
        jump=false; 
    }

    //slittamento
    slide(){
        if(destra==true && slittamentoDestra==true){
            img=s4;
            this.x+=50;
            setTimeout(() => {
                img=s1; //cambio di immagine per effetto di movimento
            }, delayMovement); 
            slittamentoDestra=false;
        }else if(destra==false && slittamentoSinistra==true){
            img=s4Inv;
            this.x-=50;
            setTimeout(() => {
                img=s1Inv; //cambio di immagine per effetto di movimento
            }, delayMovement); 
            slittamentoSinistra=false;
        }
    }
    
    //funzione che controlla se il personaggio tocca uno degli avversari
    hits(rocket) {  
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = rocket.x + rocket.r * 0.5;
        let y2 = rocket.y + rocket.r * 0.5; 
        //controlla che il nuovo rocket non sia nel range del rocket colpito per ultimo (prec) inoltre controlla che non sia sullo stesso asse
        if(((rocket.x<(this.prec.x-this.prec.r) || rocket.x>(this.prec.x+this.prec.r+100)) && this.prec.y==rocket.y) || this.prec.y!=rocket.y){
            //console.log("eccomi");
            //se la condizione è soddisfatta da la possibilità di essere colpiti di nuovo
            this.open=true;
            //se no no
        }else this.open=false;
        //ritorno la funzione collideCircleCircle che crea un cherchio, che il player può toccare/colpire
        if(this.open){
            if(collideCircleCircle(x1, y1, (this.r-5), x2, y2, (rocket.r-5))){
                //console.log("eccomi");
                //se viene colpito la possibilità di essere colpiti nuovamente viene bloccata momentaneamente 
                this.open=false;
                //viene salvata l'istanza del rocket che ha colpito il player
                this.prec=rocket;
                return collideCircleCircle(x1, y1, (this.r-5), x2, y2, (rocket.r-5));
            }
            //-5 così da poter ottenere quasi la sagoma perfetta delle due entità
        }else{
            //console.log("eccomi");
            return false;
        }        
    }

    //quando il personaggio prende una moneta
    take1(moneta){
        //x e y necessarie all'utilizzo della funzione per vedere se il personaggio ottiene la moneta
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = moneta.x + moneta.r * 0.5;
        let y2 = moneta.y + moneta.r * 0.5; 
        //ritorno la funzione collideCircleCircle che crea un cerchio, che il player può toccare
        return collideCircleCircle(x1, y1, this.r, x2, y2, moneta.r-5);
    }

    //a ogni ciclo viene incollata l'immagine 
    show() {
        image(img, this.x, this.y, this.r, this.r);
    }
}