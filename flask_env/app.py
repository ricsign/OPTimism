from flask import Flask, jsonify
from flask_cors import CORS
import serial
# from arduino import DistancePipeline, read_dist, running_avg

app = Flask(__name__)
CORS(app)  # This will handle CORS for all routes. Adjust if necessary.

lst = []
# Establish connection to the Arduino
ser = serial.Serial('/dev/cu.usbserial-1140', 9600)

def read_dist():
    # Preventing buffer
    ser.flush()
    ser.flushInput()
    ser.flushOutput()
    
    line = ser.readline().decode('utf-8').strip()
    # line = ser.readline()
    print("Received:", line)

    values = line.split()

    # Return the first value converted to a float
    ret_val = float(values[0])

    # Store the data in the list (convert it to an integer)
    if (len(lst) > 10):
        lst.pop(0)
    lst.append(ret_val)

    return ret_val
    # return line


def running_avg(reading):
    # Preventing buffer
    ser.flush()
    ser.flushInput()
    ser.flushOutput()
    
    # Calculate moving average of sensor data
    last_ten = reading[-10:]
    total_sum = 0
    for i in range(10):
        total_sum += last_ten[i]
    
    moving_avg = total_sum / 10
    return moving_avg


def read_gyro():
    # Preventing buffer
    ser.flush()
    ser.flushInput()
    ser.flushOutput()
    
    line = ser.readline().decode('utf-8').strip()
    print("Received:", line)

    values = line.split()

    x = float(values[1])
    y = float(values[2])
    z = float(values[3])
    
    ret_val = [x, y, z]

    return ret_val

    
    
    
# -------------------------- ENDPOINTS ---------------------------

@app.route('/dist', methods=['GET'])
def dist():
    val = read_dist()
    return jsonify({"distance": val})

@app.route('/avg', methods=['GET'])
def avg():
    current_dist = read_dist()
    avg_dist = running_avg(lst)
    return jsonify({
        "distance": current_dist,
        "avg_distance": avg_dist,
    })
    
@app.route('/gyro', methods=['GET'])
def gyro():
    data = read_gyro()
    x = data[0]
    y = data[1]
    z = data[2]
    return jsonify({
        "x": x,
        "y": y,
        "z": z,
    })

if __name__ == "__main__":
    app.run(debug=True)
