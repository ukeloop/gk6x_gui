# GK6X GUI                                                                                   
This tool allows you to set keys for GK6X keyboards (GK64, GK84, GK61, etc) with [pixeltris/GK6X](https://github.com/pixeltris/GK6X).
This can be used as an alternative to the official software [GK6XPlus Driver](http://www.jikedingzhi.com/downloadlist?driverID=41latest).

## Usage
1. Change the key configuration.
1. When you open [pixeltris/GK6X](https://github.com/pixeltris/GK6X) it will connect to your keyboard. Once it has connected it will create a file `UserData/YOUR_MODEL_ID.txt`.
1. Copy key configuration to `UserData/YOUR_MODEL_ID.txt` and save.
1. Use the `map` command to apply your changes to the keyboard.

The firmware doesn't allow you to reprogram the `Fn` keys on the base layer.

## Reset keyconfig
Use the `unmap` command to reset your keyboard to the default state.

## More advanced settings
If you want to make more advanced settings, use a PCB that supports [QMK Firmware](https://github.com/qmk/qmk_firmware), such as [DZ60RBG](https://kbdfans.com/products/dz60rgb-hot-swap-custom-keyboard-pcb).