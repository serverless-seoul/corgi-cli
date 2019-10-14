# vingle-corgi-cli
CLI commands for development for vingle-corgi

## install 
```
npm install vingle-corgi-cli --save-dev
```

## vingle-corgi build <entitiesFolder>
read list of entities from given folder, generate definitions.json that contains JSONSchema of given entities
```
- src
  - api 
    - entities
      - post.ts
      - comment.ts
      - like.ts
```
*vingle-corgi build "./src/api/entities/"*

## vingle-corgi run-local <apiHandlerPath>
run corgi webserver locally, through express wrapper.
apiHandlerPath should be js file that has export of corgi handler,
```
# ./src/api/index.js
import * as _ from "lodash";
import { Namespace, OpenAPIRoute, Router } from "vingle-corgi";

import { routes } from "./routes";

import * as entityDefinitions from "./entities/definitions.json";

export const router = new Router([
  new OpenAPIRoute(
    "/open-api",
    {
      title: "ExchangeService",
      version: "1.0.0",
      definitions: entityDefinitions,
    },
    routes,
  ),
  new Namespace("", {
    children: routes,
  }),
]);

export const handler = router.handler();
```

*vingle-corgi run-local "./src/api/index.js"*
