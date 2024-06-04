class Moneta{
    constructor() {
        //x, y e grandezza del moneta
        //primo layer
        this.distance=47;
        this.x=random(10, 700);
        //dimensioni moneta
        this.y=random(100, 325-this.distance);
        this.r=20;
        //booleana per vedere se la moneta è d'oro oppure no
        if(random(10)>1){
            this.goldMoney=false;
        }else this.goldMoney=true;
    }

    //a ogni ciclo viene incollata l'immagine 
    show(){
        if(this.goldMoney){
            image(money2, this.x, this.y, this.r, this.r);
        }else{
            image(money, this.x, this.y, this.r, this.r);
        } 
        
    }
}