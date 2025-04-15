# News Aggregator

## Architecture

![App Architecture](https://github.com/SunM1sty/news-aggregator/assets/71171622/b3d084cc-cb52-4f3b-8d83-e12dec53f015)
![State Architecture](https://github.com/SunM1sty/news-aggregator/assets/71171622/3d1263f3-5f74-44a7-a4ed-efab969c5626)

## Install

Requirements:

- Docker & docker-compose
- Git
- Node.js (v18)

1) Clone repo

2) Without docker:

```
npm ci

# For Development
npm run dev

# For Production
npm run build
npm run start

# Static Project
npm run generate
```

3) With docker and docker-compose:

- On linux: if you dont't add docker/docker-compose package as super user, you should use **sudo**

```
sudo docker-compose up / docker-compose up
```
