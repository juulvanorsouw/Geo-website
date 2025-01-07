import requests
import psycopg2
import json

# Load the password manually from the .env file
def load_env():
    with open('.env', 'r') as file:
        lines = file.readlines()
        env_vars = {}
        for line in lines:
            key, value = line.strip().split('=')
            env_vars[key] = value
    return env_vars

# Load environment variables
env_vars = load_env()
pgadmin_password = env_vars.get('PGADMINPASSWORD')

# Open database connection
conn = psycopg2.connect(f"host=localhost dbname=wildfire_us user=postgres password={pgadmin_password} port=5432")
cur = conn.cursor()

# Create the table if it doesn't exist
create_table_query = '''
    CREATE TABLE IF NOT EXISTS public.current_wildfire (
        DailyAcres FLOAT,  -- Add DailyAcres column
        IncidentName VARCHAR(255),  -- Add IncidentName column
        IncidentTypeCategory VARCHAR(100),  -- Add IncidentTypeCategory column
        geom GEOMETRY(Point, 4326)
    );
'''

# Execute the table creation query
cur.execute(create_table_query)
conn.commit()

# HTTP headers
headers = {
    'Accept': 'application/json',
}

# Define URL
url = 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/ArcGIS/rest/services/USA_Wildfires_v1/FeatureServer/0/query?where=1%3D1&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&outFields=*&returnGeometry=true&f=pgeojson'

# Execute request and check if successful
response = requests.get(url, headers=headers)

# Get result
i = 0
if response.status_code == 200:
    print('Request OK')

    # Parse JSON response
    json_object_list = response.json()

    # Write to file to check output from request (optional)
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(json_object_list, f, ensure_ascii=False, indent=4)

    # Insert data into the database
    for feature in json_object_list['features']:
        properties = feature['properties']
        geom = feature['geometry']

        # Example: Extract key properties (adjust to match your schema)
        DailyAcres = properties.get('DailyAcres')
        IncidentName = properties.get('IncidentName')
        IncidentTypeCategory = properties.get('IncidentTypeCategory')
        longitude, latitude = geom['coordinates'] if geom['type'] == 'Point' else (None, None)

        # Construct SQL insert statement
        try:
            sql_insert = '''
                INSERT INTO public.current_wildfire (DailyAcres, IncidentName, IncidentTypeCategory, geom)
                VALUES (%s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326))
            '''
            cur.execute(sql_insert, (DailyAcres, IncidentName, IncidentTypeCategory, longitude, latitude))
            conn.commit()
            i += 1
        except Exception as e:
            print(f'Insert failed with error: {e}')
            conn.rollback()

# Close database connection
print(f'{i} rows inserted')
cur.close()
conn.close()
