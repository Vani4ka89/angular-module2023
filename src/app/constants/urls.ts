import {environment} from "../../environments";

const {CAR_API} = environment;

const cars = `${CAR_API}/cars`;

const urls = {
  cars: {
    base: cars,
    byId: (id: number): string => `${cars}/${id}`
  }
};

export {
  urls
};
