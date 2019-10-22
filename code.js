// Show the UI modal on running the plugin
figma.showUI(__html__);
// Resize the modal to 300x240
figma.ui.resize(300, 450);
// Interpret the message that we're sending over from the click event in the UI
figma.ui.onmessage = msg => {
    ///////
    // If the message is 'create-squiggle' then run the squiggle building
    if (msg.type === "create-squiggles") {
        const nodes = [];
        // Run this loop i times where i is equal to the user count input
        for (let i = 0; i < msg.count; i++) {
            // ---------------------
            // BEGIN SVG BUILDER
            // ---------------------
            // This array is going to hold the entire set of coords for each individual squiggle
            let array = [];
            let multValue = 1000;
            // Interpret complexity form user complexity input
            let complexity = msg.comp;
            // This pushes the initial marker down into the array for the SVG coordinates
            array.push("M");
            // This build a random set of coordinates for where the initial marker down should occur
            for (let m = 0; m < 2; m++) {
                let rando = Math.random() * multValue;
                array.push(rando);
            }
            // This builds a set of curve coordinates x times where x is equal to user complexity input
            for (let x = 0; x < complexity; x++) {
                // This pushes the C into the array for curves in the SVG coordinates
                array.push("C");
                // The are 3 sets of coordinates in an SVG curve 
                // The first two coordinates are where the point lands 
                // The second two sets are each the coordinates of where the bezier handles should land
                for (let c = 0; c < 6; c++) {
                    let rando = Math.random() * multValue;
                    array.push(rando);
                }
            }
            // joinArray brings all of the coordinates together, removing commas and adding a space between index values
            let joinArray = array.join(" ");
            console.log(joinArray);
            // strinArray turns joinArray into a string
            let stringArray = joinArray.toString();
            // ---------------------
            // END SVG BUILDER
            // ---------------------
            const vector = figma.createVector();
            // This spaces the created squiggles out across the y-axis
            vector.y = i * 500;
            // Set random opacity per squiggle
            vector.opacity = Math.random();
            // Set the default stroke color
            vector.strokes = [{ type: "SOLID", color: { r: .1568, g: 0.1568, b: 0.7412 } }];
            // Set random stroke weight per squiggle
            vector.strokeWeight = Math.random() * 10;
            figma.currentPage.appendChild(vector);
            vector.vectorPaths = [
                {
                    windingRule: "EVENODD",
                    // Set dats equal to the coords generated for the squiggle (ie joinArray) 
                    data: "" + joinArray + ""
                }
            ];
            nodes.push(vector);
        }
        // Select the newly created squiggles
        figma.currentPage.selection = nodes;
        // Fit the viewport to include the select (ie the Squiggles)
        figma.viewport.scrollAndZoomIntoView(nodes);
        figma.closePlugin();
    }
    // Close the plugin
};
