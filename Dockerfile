# ----------------------------
# build from source
# ----------------------------
FROM node:18 AS build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# ----------------------------
# run with nginx
# ----------------------------
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist/football-management-team-ui /usr/share/nginx/html

EXPOSE 80
