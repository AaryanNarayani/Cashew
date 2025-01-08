class ApiResponse {
  /**
   *
   * @param {number} statusCode
   * @param {any} data
   * @param {string} message
   */
  statusCode: number;
  data: any;
  message: string;
  success: boolean;

  constructor(statusCode:number, data:any, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export {ApiResponse};
