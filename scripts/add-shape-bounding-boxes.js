const fs = require('fs');
const path = require('path');
const getBoundingBox = require('svg-path-bounding-box');

function computeBoundingBox(svgPath) {
    const bbox = getBoundingBox(svgPath);
    return {
        x1: bbox.x1,
        y1: bbox.y1,
        x2: bbox.x2,
        y2: bbox.y2
    };
}

function addBoundingBoxesToLocations(jsonData) {
    jsonData.locations.forEach(location => {
        const svgPath = location.path;
        try {
            const boundingBox = computeBoundingBox(svgPath);
            location.boundingbox = boundingBox;
        } catch (error) {
            console.error(`Error processing location ID ${location.id}: ${error.message}`);
        }
    });
    return jsonData;
}

// Get the input file path from the command line arguments
const inputFilePath = process.argv[2];
if (!inputFilePath) {
    console.error('Please provide the input file path as an argument.');
    process.exit(1);
}

// Read the JSON data from the input file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
    }
    const jsonData = JSON.parse(data);

    // Add bounding boxes to locations
    const updatedData = addBoundingBoxesToLocations(jsonData);

    // Construct the output file path
    const { dir, name, ext } = path.parse(inputFilePath);
    const outputFilePath = path.join(dir, `${name}-with-bbox${ext}`);

    // Save the updated JSON data to the output file
    fs.writeFile(outputFilePath, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(`Error writing file: ${err.message}`);
            process.exit(1);
        }
        console.log(`Updated JSON file saved to ${outputFilePath}.`);
    });
});
