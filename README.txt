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

  npm install i2c  -> 失敗
  npm install rasp2c -> 成功
  sudo modprobe i2c-bcm2708
  sudo apt-get install i2c-tools

  vim ~/node_modules/rasp2c/lib/rasp2c.js
  ->以下を編集する。
  var i2cbus = '1';を'0'にする。

<赤外線センサー 準備>
lircをインストール
$ sudo apt-get install lirc

$ sudo vim /etc/lirc/hardware.conf
LIRCD_ARGS="--uinput"
DRIVER="default"
DEVICE="/dev/lirc0"
MODULES="lirc_rpi"

$ sudo vim /etc/modules
lirc_dev
を追加

$ sudo vim /boot/config.txt
dtoverlay=lirc-rpiのコメントアウトを解除、
下記のように修正する。
dtoverlay=lirc-rpi,gpio_out_pin=17,gpio_in_pin=18
※GPIO-17が赤外線送信、18が赤外線受信

<赤外線センサー 受信>
  573  sudo modprobe lirc-rpi gpio_in_pin=18
  575  mode2 -d /dev/lirc0
  irrecord -n -d /dev/lirc0 light
  -> lightの内容で/etc/lirc/lircd.confを上書き

<赤外線センサー 送信>
  irsend LIST "" "" -> 設定が読み込まれているか確認
  irsend LIST light "" -> 設定が読み込まれているか確認
  irsend SEND_ONCE light on -> ON制御(名前はLISTで確認)

