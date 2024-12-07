sudo rm -rf .redis_data 
sudo rm -rf db_data

docker compose down
docker compose up -d

# echo '\i /tmp/sql/init.sql' | docker exec -i postgres psql -U app
