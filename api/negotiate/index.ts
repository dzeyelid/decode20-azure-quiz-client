import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, connectionInfo: any): Promise<void> {
  context.log(connectionInfo);
  context.res.json(connectionInfo);
};

export default httpTrigger;