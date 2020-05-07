import 'source-map-support/register';
import { generateUploadUrl } from '../../BusinessLogic/TODO';

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  const uploadUrl = await generateUploadUrl(event);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      msg: "Signed URL created",
      uploadUrl
    })
  }
}
