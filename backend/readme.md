# All backend services.

## Deploy
All deploys are automated. Just push to the `main` branch from the root (parent) firectory.

## Github Actions Configs
If Firebase token has expired, update secret value in Github after running locally `firebase login:ci` to obtain the new token. Make sure to run `firebase login --reauth` locally before fetching the new token.

## Protoc
1. Install `protoc`; [See Mac instructions](http://google.github.io/proto-lens/installing-protoc.html).
2. Run `npm run proto` to compile proto files.\
`ts` resources would be availabel at "_./src/generated/types_".\
Docs: https://protobufjs.github.io/protobuf.js/#usage-with-typescript
### Known Issues
Compiling google.protobuf.struct yields a `Struct` object that causes a "cannot be serialized" error when running tsc on it. To fix, change from `export const Struct = {...}` to `export const Struct:any = {...}`.