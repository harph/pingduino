// Example 02: Turn on LED while the button is pressed

const int LED = 13; // The pin for the LED
const int RED_LED = 12; // The pin for the LED
const int BUTTON = 7; // The input pin where the
                      // pushbutton is connected
int val = 0;

int old_val = 0;

int state = 0;
int serialValue = 0;


void setup() {
  pinMode(LED, OUTPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(BUTTON, INPUT);
  Serial.begin(9600);
}

void loop() {
  // Sends the value of the button to the LED pin
  val = digitalRead(BUTTON); // Read input value and store it
  // Sends the value of the button to the LED pin
  if ((val == HIGH) && (old_val == LOW)) {
    state = 1 - state;
    Serial.print(state);
  }
  
  if (Serial.available()) {
    serialValue = Serial.read();
    digitalWrite(RED_LED, HIGH);
    delay(500);
    digitalWrite(RED_LED, LOW);
  }
  
  // We need this to keep the previous value
  // due to the high speed of the Arduino
  // processor
  old_val = val;
  
  if (state == 1) {
    digitalWrite(LED, HIGH);
  }
  else {
    digitalWrite(LED, LOW);
  }
}
