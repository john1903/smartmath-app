export const envURL = "dev";
// export const envURL = 'stage';
// export const envURL = 'prod';

export const dev_url = "https://smartmath-api.pl/api/v1";
export const stage_url = "https://smartmath-api.pl/api/v1";

export const BASE_URL = envURL == "dev" ? dev_url : stage_url;
