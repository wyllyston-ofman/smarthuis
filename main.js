const sensor = require('ds18b20-raspi');
const Gpio = require('onoff').Gpio;         // Gpio class
const klepA = new Gpio(2, 'out');           // Export GPIO2 as an output
const klepB = new Gpio(3, 'out');           // Export GPI3 as an output
// const klepC = new Gpio(17, 'out');          // Export GPI17 as an output
// const klepD = new Gpio(27, 'out');          // Export GPI27 as an output
// const klepE = new Gpio(22, 'out');          // Export GPI22 as an output
// const klepF = new Gpio(10, 'out');          // Export GPI10 as an output
// const klepG = new Gpio(11, 'out');          // Export GPI11 as an output
// const klepH = new Gpio(9, 'out');           // Export GPI9 as an output
// const klepI = new Gpio(11, 'out');          // Export GPI11 as an output
// const klepJ = new Gpio(0, 'out');           // Export GPI0 as an output
// const klepK = new Gpio(5, 'out');           // Export GPI5 as an output
// const klepL = new Gpio(6, 'out');           // Export GPI6 as an output
// const klepM = new Gpio(13, 'out');          // Export GPI13 as an output
// const klepN = new Gpio(19, 'out');          // Export GPI19 as an output
const Pomp = new Gpio(26, 'out');           // Export GPI26 as an output
// const Pomp1 = new Gpio(14, 'out');          // Export GPI14 as an output
// thermometer import  GPI4 //



function controle() {

    var T1 = sensor.readSimpleC(1);                  //Q roof
    var T2 = 0;//  sensor.readSimpleC(2)//          //Heatpipe
//    var T3 = 0; //sensor.readSimpleC(2)//§         //ventiline
    var min1 = 35;                                //onderboilerthermometer
    var min2 = 32;                               //bovenboilerthermometer
     console.log(`${T1} degC`);                 //live temperatuur


    if (T1 > min1 && T2 > min1) {


        setup1();

    }

    else if (T1 < min2) {
        setup3();
    }


    else if (T2 < min2) {
        setup2();
    }

    setInterval(controle,3000);

}
// Het temperatuur van Qroof en heatpipe groter is dan de onderboilerthermometer//
function setup1() {

    klepA.write(0);
    klepB.write(1);
    Pomp.write(1);
}
// Het temperatuur van Qroof is kleiner dan van bovenboilerthermometer//
function setup2() {

    klepA.write(1);
    klepB.write(0);
    Pomp.write(1);

}
// Het temperatuur van Heatpipe is kleiner dan van onderboilerthermometer//
function setup3() {

    klepA.write(0);
    klepB.write(0);
    Pomp.write(0);
}
controle();
