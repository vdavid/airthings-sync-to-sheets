This is a project to sync data from my Airthings View Plus to Google Sheets.

[API docs](https://developer.airthings.com/docs/api-getting-started/index.html)

## Environment

Uses three inputs from script properties:

- airthingsClientId
- airthingsSecret
- airthingsDeviceSerialNumber

The target spreadsheet is [here](https://docs.google.com/spreadsheets/d/1y3qp7uxP7GzRiNmgdANNv1IOP5P37NU5ZL5JltOsM_A/edit#gid=0).

## Development

The TypeScript sources use namespaces and bundle into a single Apps Script file with esbuild (via `build.mjs` and `esbuild-gas-plugin`), then push with clasp. Node and clasp are both local: Node is pinned in `.mise.toml`, clasp is a dev dependency.

- `pnpm typecheck` checks types with `tsc --noEmit`.
- `pnpm build` bundles the sources into `dist/`.
- `pnpm push` builds, then pushes to Apps Script.
- `pnpm deploy` builds, pushes, and creates a new deployment.

Go to the [script](https://script.google.com/u/0/home/projects/1k7DPEZZyHuwebXdROXOx1cJvxSPXF0u-Jb9Qwp7lOCRxEE9ujhZLzxfX/edit) to run it.

## Troubleshooting

If getting the error message `Error retrieving access token: Error: invalid_grant`, use the command `clasp login`.