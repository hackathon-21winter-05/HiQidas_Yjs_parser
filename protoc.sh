#!/bin/bash

# .proto ファイルが入っている GitHub 上のフォルダ
sourceDir="https://github.com/hackathon-21winter-05/HiQidas/tree/main/protobuf"
# 生成したいコード格納フォルダ
distDir="./src/pb"

rm -rf ${distDir}

baseDir="./${sourceDir##*/}"
dlDir="${sourceDir/"tree/main"/"trunk"}"
svn export ${dlDir} ${baseDir} --force

mkdir -p "${distDir}"
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out="${distDir}" --ts_proto_opt=oneof=unions --ts_proto_opt=esModuleInterop=true ${baseDir}/parser/*.proto

rm -rf "${baseDir}"
