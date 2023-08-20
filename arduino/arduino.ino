#include <MPU6050_light.h> // light module used for MPU 6050
#include <Wire.h>          

// constants for ARUDINO
const int trigPin = 9;
const int echoPin = 10;
const int speedSound = 343;
const int micro = 1000;
const int MPU = 0x68;
const int ERROR_TRIALS = 500;

// output data for the aurdino towards the backend
MPU6050 mpu(Wire);
float GyroX, GyroY, GyroZ;
float GyroAngleX, GyroAngleY, GyroAngleZ;
float GyroErrorX,  GyroErrorY, GyroErrorZ;
float duration, distance;
float currTime = 0, prevTime = 0, elaspedTime = 0;
unsigned long timer = 0;

void calculate_IMU_error() {
  // We can call this funtion in the setup section to calculate the accelerometer and gyro data error.
  // From here we will get the error values used in the above equations printed on the Serial Monitor.
  // Note that we should place the IMU flat in order to get the proper values, so that we then can the correct values
  int x = 0;
  while (x < ERROR_TRIALS) {
    Wire.beginTransmission(MPU);
    Wire.write(0x43);
    Wire.endTransmission(false);
    Wire.requestFrom(MPU, 6, true);
    GyroX = Wire.read() << 8 | Wire.read();
    GyroY = Wire.read() << 8 | Wire.read();
    GyroZ = Wire.read() << 8 | Wire.read();
    // Sum all readings
    GyroErrorX = GyroErrorX + (GyroX / 131.0);
    GyroErrorY = GyroErrorY + (GyroY / 131.0);
    GyroErrorZ = GyroErrorZ + (GyroZ / 131.0);
    ++x;
  }
  // Serial.println(GyroErrorX);
  // Serial.println(GyroErrorY);
  // Serial.println(GyroErrorZ);
}

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Wire.begin(); // init comm.
  Wire.beginTransmission(MPU); // init MPU comm.
  Wire.write(0x6B);
  Wire.write(0x00); // reset the gyro reading
  Serial.println("Initialize MPU6050");
  calculate_IMU_error();
  
  byte status = mpu.begin();
  Serial.print(F("MPU6050 status: "));
  Serial.println(status);
  while(status!=0){ } // stop everything if could not connect to MPU6050
  
  Serial.println(F("Calculating offsets, do not move MPU6050"));
  delay(1000);
  mpu.calcOffsets(); // gyro and accelero
  Serial.println("Done!\n");
}

void loop() {
  mpu.update();
  // the format of the data is DISTANCE | PITCH | ROW | YAW
  if (( millis() - timer) > 50){ // print data every 10ms
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2); // delay by 2 
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10); // admits 10 ms of waves
    digitalWrite(trigPin, LOW);

    duration = pulseIn(echoPin, HIGH);
    duration /= micro; // changes to seconds
    distance = (duration * speedSound) / (10 * 2); // change so it converts to cm

    // Serial.print("Distance: ");
    Serial.print(distance);
  
    // Serial.print("\t\tX : ");
    Serial.print(" ");
    Serial.print(mpu.getAngleX());
    
    // Serial.print("\tY : ");
    Serial.print(" ");
    Serial.print(mpu.getAngleY());
    // Serial.print("\tZ : ");
    Serial.print(" ");
    Serial.println(mpu.getAngleZ());
    timer = millis();  
  }
}

