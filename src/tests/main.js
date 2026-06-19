import {env} from '../config/environment.js';
import {profile} from '../config/profiles.js';
import {intras} from '../data/loader.js';
import {htmlReport} from '../lib/k6-reporter-3.0.4.js';
import {textSummary} from '../lib/k6-summary-0.1.0.js';
import {check, group} from 'k6';
import http from 'k6/http';

export const options = profile;

export function setup() {
  const payload = {
    scope: 'trade-gateway-resource-srv/access',
    sub: 'test-intra-reader',
  };

  const params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const res = http.post(env.tokenUrl, payload, params);

  check(res, {
    'is status 200': (r) => r.status === 200,
    'has access_token': (r) =>
      Object.prototype.hasOwnProperty.call(r.json(), 'access_token'),
  });

  const token = res.json().access_token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
}

export function tradeGateway(data) {
  group('get single intra', function () {
    const res = http.get(`${env.serviceUrl}/certificates/intras/${intras[0]}`, {
      headers: data.headers,
    });

    check(res, {
      'is status 200': (r) => r.status === 200,
      'contains specified reference': (r) =>
        r.json().exchangedDocument.identifier === intras[0],
    });
  });
}

export function handleSummary(data) {
  return {
    './reports/index.html': htmlReport(data),
    './reports/summary.json': JSON.stringify(data),
    stdout: textSummary(data, {indent: ' ', enableColors: true}),
  };
}
