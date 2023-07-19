import { derived, readable, writable } from "svelte/store";

export const routeList = readable( Object.entries({ Boise: 15, Meridian: 10, Nampa: 15, Caldwell: 20, Eagle: 15, Emmett: 25, Fruitland: 50, Homedale: 50, Kuna: 15, Middleton: 25, Marsing: 25, Melba: 25, Midvale: 75, Mountain_Home: 40, New_Plymouth: 40, Ontario: 50, Parma: 50, Payette: 50, Vale: 75, Weiser: 50,}));

export const startDate = writable(undefined)
export const endDate = writable(undefined)
export const activeRoutes = writable({});
export const globalWidth = writable(0);
export const selectedDateRange = writable([''])
export const totalsCounter = writable({})
