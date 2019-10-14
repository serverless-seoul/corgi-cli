// tslint:disable
import express = require("express");
import { Response } from "vingle-corgi";

import * as _ from "lodash";
import * as URL from "url";

export function runLocal(handler: Function) {
  const app = express();
  app.use((req, res) => {
    const url = URL.parse(req.url, true);
    handler({
      resource: "Corgi-Simulator",
      path: url.pathname!,
      httpMethod: req.method,
      headers: req.headers as any,
      queryStringParameters: url.query as any,
      requestContext: {
        resourceId: "request-random-id",
      } as any,
      body: req.body ? JSON.stringify(req.body) : undefined,
    }, {
      functionName: "some name",
      functionVersion: "v1.0",
      invokedFunctionArn: "arn",
      memoryLimitInMB: 1024,
      awsRequestId: "random id",
      logGroupName: "log group",
      logStreamName: "log stream",
      getRemainingTimeInMillis: () => {
        return 60 * 1000;
      },
    }).then((result: Response) => {
      _.each(result.headers, (value, name) => {
        res.set(name!, value);
      });
      res.status(result.statusCode);
      res.send(result.body);
    }).catch((e: any) => {
      res.status(500).json(e);
    });
  });

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
    console.log("http://localhost:3000");
  });
}
