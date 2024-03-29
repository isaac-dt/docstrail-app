# Docstrail App

- Firebase services under `backend`.
- Angular (GCP-deployed) frontend under `frontend`.

# Deployment

Both `backend` and `frontend` are deployed to their Dev envs by pushing to the `main` remote branch.\
To deploy to their respective Prod envs, we create a github release.

# Obtain Firebase TOKEN

```
firebase login:ci
firebase login:ci --no-localhost
```

# Frontend deploy

1. `ng build`
2. `ng deploy`

# Backend deploy

1. `firebase deploy --only functions`
1. or `firebase deploy --debug --only functions`
