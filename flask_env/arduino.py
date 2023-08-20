from taipy import Config
import taipy as tp
import serial

# Establish connection to the Arduino
ser = serial.Serial('/dev/ttyACM0', 9600) # Change '/dev/ttyACM0' to your port name (like 'COM3' for Windows)

# ------------------------------------------ Arduino ---------------------------------------------
def read_dist():
    
    try:
        # Read a line from the Arduino's serial output
        line = ser.readline().decode('utf-8').strip()
        print("Received:", line)

    except KeyboardInterrupt:
        # Close the serial connection when interrupted
        ser.close()
        print("\nConnection closed.")
        print("Data received:", line)

    except Exception as e:
        print("Error:", e)
        ser.close()

    return line

# ----------------------------------------- Taipy pipeline ---------------------------------------------
def read_dist():
    # Read arduino sensor data
    
    # Don't need the while loop since the pipeline is already in a loop
    # while True:
    # Read a line from the Arduino's serial output
    line = ser.readline().decode('utf-8').strip()
    print("Received:", line)

    values = line.split()

    # Return the first value converted to a float
    return float(values[0])


def running_avg(reading):
    # Calculate running average of sensor data
    
    print(reading)
    
    # avg = sum(lst) / len(lst)
    return reading
    

# run pipeline to trigger the task to read arduino sensor
# pipeline is run in a loop in a background thread repeatedly run pipelines not blocking anything)
# taipy rest api exposes the result data from the pipeline to web ui (send data)

# when reading from arduino, use arduino python library (arduino python 3)

Config.load("taipy.toml")
scenario_cfg = Config.scenarios["arduino_scenario"]

if (__name__ == "__main__"):
    # Run of the Core
    tp.Core().run()

    # Creation of the scenario and execution
    scenario = tp.create_scenario(scenario_cfg)
    tp.submit(scenario)

    print("Value at the end of task", scenario.to_send.read())