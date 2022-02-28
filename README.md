# Install
`npm install || yarn install`
# Start Dev
`npm run dev || yarn dev`

# Start Server
`npm run build || yarn build`
`npm run start || yarn start`

# Deploy to firebase
`npm run build || yarn build`
`npm run deploy || yarn deploy`

# Firebase Config File
`/config/firebase.js`

```javascript
const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
};
```

# Firebase Deploy Config file
`/html/.firebaserc`
```json
{
  "projects": {
    "default": "projects_id"
  }
}

```