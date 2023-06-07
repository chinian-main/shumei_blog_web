const GAME_OBJECTS=[];//全局变量，存所有对象
export class GameObject{
    constructor(){
        GAME_OBJECTS.push(this);
        this.timedelta=0;
        this.has_called_start=false;//没有被调用
    }
    start(){}
    update(){}
    on_destroy(){}
    destroy(){
        this.on_destroy();
        for(let i in GAME_OBJECTS){
            const obj =GAME_OBJECTS[i];
            if(obj==this){
                GAME_OBJECTS.splice(i);
                break;
            }
        }
    }
    
    
}
let last_timestamp;//上一次执行的时刻
const step=timestamp=>{
    for(let obj of GAME_OBJECTS){
        if(!obj.has_called_start){
            obj.has_called_start=true;
            obj.start();
        }
        else{
            obj.timedelta=timestamp-last_timestamp;
            obj.update();
        }
    }
    last_timestamp=timestamp;
    requestAnimationFrame(step);
}
requestAnimationFrame(step);