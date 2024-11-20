# Import libraries
import requests # HTTP interface
import json     # JSON interface

# HTTP headers
headers = {
    'Accept': 'application/json',
}

# Define URL
url = 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/USA_Wildfires_v1/FeatureServer/0/query?where=1%3D1&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&collation=&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token='

# Execute request and check if request is successful
response = requests.get(url, headers=headers)

# Get result
if response.status_code == 200:
    print('Request OK')

    # Retrieve list with JSON objects
    json_object_list = response.json()

    # Initialize GeoJSON structure
    geojson = {
        "type": "FeatureCollection",
        "features": []
    }

    # Extract features and convert to GeoJSON format
    for feature in json_object_list['features']:
        geojson_feature = {
            "type": "Feature",
            "geometry": feature['geometry'],
            "properties": feature['properties']
        }
        geojson['features'].append(geojson_feature)

    # Write GeoJSON to file
    with open('output.geojson', 'w', encoding='utf-8') as f:
        json.dump(geojson, f, ensure_ascii=False, indent=4)

    # Count number of objects
    aantal_json_objecten = len(json_object_list['features'])

    # Print total number
    print(f'Total number of features: {aantal_json_objecten}')

else:
    print(f'Request failed with error {response.status_code}')
