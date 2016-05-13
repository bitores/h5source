/** js
 * @apiDefine CODE_200
 * @apiSuccess (Reponse 200) {number} code 200
 * @apiSuccess (Reponse 200) {json} [data='""'] 如果有数据返回
 * @apiSuccessExample {json} Response 200 Example
 *   HTTP/1.1 200 OK
 *   {
 *     "code": 200,
 *     "data": ""
 *   }
 */


function a(){}


/**
 * @apiDefine CODE_500
 * @apiSuccess (Response 500) {number} code 500
 * @apiSuccess (Response 500) {string} [message] error description
 * @apiSuccessExample {json} Response 500 Example
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "code": 500
 *     "message": "xxx"
 *   }
 */


 function b(){}

 /**
 * @apiDefine Data
 *
 * @apiParam (data) {string} [firstname]  Optional Firstname of the User.
 * @apiParam (data) {string} lastname     Mandatory Lastname.
 * @apiParam (data) {string} country="cn" Mandatory with default value "DE".
 * @apiParam (data) {number} [age=18]     Optional Age with default 18.
 */

/**
 * @api {POST GET} /api/test/hello[/:id] /api/test/hello[/:id]
 * @apiName test api
 * @apiGroup Hello World
 * @apiVersion 1.0.0
 * @apiDescription just a test
 * @apiPermission anyone
 * @apiSampleRequest http://test.github.com
 *
 * @apiParam {number} [id] any id
 * @apiParam {json} data object
 * @apiUse Data
 *
 * @apiParamExample {json} Request Example
 *   POST /api/test/hello/1
 *   {
 *     "data": {
 *       "firstname": "test",
 *       "lastname": "sails",
 *       "country": "cn"
 *     }
 *   }
 *
 * @apiUse CODE_200
 * @apiUse CODE_500
 */