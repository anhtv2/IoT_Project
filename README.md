- Create environment file (sample provided)
- Unzip the connectors.zip file in *connectors* folder then move the *lib* folder (the ones containing .jar files) to the *connectors* folder
- Start all services:
```
docker compose -f docker-compose-minimal.yml up -d
```
- Insert data into postgres:
```
docker exec -it postgres psql -U app
\i /tmp/sql/init.sql;
```
- Start Kafka Connectors:
```
docker exec -it kafka-connect bash
curl -i -X POST -H "Content-Type: application/json" -d @/connectors/jdbc-source-connect-vehicle.json http://localhost:8083/connectors
curl -i -X POST -H "Content-Type: application/json" -d @/connectors/jdbc-source-connect-activity-log.json http://localhost:8083/connectors
curl -i -X POST -H "Content-Type: application/json" -d @/connectors/jdbc-sink-connect.json http://localhost:8083/connectors
curl -i -X POST -H "Content-Type: application/json" -d @/connectors/redis-sink-connect.json http://localhost:8083/connectors
```
**Note**: You might have to wait for kafka connect to start