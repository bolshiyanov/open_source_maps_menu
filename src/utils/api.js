import superagent from 'superagent';
import { getSearchString } from 'utils/url';
import history from 'utils/history';
import { getDefaultLanguage } from 'utils/translation';
import { GoogleSpreadsheet } from "google-spreadsheet";

const SOMETHING_WENT_WRONG = 'Что-то пошло не так!';

let token = null;
let invite = '';
const host = 'https://api.maps.menu';

export const setToken = (newToken) => {
  token = newToken;
};

export const setInvite = (newInvite) => {
  invite = newInvite;
};

export const getInvite = () => {
  const searchInvite = getSearchString(window.location.search, 'invitationId');
  return invite || searchInvite;
};

const responseBody = (res) => res && res.body;
const tokenPlugin = (req) => {
  if (token)
    req.set('Authorization', `Bearer ${token}`);
};

const handleError = (e) => {
  console.error(SOMETHING_WENT_WRONG, e);
};

const gapiEmail = "catalog@sweetyimport.iam.gserviceaccount.com";
const gapiKey = "Put-Your_key-Here";
const gApiTranslationKey = "Put-Your_key-Here";

const requests = {
  get: (url, params) => superagent.get(`${host}${url}`).query(params)
    .use(tokenPlugin)
    .retry(100)
    .catch(handleError)
    .then(responseBody),
  post: (url, params) => superagent.post(`${host}${url}`).send(params)
    .use(tokenPlugin)
    .catch(handleError)
    .then(responseBody),
  put: (url, params) => superagent.put(`${host}${url}`).send(params)
    .use(tokenPlugin)
    .catch(handleError)
    .then(responseBody),
  del: (url, params) => superagent.del(`${host}${url}`).send(params)
    .use(tokenPlugin)
    .catch(handleError)
    .then(responseBody)
};

const API = {
  getToken: () => superagent.post(`${host}/api/users/invite/${getInvite()}/confirm`)
    .retry(100)
    .catch(handleError)
    .then(responseBody)
    .then((response) => setToken(response.token)),
  updateToken: () => {
    const id = getInvite();
    if (!id) {
      return superagent.post(`${host}/api/users/register`)
        .send({})
        .catch(handleError)
        .then(responseBody)
        .then((response) => {
          const { invitationId } = response;
          setInvite(invitationId);
          history.push({
            pathname: '/',
            search: `?invitationId=${invitationId}`
          });
          return API.getToken();
        });
    }
    return API.getToken();
  },
  getData: () => requests.get('/api/profiles/pages/settings'),
  saveData: (data) => requests.put('/api/profiles/pages/settings', data),
  // register: (data) => requests.put('/api/users/profile', { ...data, lang: getDefaultLanguage() }),
  // login: (data) => requests.post('/api/users/login', data),
  uploadImage: (data) => requests.post('/api/profiles/pages/images/upload', data),
  // getBalance: () => requests.get('/api/payments/balance'),
  // getReferrals: () => requests.get('/api/profiles/referrals'),
  
  getGoogleSpreadSheetById: async (docId, sheetId) => {
    const doc = new GoogleSpreadsheet(docId);
    try {
      await doc.useServiceAccountAuth({
        client_email: gapiEmail,
        private_key: gapiKey,
      });
      // loads document properties and worksheets
      await doc.loadInfo();
  
      return doc.sheetsById[sheetId];
    } catch (e) {
      console.error('Error: ', e);
    }
  },
  getGoogleSpreadSheet: async (docId) => {
    const sheet = await API.getGoogleSpreadSheetById(docId, "0")
    return await sheet.getRows()
  },
  // translateGoogle: (text, fromLang, toLang) => {
  //   let url = `https://translation.googleapis.com/language/translate/v2?key=${gApiTranslationKey}`;
  //   url += '&q=' + encodeURI(text);
  //   url += `&source=${fromLang}`;
  //   url += `&target=${toLang}`;
    
  //   return fetch(url, { 
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     }
  //   })
  //   .then(res => res.json())
  //   .then((response) => {
  //     console.log("response from google: ", response);
  //   })
  //   .catch(error => {
  //     console.log("There was an error with the translation request: ", error);
  //   });
  // },
  translate: (texts, langFrom, langTo) => requests.post(`/api/profiles/translate/${langFrom}/${langTo}`, texts)
};

export default API;
