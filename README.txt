<下準備>
    6  sudo apt-get update
    7  sudo apt-get upgrade
    8  sudo apt-get dist-upgrade 
<温度センサー>
   61  cat /sys/bus/w1/devices/28-041680e272ff/w1_slave 
<光センサー>
   85  sudo raspi-config 
   86  sudo modprobe snd-bcm2835
   87  sudo modprobe i2c-dev
   88  sudo apt-get install libi2c-dev
   89  sudo i2cdetect -y 1
   90  sudo reboot
   97  sudo i2cset -y 1 0x23 0x01 c
  102  sudo i2cset -y 1 0x23 0x20 c
  103  sudo i2cget -y 1 0x23 0x20 w

