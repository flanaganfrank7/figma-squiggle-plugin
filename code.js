// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Receving the message from the click event to create squiggles. 
figma.ui.onmessage = msg => {
    if (msg.type === "create-squiggles") {
        const nodes = [];
        // Color input variables need to divided by 255 and redefined for use below
        const redInput = (msg.red/255);
        const greenInput = (msg.green/255);
        const blueInput = (msg.blue/255);
        // Create a squiggle X number of times, where X = msg.count
        for (let i = 0; i < msg.count; i++) {
            const vector = figma.createVector();
            // The below equation ensure that squiggles arent placed directly on top of one another
            vector.y = i * 300;
            // Assign stroke opacity a random value 
            vector.opacity = Math.random();
            vector.strokes = [
                // Use variables from above to get the stroke color
                { type: "SOLID", color: { r: redInput, g: greenInput, b: blueInput } }
            ];
            // Assign variable stroke weight between 0 - 10
            vector.strokeWeight = Math.random() * 10;
            figma.currentPage.appendChild(vector);
            vector.vectorPaths = [
                {
                    windingRule: "EVENODD",
                    // Create bunch of points, and bezier handle points in between marks and curves. 
                    data: "M " + (Math.random()*multiplier) + " " +
                        (Math.random()*multiplier) +
                        " C " + (Math.random()*multiplier) + " " + (Math.random()*multiplier) + " " + (Math.random()*multiplier) + " " + (Math.random()*multiplier) + " " + (Math.random()*multiplier) + " " + (Math.random()*multiplier) + " C " + (Math.random()*multiplier) + " " + (Math.random()*multiplier) + " " +
                        (Math.random()*multiplier) + " " +(Math.random()*multiplier) + " " + (Math.random()*multiplier) + " " + (Math.random()*multiplier) + ""
                }
            ];
            nodes.push(vector);
        }
        figma.currentPage.selection = nodes;
        // Refit Figma zoom level to show created squiggles regardless of size or quantity
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
