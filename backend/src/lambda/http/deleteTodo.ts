import 'source-map-support/register';
import { deleteTodo } from '../../BusinessLogic/TODO';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Remove a TODO item by id
  const deleted_item = await deleteTodo(event);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ msg: "TODO item deleted.", deleted: deleted_item })
  }
}
