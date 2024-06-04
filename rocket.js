class Rocket{
    constructor() {
        //x, y e grandezza del razzo
        this.temp=random(2)
        //primo layer
        this.distance=47;
        //dimensioni razzo
        this.r=75;
        if(this.temp<1)
            this.x = 700;
        else this.x =5;
        //50% di possibilità che il razzo finisca in linea d'aria con la y di partenza del player
        if(random(2)<1){
            //console.log("2");
            this.y = height-this.r-this.distance;
        //50% di possibilità che il razzo finisca in linea d'aria con il primo salto disponibile dal player
        }else{
            //console.log("eccomi");
            this.y = height-this.r-this.distance-75;
        } 
    }

    //aggiorna a ogni draw() la gravità
    move() {
        if(this.temp<1){
            img2=se1Inv;
            this.x-=5;
        }else{
            img2=se1;
            this.x+=5;
        }
    }

    //a ogni ciclo viene incollata l'immagine 
    show() {
        image(img2, this.x, this.y, this.r, this.r);
    }
}