#!/bin/bash
git add .
git commit --allow-empty -m "empty commit message"
git push

npm run build
firebase deploy