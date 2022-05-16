import { ttvchatClient } from '../../authhandler.mjs';
import process from 'process';

async function ping() {
    ttvchatClient.say(`Agent_Flame`, `Pong! The CampFire has burning for ${format(uptime)}, ${uptime}, ${process.uptime()}`);
}

function format(seconds){
    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
  
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }
  
  var uptime = process.uptime();

export {
    ping
};