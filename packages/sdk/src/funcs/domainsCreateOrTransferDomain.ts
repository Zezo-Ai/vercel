/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { VercelCore } from "../core.js";
import { encodeFormQuery, encodeJSON } from "../lib/encodings.js";
import * as M from "../lib/matchers.js";
import { safeParse } from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/httpclienterrors.js";
import { SDKError } from "../models/errors/sdkerror.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import {
  CreateOrTransferDomainRequest,
  CreateOrTransferDomainRequest$outboundSchema,
  CreateOrTransferDomainResponseBody,
  CreateOrTransferDomainResponseBody$inboundSchema,
} from "../models/operations/createortransferdomain.js";
import { Result } from "../types/fp.js";

/**
 * Register or transfer-in a new Domain
 *
 * @remarks
 * This endpoint is used for adding a new apex domain name with Vercel for the authenticating user. Can also be used for initiating a domain transfer request from an external Registrar to Vercel.
 */
export async function domainsCreateOrTransferDomain(
  client: VercelCore,
  request: CreateOrTransferDomainRequest,
  options?: RequestOptions,
): Promise<
  Result<
    CreateOrTransferDomainResponseBody,
    | SDKError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >
> {
  const parsed = safeParse(
    request,
    (value) => CreateOrTransferDomainRequest$outboundSchema.parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return parsed;
  }
  const payload = parsed.value;
  const body = encodeJSON("body", payload.RequestBody, { explode: true });

  const path = pathToFunc("/v5/domains")();

  const query = encodeFormQuery({
    "slug": payload.slug,
    "teamId": payload.teamId,
  });

  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const secConfig = await extractSecurity(client._options.bearerToken);
  const securityInput = secConfig == null ? {} : { bearerToken: secConfig };
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    operationID: "createOrTransferDomain",
    oAuth2Scopes: [],

    resolvedSecurity: requestSecurity,

    securitySource: client._options.bearerToken,
    retryConfig: options?.retries
      || client._options.retryConfig
      || { strategy: "none" },
    retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
  };

  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "POST",
    path: path,
    headers: headers,
    query: query,
    body: body,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return requestRes;
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    errorCodes: ["400", "401", "402", "403", "404", "409", "4XX", "500", "5XX"],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes,
  });
  if (!doResult.ok) {
    return doResult;
  }
  const response = doResult.value;

  const [result] = await M.match<
    CreateOrTransferDomainResponseBody,
    | SDKError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >(
    M.json(200, CreateOrTransferDomainResponseBody$inboundSchema),
    M.fail([400, 401, 402, 403, 404, 409, "4XX", 500, "5XX"]),
  )(response);
  if (!result.ok) {
    return result;
  }

  return result;
}
