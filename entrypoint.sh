#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
  npm run dev
else
  npm run preview
fi
