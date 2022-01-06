FROM asciidoctor/docker-asciidoctor

# Rather than hack around with rebuilding the asciidoctor-diagram plugin, let's
# just replace a plugin we're not going to use
RUN apk del graphviz && \
    apk add npm --no-cache

RUN mkdir /bogala
COPY package.json package-lock.json /bogala/
RUN cd /bogala && npm install .

# Add the code which changes often during development
COPY notdot /usr/bin/dot
COPY main-node.js bogala-lib.js /bogala/
