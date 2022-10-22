docker kill webtimegui || true
sleep 2
docker run -d --rm --network=host --name=webtimegui webtimegui:latest
 
