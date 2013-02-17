// Example 02: Turn on LED while the button is pressed

const int SPEAKER = 12; // The pin for the speaker
const int LED = 11; // The pin for the LED
const int BUTTON = 7; // The input pin where the
                      // pushbutton is connected
                      
int pinCode = -1;
                      
                      
                      
                      
int val = 0;

int old_val = 0;

int state = 0;
int serialValue = 0;


void setup() {
  pinMode(SPEAKER, OUTPUT);
  pinMode(LED, OUTPUT);
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
  
  if(Serial.available()) {
    pinCode = Serial.read();
    if (pinCode == SPEAKER) {
      digitalWrite(SPEAKER, HIGH);
      delay(100);
      digitalWrite(SPEAKER, LOW);
    }
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
