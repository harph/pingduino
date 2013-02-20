// Example 02: Turn on LED while the button is pressed

const int SPEAKER = 12;
                                           
// pinCode: is the value that is coming through the serial port
int pinCode = -1;

// Button values
const int BUTTON = 7;
int buttonVal = 0;
int oldButtonVal = 0;
int buttonState = 0;

// Potentiometer values
const int POTENTIOMETER = A0;
int potentiometerVal = 0;
int oldPotentiometerVal = -1;

// Light sensor
const int LIGHT_SENSOR = A1;
int lightSensorVal = 0;
int oldLightSensorVal = -1;

void setup() {
  pinMode(SPEAKER, OUTPUT);
  pinMode(BUTTON, INPUT);
  Serial.begin(9600);
  Serial.println();
}

void loop() {
  checkButton();
  checkPotentiometer();
  checkLightSensor();
  checkInput();
}

void checkButton() {
  buttonVal = digitalRead(BUTTON);
  if ((buttonVal == HIGH) && (oldButtonVal == LOW)) {
    buttonState = 1 - buttonState;
    Serial.println("BUTTON");
  }
  oldButtonVal = buttonVal;
}

void checkPotentiometer() {
  potentiometerVal = map(analogRead(POTENTIOMETER), 0, 1023, 0, 100);
  if (potentiometerVal != oldPotentiometerVal) {
    String output = String("POTENTIOMETER:") + potentiometerVal + "%";
    Serial.println(output);
    oldPotentiometerVal = potentiometerVal;
    delay(100);
  }
}

void checkLightSensor() {
  lightSensorVal = map(analogRead(LIGHT_SENSOR), 0, 1023, 0, 100);
  if (lightSensorVal != oldLightSensorVal) {
    String output = String("LIGHT_SENSOR:") + lightSensorVal + "%";
    Serial.println(output);
    oldLightSensorVal = lightSensorVal;
    delay(100);
  }
}

void checkInput() {
  if(Serial.available()) {
    pinCode = Serial.read();
    if (pinCode == SPEAKER) {
      digitalWrite(SPEAKER, HIGH);
      delay(100);
      digitalWrite(SPEAKER, LOW);
    }
  }
}


