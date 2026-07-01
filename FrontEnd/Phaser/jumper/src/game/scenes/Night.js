import { BlendModes, Filters, Scene } from "phaser";

export default class Night extends Scene{

    constructor(){
        super('Night');
        this.city = null;
        this.lightsDirection = true;
        this.lightsTime = Date.now();
    }

    preload(){
        console.log('called');
        this.load.setPath('assets');

        this.load.image('city','city.png');

        this.load.image('lights','city-lights.png');

        
    }

    create(){
        this.city = this.add.sprite(1060,500,'city').setOrigin(0.8,0.5).setScale(0.5);
        // const light = this.add.image(1060,500,'lights').setScale(0.77);
        // console.log(city);
        // light.setBlendMode(BlendModes.ADD);
        this.city.enableFilters();
        this.city.filters.internal.addBlend('lights',BlendModes.ADD);
        this.lightsTime = Date.now();

        this.cameras.main.setBounds(0,0,this.city.width,this.city.height);
    }
    update(){
        if(Date.now() - this.lightsTime >= 10){
            this.lightsTime = Date.now();
            // console.log(this.city.filters.internal.getActive()[0].amount)
            if(this.city.filters.internal.getActive()[0].amount<=0.01 || this.city.filters.internal.getActive()[0].amount>=1){
                this.lightsDirection = !this.lightsDirection;
                // console.log(this.input.mousePointer.position);
                
            }
            
            if(this.lightsDirection){
                this.city.filters.internal.getActive()[0].amount += 0.02;
            }else{
                this.city.filters.internal.getActive()[0].amount -= 0.02;
            }
        }
        this.cameras.main.scrollX = this.input.mousePointer.position.x;
        this.cameras.main.scrollY = this.input.mousePointer.position.y;
    }
}