import { store } from "../store";
import { SortType } from "../const";
import { OffersData } from "./offers";
import { OffersDataCityName } from "./offers";

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InitialStateType = {
  city: OffersDataCityName;
  offers: OffersData[];
  sorting: SortingType;
  hoveredOffer: HoverOfferType
};

export type SortingType = typeof SortType[keyof typeof SortType];
export type HoverOfferType = null | number;
