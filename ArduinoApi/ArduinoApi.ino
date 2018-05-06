  #include <Bridge.h>
  #include <BridgeServer.h>
  #include <BridgeClient.h>
  #include <Servo.h>
  
  BridgeServer server;
  Servo servo;
  
  int pressureTransducerPin = A0;   // declares pressure sensor on pin A0
  int valve0Pin = 4;            // Valve 0 is on pin 4
  int valve1Pin = 7;            // Valve 1 is on pin 7
  int hightSensorPin = A1;
  int pumpPin = 5;
  boolean pumpIsOn = false;
  
  void setup() {
    // Bridge startup
    //servo.attach(9);
    //servo.write(90);
    Bridge.begin();
    pinMode(valve0Pin, OUTPUT);
    pinMode(valve1Pin, OUTPUT);
    pinMode(pumpPin, OUTPUT);
    digitalWrite(valve1Pin, HIGH);
    digitalWrite(valve0Pin, LOW);
    digitalWrite(pumpPin, LOW);
    pinMode(pumpPin, OUTPUT);
    digitalWrite(pumpPin, LOW);
    server.listenOnLocalhost();
    server.begin();
    pinMode(13, OUTPUT);
    digitalWrite(13, HIGH);
  }
  
  void loop() {  
    // Get clients coming from server
    BridgeClient client = server.accept();
  
    // There is a new client?
    if (client) {
      client.setTimeout(5);
      // Process request
      process(client);
  
      // Close connection and free resources.
      client.stop();
    }
    
    if(pumpIsOn){
      float reading = analogRead(hightSensorPin);                  // tell Arduino to store value of eTape in reading
      reading = (1023 / reading) - 1;               // convert reading to ohms
      reading = (-1 + reading)/(-0.099080) + 0.75;
      if(reading < 2.0){
          digitalWrite(pumpPin, LOW);
      }
    }
    
    delay(50); // Poll every 50ms
  }
  
  void process(BridgeClient client) {
    // read the Request
    String Request = client.readStringUntil('/');
    if(Request == "pump"){
      pumpRequest(client);
    }else if(Request == "pressure"){
      pressureRequest(client);
    }else if(Request == "height"){
      heightRequest(client);
    }else if(Request == "servo"){
      servoRequest(client);
    }else if(Request == "valve0"){
      valve0Request(client);
    }else if(Request == "valve1"){
      valve1Request(client);
    }
    
  }

  void pumpRequest(BridgeClient client) {
    int position = client.parseInt();
    digitalWrite(pumpPin, position == 1 ? HIGH : LOW);
    if(position == 1){
      pumpIsOn = true;
    }else{
      pumpIsOn = false;
    }
    // Send feedback to client
    client.print("Set pump to ");
    client.print(position);
   }

  void heightRequest(BridgeClient client) {
      float reading = analogRead(hightSensorPin);                  // tell Arduino to store value of eTape in reading
      reading = (1023 / reading) - 1;               // convert reading to ohms
      reading = (-1 + reading)/(-0.099080) + 0.75;
      client.print(reading);
   }
  
  void valve0Request(BridgeClient client) {
    int position = client.parseInt();
    digitalWrite(valve0Pin, position == 1 ? HIGH : LOW);
    
    // Send feedback to client
    client.print("Set Valve0 to ");
    client.print(position);
   }
    
  void valve1Request(BridgeClient client) {
    int position = client.parseInt();
    digitalWrite(valve1Pin, position == 1 ? HIGH : LOW);
    
    // Send feedback to client
    client.print("Set Valve1 to ");
    client.print(position);
  }
    
  void servoRequest(BridgeClient client) {
    int degrees = client.parseInt();
    servo.write(degrees);
  
    // Send feedback to client
    client.print("Set Servo to ");
    client.print(degrees);
    client.print(" Degrees");
    }
  
  void pressureRequest(BridgeClient client) {
    float pressureVoltage = analogRead(pressureTransducerPin) / 100.0;     // raw reading of pressure sensor [V]
    float pressurePSI = (((pressureVoltage) - 0.5) / 0.04);         // measurement from pressure sensor [psi]
    float pressureMMHG = pressurePSI * 51.71484;
    
    // Send feedback to client
    client.print("Pressure Voltage ");
    client.print(pressureVoltage);
    client.println();
    client.print("Pressure PSI ");
    client.print(pressurePSI);
    client.println();
    client.print("Pressure mmHg ");
    client.print(pressureMMHG);
  }
