// Day-18


// ___________________________________________________________


// console.log('Main start');

// setTimeout(()=> {console.log('-----Timeout 1')},10);
// setImmediate(()=>{console.log("Immediate 1")});

// setTimeout(()=>{
//     setTimeout(()=>{console.log('----Timeout 3.')},10);
//     setImmediate(()=>{console.log('-----Immediate 2')});

//     console.log("----Timeout 2");
// },10);

// console.log("Main ends");

let counter = 0;

const getData = () => {
    console.log("Fetching data :",counter++);
}

let timer=0;
// const handleTimer = function(fn,delay){
const handleTimer = function(fn,limit){
    return function(){
        if(Date.now()-Number(timer) > delay){
            fn.apply(this,arguments);
            timer = Date.now();
        }
        // clearTimeout(timer);
        // timer = setTimeout(()=>{
        // },delay);
    }
}

const fetchData = handleTimer(getData,1000);

// function* counter() {
//     let i = yield 0;
//     yield i;
// }

// const gen = counter();
// console.log(gen.next().value); // first call
// console.log(gen.next(5).value);