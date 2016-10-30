import smbus
import time

DEVICE=0x23

bus = smbus.SMBus(1)

def convertToNumber(data) :
	return ((data[1] + (256 * data[0])) / 1.2)

def readLight(addr = DEVICE) :
	luxRead = bus.read_i2c_block_data(addr,0x10)
	return convertToNumber(luxRead)

def main() :
	print str(readLight())

if __name__=="__main__":
	main()

