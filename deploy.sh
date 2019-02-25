#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'update docs'

git push -f git@github.com:zlc140@163.com/zlc140.github.io.git master:gh-pages

cd -