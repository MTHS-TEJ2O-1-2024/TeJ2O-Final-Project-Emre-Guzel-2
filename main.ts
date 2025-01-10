/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Emre Guzel
 * Created on: Jan 9 2025
 * This program rc car 
*/

bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (receivedString == "up") {
        robotbit.StpCarMove(2, 48)
    }
    if (receivedString == "down") {
        robotbit.StpCarMove(-2, 48)
    }
    if (receivedString == "right") {
        // Turning 90 degrees
        robotbit.StepperTurn(robotbit.Steppers.M1, robotbit.Turns.T1B4)
    }
    if (receivedString == "left") {
         // Turning 90 degrees
        robotbit.StepperTurn(robotbit.Steppers.M2, robotbit.Turns.T1B4)
    }
    if (receivedString == "stop") {
        robotbit.MotorRun(robotbit.Motors.M1A, 0)
    }
})
let receivedString = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Square)

