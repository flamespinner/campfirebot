import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const HUEBRIDGEIP = process.env.bridgeIP;
const HUEUSER = process.env.hueUsername;
const ids = [14,15];

const controlLight = async(lightId, on, hue, sat, bri) => {
    try {
        return await axios.put(
            `http://${HUEBRIDGEIP}/api/${HUEUSER}/lights/${lightId}/state`,
            { 
                on,
                   ... (sat && { sat }),
                   ... (bri && { bri }),
                   ... (hue && { hue }), 
            }
        );
    }catch (err) {
      //  console.error(error);
    }
};

const controlAllLights = (on) => {
    ids.forEach((id) => controlLight(id, on));
};

const setLightsToRandomColors = async () => {
    controlAllLights();
    ids.forEach((id) => {
        const hue = Math.floor(Math.random() * 65535) + 1;
        const sat = 200;
        const bri = 175;
        controlLight(id, true, hue, sat, bri);
    });
};

const setLightsForStream = () => {
    ids.forEach((id) => {
        const hue = 39540;
        const sat = 12;
        const bri = 84;
        controlLight(id, true, hue, sat, bri);
    });
};

const followerAlert = () => {
    ids.forEach((id) => {
        const hue = 59139;
        const sat = 200;
        const bri = 254;
        controlLight(id, true, hue, sat, bri);
    });
        ids.forEach((id) => {
        const hue = 47104;
        const sat = 254;
        const bri = 254
        controlLight(id, true, hue, sat, bri);
    });
    ids.forEach((id) => {
        const hue = 47104;
        const sat = 254;
        const bri = 254;
        controlLight(id, true, hue, sat, bri);
    });
    ids.forEach((id) => {
        const hue = 4161;
        const sat = 254;
        const bri = 254;
        controlLight(id, true, hue, sat, bri);
    });
    ids.forEach((id) => {
        const hue = 59139;
        const sat = 200;
        const bri = 254;
        controlLight(id, true, hue, sat, bri);
    });
        ids.forEach((id) => {
        const hue = 47104;
        const sat = 254;
        const bri = 254
        controlLight(id, true, hue, sat, bri);
    });
    ids.forEach((id) => {
        const hue = 47104;
        const sat = 254;
        const bri = 254;
        controlLight(id, true, hue, sat, bri);
    });
    ids.forEach((id) => {
        const hue = 4161;
        const sat = 254;
        const bri = 254;
        controlLight(id, true, hue, sat, bri);
    });
}

const FollowerAlertSequance = () => {
    for (let i = 0; i <5; i++) {
        if (i <= 5) {
        followerAlert();
        }
    }
    setLightsForStream();
    setLightsForStream();
}
//setLightsForStream();
//FollowerAlertSequance();

setLightsForStream();
//setLightsToRandomColors();
//followerAlert();
//controlAllLights(true);

export {FollowerAlertSequance, followerAlert, setLightsForStream, setLightsToRandomColors, controlAllLights}
