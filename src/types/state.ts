import { store } from "../store";
import { SortType, AuthorizationStatus } from "../const";
import { OffersData } from "./offers";
import { OffersDataCityName } from "./offers";
import { UserData } from "./user-data";

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InitialStateType = {
  city: OffersDataCityName;
  offers: OffersData[];
  sorting: SortingType;
  hoveredOffer: HoverOfferType,
  authorizationStatus: AuthorizationStatusType,
  isDataLoaded: boolean,
  userData: null | UserData,
};

export type SiteData = {
  offers: OffersData[];
  isDataLoaded: boolean;
};

export type SiteProcess = {
  city: OffersDataCityName;
  sorting: SortingType;
  hoveredOffer: HoverOfferType;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatusType;
  userData: null | UserData;
};

export type SortingType = typeof SortType[keyof typeof SortType];
export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
export type HoverOfferType = null | number;
