# Docstrail Frontend

A proposal management platform.

# Deployment

TBD. For Dev env, this must be via pushing to the remote `main` branch.\
Prod deployment is triggered when a Github release is created.

# Compute

Server is located at GCP.

# npm run proto - with readonly

```
    "proto": "which protoc && protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto --ts_proto_out=./src/app/generated/types --proto_path=../backend/proto --ts_proto_opt=oneof=unions --ts_proto_opt=env=node --ts_proto_opt=outputEncodeMethods=false --ts_proto_opt=stringEnums=true --ts_proto_opt=outputTypeRegistry=true --ts_proto_opt=fileSuffix=.pb --ts_proto_opt=useMapType=true --ts_proto_opt=outputJsonMethods=true --ts_proto_opt=useReadonlyTypes=true $(find ../backend/proto -iname \"*.proto\")"
```
