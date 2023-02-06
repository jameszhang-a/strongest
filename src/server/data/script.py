import json

# Load the JSON data from the file
with open("champions.json", "r") as file:
    data = json.load(file)

for champion in data["data"].values():
    del champion["version"]

# Convert the data field to a list of items
data["data"] = [{**value} for _, value in data["data"].items()]

# Write the updated JSON data to a new file
with open("champions_updated.json", "w") as file:
    json.dump(data, file, indent=4)
