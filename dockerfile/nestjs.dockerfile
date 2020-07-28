FROM ubuntu:focal

MAINTAINER GibsonKong <gibsonkong6871@gmail.com>

# Disable Post Installation
arg DEBIAN_FRONTEND=noninteractive
arg APT_INSTALL="apt install --no-install-recommends -y "

# Configure Time Zone & ENV
ENV TZ=Asia/Kuala_Lumpur
ENV NODE_ENV=development

# Update Apt Repo & Install Prerequisites
RUN apt update && $APT_INSTALL build-essential nginx openssl logrotate supervisor unzip curl wget cron ca-certificates rsyslog  inotify-tools

# Install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash


# Install Stable Node & NPM
RUN . /root/.bashrc && nvm install 10.19.0 && nvm use 10.19.0

# Install Npm Package
RUN . /root/.bashrc && npm install -g @nestjs/cli eslint

# Copy crontab & entrypoint
ADD crontab /etc/cron.d/crontab
ADD entrypoint.sh /entrypoint.sh

# Create Working DIR
WORKDIR /workspace

# Remove Package
RUN apt remove && apt autoremove && apt clean && apt autoclean && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/entrypoint.sh"]