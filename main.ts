// Setting the varbile 
let distacneToObject: number = 0
const minDistanceToMove = 2;

let greenLedPin = DigitalPin.P13
let redLedPin = DigitalPin.P12

// Setting the bluetooth conccettoin 
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})



bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))


    //setting the sonar
    distacneToObject = sonar.ping(
        // Setting the sonar
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
    )
    basic.showNumber(distacneToObject)
    pins.digitalWritePin(redLedPin, 0)
    pins.digitalWritePin(greenLedPin, 0)
    if (distacneToObject >= minDistanceToMove) {
        pins.digitalWritePin(greenLedPin, 1)  // Turn the green LED on
        pins.digitalWritePin(redLedPin, 0)  // Turn the red LED off
    }
    else {
        pins.digitalWritePin(redLedPin, 1)  // Turn the red LED on
        pins.digitalWritePin(greenLedPin, 0)  // Turn the green LED off
    }
    //basic.pause(200)  // Wait for 1 second
   
    // Presed up button
    if (receivedString == "up" && distacneToObject > minDistanceToMove) {
        robotbit.StpCarMove(2, 48)
    }
    // Dwon button
    if (receivedString == "down") {
        robotbit.StpCarMove(-2, 48)
    }
    // Presed right button
    if (receivedString == "right" && distacneToObject > minDistanceToMove) {
        // Turning 90 degrees
        robotbit.StepperTurn(robotbit.Steppers.M1, robotbit.Turns.T1B2)
    }
     // Presed left button
    if (receivedString == "left" && distacneToObject > minDistanceToMove) {
        // Turning 90 degrees
        robotbit.StepperTurn(robotbit.Steppers.M2, robotbit.Turns.T1B4)
    }
    // stop
    if (receivedString == "stop") {
        if(distacneToObject){
        robotbit.MotorRun(robotbit.Motors.M1A, 0)
        }
    }

})
let receivedString = ""
bluetooth.startUartService()
basic.showNumber(distacneToObject)
basic.showIcon(IconNames.Square)