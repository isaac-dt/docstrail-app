// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'docstrail-inc',
    appId: '1:776072270661:web:84321a88b91a969e54642c',
    storageBucket: 'docstrail-inc.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCwKfmuuLoPpOMS8pRMsxcKRlkMPf8CHmA',
    authDomain: 'docstrail-inc.firebaseapp.com',
    messagingSenderId: '776072270661',
    measurementId: 'G-L9LYTR5GZE',
  },
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCwKfmuuLoPpOMS8pRMsxcKRlkMPf8CHmA',
    authDomain: 'docstrail-inc.firebaseapp.com',
    projectId: 'docstrail-inc',
    storageBucket: 'docstrail-inc.appspot.com',
    messagingSenderId: '776072270661',
    appId: '1:776072270661:web:84321a88b91a969e54642c',
    measurementId: 'G-L9LYTR5GZE',
  },
  dimetrailApi: {
    url: 'https://us-central1-docstrail-inc.cloudfunctions.net/main',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
