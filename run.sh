cd ./connectors

for f in *.zip; do
    unzip -o "$f"
    # Duyệt qua từng thư mục vừa được giải nén
    for d in */; do
        # Kiểm tra xem thư mục có chứa lib/*.jar không
        if [ -d "$d/lib" ]; then
            mv "$d/lib/"*.jar .
        fi
        # Xóa thư mục đã giải nén
        rm -rf "$d"
    done
done

cd ../

docker compose -f docker-compose-all.yml up -d

echo '\i /tmp/sql/init.sql' | docker exec -i postgres psql -U app
