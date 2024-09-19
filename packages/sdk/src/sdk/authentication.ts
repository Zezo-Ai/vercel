/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { authenticationLogin } from "../funcs/authenticationLogin.js";
import { authenticationVerify } from "../funcs/authenticationVerify.js";
import { ClientSDK, RequestOptions } from "../lib/sdks.js";
import {
  EmailLoginRequestBody,
  EmailLoginResponseBody,
} from "../models/operations/emaillogin.js";
import {
  VerifyTokenRequest,
  VerifyTokenResponseBody,
} from "../models/operations/verifytoken.js";
import { unwrapAsync } from "../types/fp.js";

export class Authentication extends ClientSDK {
  /**
   * Login with email
   *
   * @remarks
   * Request a new login for a user to get a token. This will respond with a verification token and send an email to confirm the request. Once confirmed you can use the verification token to get an authentication token.
   */
  async login(
    request?: EmailLoginRequestBody | undefined,
    options?: RequestOptions,
  ): Promise<EmailLoginResponseBody> {
    return unwrapAsync(authenticationLogin(
      this,
      request,
      options,
    ));
  }

  /**
   * Verify a login request to get an authentication token
   *
   * @remarks
   * Verify the user accepted the login request and get a authentication token. The user email address and the token received after requesting the login must be added to the URL as a query string with the names `email` and `token`.
   */
  async verify(
    request: VerifyTokenRequest,
    options?: RequestOptions,
  ): Promise<VerifyTokenResponseBody> {
    return unwrapAsync(authenticationVerify(
      this,
      request,
      options,
    ));
  }
}