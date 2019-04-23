FROM node:11.14.0-alpine

COPY backend /app/backend
COPY frontend/dist /app/frontend

EXPOSE 27017

CMD ["/bin/sh","docker-run.sh"]