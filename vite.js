class Vite{
    constructor() {
        //x, y e grandezza delle vite
        this.x1=0;
        this.x2=30;
        this.x3=60;
        this.y1=0;
        this.r=20;
    }

    //a ogni ciclo viene incollata l'immagine 
    show() {
        //switch case che, a seconda delle vite, visualizza a schermo le vite piene, mezze vuote o vuote
        switch(vite) {
            case 0:
                image(vita_a_0, this.x1, this.y1, this.r, this.r);
                image(vita_a_0, this.x2, this.y1, this.r, this.r);
                image(vita_a_0, this.x3, this.y1, this.r, this.r);
                break;
            case 1:  
                image(vita_a_1_2, this.x1, this.y1, this.r, this.r);
                image(vita_a_0, this.x2, this.y1, this.r, this.r);
                image(vita_a_0, this.x3, this.y1, this.r, this.r);
                break;
            case 2:
                image(vita_a_1, this.x1, this.y1, this.r, this.r);
                image(vita_a_0, this.x2, this.y1, this.r, this.r);
                image(vita_a_0, this.x3, this.y1, this.r, this.r);
                break;
            case 3:
                image(vita_a_1, this.x1, this.y1, this.r, this.r);
                image(vita_a_1_2, this.x2, this.y1, this.r, this.r);
                image(vita_a_0, this.x3, this.y1, this.r, this.r);
                break;
            case 4:
                image(vita_a_1, this.x1, this.y1, this.r, this.r);
                image(vita_a_1, this.x2, this.y1, this.r, this.r);
                image(vita_a_0, this.x3, this.y1, this.r, this.r);
                break;
            case 5:
                image(vita_a_1, this.x1, this.y1, this.r, this.r);
                image(vita_a_1, this.x2, this.y1, this.r, this.r);
                image(vita_a_1_2, this.x3, this.y1, this.r, this.r);
                break;
            case 6:
                image(vita_a_1, this.x1, this.y1, this.r, this.r);
                image(vita_a_1, this.x2, this.y1, this.r, this.r);
                image(vita_a_1, this.x3, this.y1, this.r, this.r);
                break;
          }    
    }
}