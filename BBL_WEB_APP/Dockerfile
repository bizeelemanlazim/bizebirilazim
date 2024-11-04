# Build aşaması: Node.js kullanarak kaynak kodları derliyoruz
FROM node:21-alpine AS build

# Çalışma dizinini belirliyoruz
WORKDIR /app

# package.json ve yarn.lock dosyalarını kopyalıyoruz (eğer npm kullanıyorsanız yarn.lock yerine package-lock.json)
COPY package.json yarn.lock ./

# Bağımlılıkları kuruyoruz
RUN yarn install --frozen-lockfile

# Tüm kaynak dosyaları kopyalıyoruz
COPY . .

# React uygulamasını build ediyoruz (statik dosyalar oluşturuluyor)
RUN yarn build

# Production aşaması: Nginx ile statik dosyaları sunmak için ikinci bir aşama
FROM nginx:alpine AS production

# Nginx'in varsayılan html dizinine build çıktılarını kopyalıyoruz
COPY --from=build /app/build /usr/share/nginx/html

# İsteğe bağlı: Nginx konfigürasyonunu özelleştirebilirsiniz (örneğin routing için)
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

# Nginx 80 portunu dinliyor olacak
EXPOSE 80

# Nginx'i başlatıyoruz
CMD ["nginx", "-g", "daemon off;"]
