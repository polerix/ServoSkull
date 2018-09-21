import time             # used to timestamp messages
import speech           # code to call espeak
from flask import Flask, render_template, request

global message_log      # stores a list of (time, name, text) tuples
message_log = []        # empty the message log

app = Flask(__name__)

# Root Page - display main menu
@app.route("/")
def root():
  return render_template('piHole_root.html')

# Log Page - display message log
# Display the last 25 entries in the message log, most recent first
@app.route('/log')
def log():
  templateData = {'log' : message_log[-25:][::-1]}
  return render_template('piHole_log.html', **templateData)

# Say Page - display message entry form
@app.route('/say', methods=['GET'])
def say():
  return render_template("piHole_say.html")

# Say Post - process message
@app.route('/say', methods=['POST'])
def say_post():
  name = request.form['name']
  text = request.form['text']
  speech.say(name + " says " + text)
  log_add(name, text)
  templateData = {'name' : name}
  return render_template("piHole_say.html", **templateData)

# add message text and sender name to message log with timestamp
def log_add(who, what):
  global message_log
  when = time.strftime('%H:%M:%S')
  message_log.append((when, who, what))

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=9012, debug=True)