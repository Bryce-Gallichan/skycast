import { UserLocation } from "./user-location.model";

export interface GeocodeResponse extends UserLocation {
    local_names: {
        ar: string;
        bn: string;
        el: string;
        en: string;
        eo: string;
        es: string;
        fa: string;
        hi: string;
        ja: string;
        ko: string;
        mr: string;
        oc: string;
        pl: string;
        ps: string;
        ru: string;
        ta: string;
        te: string;
        uk: string;
        ur: string;
        zh: string;
    }
}