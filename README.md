## Documentation

Documentation hosted in project's wiki: https://github.com/Seventty/leaflet-x/wiki

## Docker + Nginx

Build and run the Angular app served by Nginx:

```bash
docker compose up --build
```

The application will be available at:

```text
http://localhost:8083
```

The image uses a multi-stage build:

- `node:14.21.3-bullseye` builds the Angular 12 app with `npm run build:app`.
- `nginx:1.25-alpine` serves `dist/leaflet-x-legacy` from `/usr/share/nginx/html`.
