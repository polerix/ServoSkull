import time
from espeak import espeak
from espeak import core as espeak_core

def say(*args):
  done_synth = [False]
  def synth_callback(event, pos, length):
    if event == espeak_core.event_MSG_TERMINATED:
      done_synth[0] = True
  espeak.set_SynthCallback(synth_callback)
  call_result = espeak.synth(*args)
  while call_result and not done_synth[0]:
    time.sleep(0.05)
  return call_result