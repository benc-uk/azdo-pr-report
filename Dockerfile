FROM hayd/alpine-deno:1.4.4

WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

ADD *.ts ./
ADD lib ./lib
ADD views ./views
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache server.ts

USER deno
EXPOSE 3000
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "server.ts"]