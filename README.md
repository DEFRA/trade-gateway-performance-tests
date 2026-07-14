# trade-gateway-performance-tests

Performance tests for Trade Gateway services.

- [trade-gateway](https://github.com/DEFRA/trade-gateway)
- [trade-gateway-publisher](https://github.com/DEFRA/trade-gateway-publisher)

## Test strategy

See [Confluence](#) for more information.

### Test types

Execute different types of tests to achieve different goals:

- **Smoke**: verify user journey(s) function under minimal load.
- **Load**: asses how the system performs under typical (average) load.
- **Stress**: assess how the system performs under heavier (than average) load.
- **Spike**: verify whether the system survives and performs under sudden and massive load.

### Expected volume of traffic

See [non-functional requirements](#) for more information.

| System | Journey | Expected volume (per day) |
| ------ | ------- | ------------------------- |
| tbd    | tbd     | tbd                       |

## Prerequisites

### Dependencies

Install the following:

- [Node.js (npm)](https://nodejs.org/en/download)
- [k6](https://k6.io/)
- [Docker](https://docs.docker.com/engine/) (optional)

### Environment variables

#### Configuration

| Environment variable | Description                                                                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENVIRONMENT`        | Environment to run tests in. Default `local`.                                                                                                |
| `PROFILE`            | Test profile to be executed. Default `smoke`.                                                                                                |
| `PRE_ALLOCATED_VUS`  | Number of virtual users to initialize to meet target iteration rate. Default `1` for load test profile, default `3` for stress test profile. |
| `STRESS_FACTOR`      | Factor to multiply average load by for stress test. Default `100`.                                                                           |
| `SPIKE_VUS`          | Number of virtual users to ramp up to for spike test. Default `100`.                                                                         |

### Services

See [trade-gateway-local-environment](https://github.com/DEFRA/trade-gateway-local-environment) for instructions.

## Tests

### Local

Build as follows:

```bash
npm install
```

Run as follows:

```bash
npm test
```

The test report is available from the `reports` directory. See [reports](./reports/index.html) in your browser.

### Docker

Build as follows:

```bash
docker build . -t trade-gateway-performance-tests
```

Run as follows:

```bash
docker run -it --rm --net=host \
  -e S3_ENDPOINT='http://localhost:4566' \
  -e RESULTS_OUTPUT_S3_PATH='s3://reports' \
  -e AWS_ACCESS_KEY_ID='test' \
  -e AWS_DEFAULT_REGION='eu-west-2' \
  -e AWS_SECRET_ACCESS_KEY='test' \
  -e AWS_SECRET_KEY='test' \
  -e AWS_REGION='eu-west-2' \
  trade-gateway-performance-tests
```

The test report is available from the `reports` S3 bucket. See [s3://reports](http://localhost:4566/reports/index.html) in your browser.

## Linting and formatting

[ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) are used for linting and formatting.

Format all project files as follows:

```bash
npm run format
```

Fix linting of all project files as follows:

```bash
npm run lint:fix
```

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
