echo "== frontend:"
wget -q -O- http://frontend:3000/ | head -3
echo ""
echo "== api:"
wget -q -O- --post-data='{"query":"{shop{name}}"}' --header='Content-Type: application/json' http://api-proxy:8000/graphql/
echo ""
echo done
