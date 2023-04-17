# docstrail Firebase

A dependency injection framework for Firebase Cloud Functions.

# Controller

A Controller is a class marked by the @Controller decorator (at @docstrail/firebase/core/utils). It groups HTTP paths along with their handlers. The Controller class needs to be declared in a [DtModule](#dtmodule) in order to load its cloud functions to firebase.

```typescript
import {Controller} from "@docstrail/firebase/core/utils";

@Controller({path: "my-path"})
class MyController {}
```

We can use [dependency injection (DI)](#dependency-injection) to access singleton objects within a [DtModule](#dtmodule).

```typescript
@Controller({path: "my-path"})
class MyController {
  constructor(readonly Logger: logger) {}

  myMethod() {
    this.logger.log("hello world");
  }
}
```

## HTTP Annotations

Methods in a Controller can be annotated with **`@get`**, **`@post`**, **`put`**, or **`patch`** (all at @docstrail/firebase/core/https) to export them as Firebase cloud functions. All annotations take as argument an object with a `path:string` key.\
The annotation's handler method must take two arguments: [Request](https://expressjs.com/en/4x/api.html#req) and [Response](https://expressjs.com/en/4x/api.html#res) (both at @docstrail/firebase/core/https).

```typescript
import {get} from "@docstrail/firebase/core/https";

@Controller({path: "notification"})
export class NotificationController {
  constructor(readonly NotificationDatabase: notificationDB) {}

  @get({path: "latest"})
  getLastNotification(req: Request, res: Response) {
    res.send(notificationDB.getLast());
  }
}
```

In the example above, the `getLastNotification` handler will be available at the path: `notification/latest`. Were we to declare the controller in a [DtModule](#dtmodule) called "Message", the path would become `message/notification/latest`.\
\
**_Note:_** _Adding "/" to the beginning of a path is optional._

# DtModule

An DtModule is a class marked by the @DtModule decorator (at @docstrail/firebase/core/utils). It groups (or scopes) [Controllers](#controller) with [Injectables](#dependency-injection), and loads the cloud functions to firebase (along with their respective paths).\
A DtModule can take an optional `path` argument, which is used as a prefix for its controller paths.

```typescript
import {DtModule} from "@docstrail/firebase/core/utils";
import {MyController} from "./my-controller";

@DtModule({
  path: "my-path",
  controllers: [MyController],
  providers: [new Provider({provide: Logger})],
})
export class MyModule {}
```

Modules can import other modules via the `imports` key. When importing a module, all its [Controllers](#controller) and [Injectables](#dependency-injection) become available to the (importing) module's scope.

```typescript
@DtModule({
  imports: [MyModule],
})
class MainModule {}
```

## Root Module

This is the [DtModule](#dtmodule) that ultimately exports the app resources to Firebase. All other modules should be imported here.

```typescript
import {bootstrapModule} from "@docstrail/firebase/core/utils";

@DtModule({
  imports: [MyModule],
})
class RootModule {}

export const main = bootstrapModule(new RootModule());
```

The `bootstrapModule(DtModule)` function is responsible for transforming the app resources into a single cloud function for Firebase. The cloud function uses [express.js](https://expressjs.com/) to serve its resources (see [how](https://firebase.google.com/docs/hosting/functions#use_a_web_framework)).

## Initializing global resources

Note that the file in which the root module is declared is a good location for other app initialization logics.

```typescript
import * as admin from "firebase-admin";

admin.initializeApp(); // This runs before everything else.

@DtModule({
  imports: [MyModule],
})
class RootModule {}

export const main = bootstrapModule(new RootModule());
```

## Fetching the Express.js app instance

The `getExpressInstance(DtModule):Express` method (at @docstrail/firebase/core/utils) fetches the express instance used by your main cloud function. This could be useful for direct manipulations such as adding middleware.

```typescript
import * as cors from "cors";
import {
  getExpressInstance,
  bootstrapModule,
} from "@docstrail/firebase/core/utils";

@DtModule({
  imports: [MyModule],
})
class RootModule {}

const rootModule = new RootModule();

const app = getExpressInstance(rootModule);
app.use(cors({origin: true}));

export const main = bootstrapModule(rootModule);
```

# Dependency Injection

## Injectable

An Injectable is a class marked by the @Injectable decorator (at @docstrail/firebase/core/utils). It marks a class as usable by a [provider](#provider).

```typescript
import {Injectable} from "@docstrail/firebase/core/utils";

@Injectable()
export class MySanitizer {}
```

## Provider

Singleton objects can be instantiated and shared at the [DtModule](#dtmodule) level. We use a **`Provider`** object (at @docstrail/firebase/core/utils) as shown below. Note that there are three ways to declare a provider.

```typescript
import {Provider} from "@docstrail/firebase/core/utils";
import {MyValidator, MySanitizer, MyLogger} from "./my-services";

@DtModule({
  controllers: [MyController],
  providers: [
    MyValidator, // Implictly created via DI.
    new Provider({provide: MySanitizer}), // Implictly created via DI.
    new Provider({
      provide: MyLogger,
      useValue: new MyLogger({url: "string-argument"}),
    }),
  ],
})
export class MyModule {}
```

**Note:** The providers are key'ed by class name; consequently, when two objects from the same class are provided, the latter overwrites the former.

## Injecting

Provided objects can be injected into controllers that are declared in the same module. Arguments can be written in any order.

```typescript
@Controller({path: "my-path"})
class MyController {
  constructor(readonly MyLogger: logger, readonly MySanitizer: sanitizer) {}
}
```

# Middleware

[DtModules](#dtmodule), [Controllers](#controller), and [Http annotations](#http-annotations) may take in middleware handlers that run as precursors to **`get`**, **`post`**, **`put`**, and **`patch`** http handlers. For all the mentioned decorators, handlers are added using the `runHttpAfter` (at @docstrail/firebase/core/utils).\

```typescript
import {Controller, runHttpAfter} from "@docstrail/firebase/core/utils";
import {Request, Response, get} from "@docstrail/firebase/core/utils";

@Controller({
  runHttpAfter: [
    (req, res, next) => {
      // Performs middleware operations here.
      next();
    },
  ],
})
export class MyController {
  @get({path: "my-path"})
  myHandler(req: Request, res: Response) {
    // This runs after the middleware above.
  }
}
```

**Note:** the middleware execution follows the array order. When `runHttpAfter` is used at multiple decorator levels, precedence is in the following order: [DtModule](#dtmodule), [Controller](#controller), then [http annotation](#http-annotations);
