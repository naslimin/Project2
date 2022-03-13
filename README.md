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

# Firebase config
```json

{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/",
        "destination": "/index.html"
      },
      {
        "source": "/index",
        "destination": "/index.html"
      },
      {
        "source": "/dashboard",
        "destination": "/dashboard.html"
      },
      {
        "source": "/event",
        "destination": "/event.html"
      },
      {
        "source": "/home",
        "destination": "/home.html"
      },
      {
        "source": "/leaveform",
        "destination": "/leaveform.html"
      },
      {
        "source": "/setting",
        "destination": "/setting.html"
      },
      {
        "source": "/register",
        "destination": "/register.html"
      },
      {
        "source": "/userinfo",
        "destination": "/userinfo.html"
      },
      {
        "source": "**",
        "destination": "/404.html"
      }
    ]
  }
}

```