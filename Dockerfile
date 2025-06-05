################### 1. Build stage ###################
FROM node:20-alpine AS builder
WORKDIR /app

# 1) 先装依赖以利用缓存
COPY package*.json ./
RUN npm ci --frozen-lockfile

# 2) 再复制其余源码
COPY . .

# 3) 用 node-server preset 构建
#    ❗️关键：确保会生成 .output/server/index.mjs
RUN NITRO_PRESET=node-server npm run build
#   或者
# RUN npx nuxi build --preset node-server

################### 2. Runtime stage ###################
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

# 只拷贝编译产物
COPY --from=builder /app/.output .output

EXPOSE 3000
# 如 package.json 里已有 "start": "node .output/server/index.mjs"
# 也可以直接  CMD ["npm","run","start"]
CMD ["node", ".output/server/index.mjs"]
