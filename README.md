tippecanoe -o public/points.mbtiles -Z1 -z18 public/points.json -pC -f -r1 -pk -pf
tippecanoe -o public/buildings.mbtiles -Z1 -z18 -pC -f -r1 -pk -pf -L'{"file":"public/polygons.json", "layer":"polygons"}' -L'{"file":"public/buildings.json", "layer":"buildings"}'
