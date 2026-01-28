import "server-only";

import {
    detectBot,
    fixedWindow,
    protectSignup,
    sensitiveInfo,
    shield,
    slidingWindow
} from '@arcjet/nest';
import  arcject  from '@arcjet/nest';
import { env } from './env';

export {
      detectBot,
    fixedWindow,
    protectSignup,
    sensitiveInfo,
    shield,
    slidingWindow
}

export default arcject({
    key: env.ARCJET_KEY,
    charateristics: ["fingerprint"],

    //define base rules here, can also be empty if you dont
    //if you dont want any base rules
    rules: [
        shield({
            mode: "LIVE"
        }),
    ],
});