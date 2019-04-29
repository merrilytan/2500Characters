FROM node:11.14.0-alpine

COPY backend /app/backend
COPY frontend/dist /app/frontend/dist
COPY docker-run.sh /app/

EXPOSE 27017

CMD ["/bin/sh","/app/docker-run.sh"]