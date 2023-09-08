import {environment} from "../../environments";

const {CAR_API} = environment;

const auth = `${CAR_API}/auth`;
const cars = `${CAR_API}/cars`;

const urls = {
  auth: {
    login: auth,
    refresh: `${auth}/refresh`,
    me: `${auth}/me`
  },
  cars
};

export {
  urls
};
