/**
 * Copyright (c) 2019 Sandy Ganz,  Portions (c) 2016 Iain Hibbert.
 * All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose with or without fee is hereby granted, provided
 * that the above copyright notice and this permission notice appear
 * in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS
 * ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO
 * EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
 * ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
 * OF THIS SOFTWARE.
 *
 * CrankWheel -  A crankshaft wheel generator that accepts many
 *               parameters to configure a wheel for computer
 *               control of your engine. The wheel generated
 *               is used for engine position indication to the
 *               engine management system. Many different configurations,
 *               and sizes are used. This will help generate them and
 *               then finally modify in QCAD.
 *
 *
 * Make changes, fork, or open a Pull Request and I'll integrate any changes
 *
 * You can find QCAD at www.qcad.org
 *
 * Installation - Find your QCAD install directory, look for 'libraries/default' copy
 * the folder that is typically called 'CrankWheel' in the Github repository (can extract as a zip)
 * and restart QCAD it should now show up in your library browser.
 */

function CrankWheel() {
}

// Set up default values, all angle in DEGREES. Most defaults
// get loaded from the UI, these are just in case needed for
// things like drawing the preview

CrankWheel.wheelDiameter = 6.75;
CrankWheel.numberOfTeeth = 12;
CrankWheel.missingTeeth = 0;
CrankWheel.toothHeight = 0.25;
CrankWheel.centerHoleDiameter = 1.0;
CrankWheel.boltHoleCount = 3;
CrankWheel.boltHoleCircleDiameter = 2.5;
CrankWheel.boltHoleDiameter = 0.375;
CrankWheel.boltPatternRotate = 0;
CrankWheel.boltHoleCount2 = 0;
CrankWheel.boltHoleCircleDiameter2 = 4.0;
CrankWheel.boltHoleDiameter2 = 0.375;
CrankWheel.boltPatternRotate2 = 60;
CrankWheel.numberOfSpokes = 0;
CrankWheel.spokeRatio = 1.0;
CrankWheel.spokeInnerDiameter = 4.0;
CrankWheel.spokeOuterDiameter = 5.0;
CrankWheel.showLegend = true;
CrankWheel.showDebug = false;
CrankWheel.drawRoundedRoots = true;

CrankWheel.prototype.toString = function () {
    print("CrankWheel.js:", "toString(): ");
}

// Build a string for the legend. This uses the class vars
CrankWheel.getLegendStr = function () {
    var t = "";
    t += "Wheel Diameter       : " + CrankWheel.wheelDiameter + "\n"
    t += "Tooth Count          : " + CrankWheel.numberOfTeeth + "\n";
    t += "Missing Teeth        : " + CrankWheel.missingTeeth + "\n";
    t += "Tooth Height         : " + CrankWheel.toothHeight + "\n";
    t += "Center Hole Diameter : " + CrankWheel.toothHeight + "\n";
    t += "Number of Spokes     : " + CrankWheel.numberOfSpokes + "\n";
    t += "Number of Spokes     : " + CrankWheel.numberOfSpokes + "\n";
    t += "Spoke Ratio          : " + CrankWheel.spokeRatio + "\n";
    t += "Bolt Hole Pattern 1" + "\n";
    t += "  Bolt Hole Count           : " + CrankWheel.boltHoleCount + "\n";
    t += "  Bolt Hole Circle Diameter : " + CrankWheel.boltHoleCircleDiameter + "\n";
    t += "  Bolt Hole Diameter        : " + CrankWheel.boltHoleDiameter + "\n";
    t += "  Bolt Pattern Rotate       : " + CrankWheel.boltPatternRotate + "\n";
    t += "Bolt Hole Pattern 2" + "\n";
    t += "  Bolt Hole Count           : " + CrankWheel.boltHoleCount2 + "\n";
    t += "  Bolt Hole Circle Diameter : " + CrankWheel.boltHoleCircleDiameter2 + "\n";
    t += "  Bolt Hole Diameter        : " + CrankWheel.boltHoleDiameter2 + "\n";
    t += "  Bolt Pattern Rotate       : " + CrankWheel.boltPatternRotate2 + "\n";
    return t;
}

// Set up any needed start up 'stuff'. Right
// now grabs the match CrankWheel.ui and loads
// the XML for the data entry form
CrankWheel.init = function (formWidget) {
    if (!isNull(formWidget)) {
        CrankWheel.widgets = getWidgets(formWidget);
    }
};

// Generate the CrankWheel for QCAD, this takes
// the document interface (di) and uses that for setting up
// all drawing. Not using the file.
CrankWheel.generate = function (di, file) {

    // if not specified all numeric inputs are of RMathLineEdit class
    // which can't be edited in the Qt Designer as a side note.
    // Also any missing widgets will fail and cause no drawing!

    var v = CrankWheel.widgets["WheelDiameter"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.wheelDiameter = v.getValue();

    // QSpinBox
    CrankWheel.numberOfTeeth = CrankWheel.widgets["NumberOfTeeth"].value;

    // QSpinBox
    CrankWheel.missingTeeth = CrankWheel.widgets["MissingTeeth"].value;

    v = CrankWheel.widgets["ToothHeight"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.toothHeight = v.getValue();

    v = CrankWheel.widgets["CenterHoleDiameter"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.centerHoleDiameter = v.getValue();

    // QCheckBox
    CrankWheel.drawRoundedRoots = CrankWheel.widgets["DrawRoundedRoot"].checked;

    // QSpinBox
    CrankWheel.numberOfSpokes = CrankWheel.widgets["NumberOfSpokes"].value;

    v = CrankWheel.widgets["SpokeRatio"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.spokeRatio = v.getValue();

    v = CrankWheel.widgets["SpokeInnerDiameter"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.spokeInnerDiameter = v.getValue();

    v = CrankWheel.widgets["SpokeOuterDiameter"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.spokeOuterDiameter = v.getValue();

    // QSpinBox
    CrankWheel.boltHoleCount = CrankWheel.widgets["BoltHoleCount"].value;

    v = CrankWheel.widgets["BoltHoleCircleDiameter"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.boltHoleCircleDiameter = v.getValue();

    v = CrankWheel.widgets["BoltHoleDiameter"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.boltHoleDiameter = v.getValue();

    v = CrankWheel.widgets["BoltPatternRotate"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.boltPatternRotate = v.getValue();

    // QSpinBox
    CrankWheel.boltHoleCount2 = CrankWheel.widgets["BoltHoleCount2"].value;

    v = CrankWheel.widgets["BoltHoleCircleDiameter2"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.boltHoleCircleDiameter2 = v.getValue();

    v = CrankWheel.widgets["BoltHoleDiameter2"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.boltHoleDiameter2 = v.getValue();

    v = CrankWheel.widgets["BoltPatternRotate2"];
    if (!v.isValid()) {
        return undefined;
    }
    CrankWheel.boltPatternRotate2 = v.getValue();


    // QCheckBox
    CrankWheel.showLegend = CrankWheel.widgets["ShowLegend"].checked;

    // QCheckBox
    CrankWheel.showDebug = CrankWheel.widgets["ShowDebug"].checked;

    // At this point generate the wheel. Prior to this
    // some validation could be done to prevent invalid
    // wheels due to params.

    return CrankWheel.getOperation(di);
}

// Called to display the small icon of the wheel. Default
// params are just used, may be better to reset them here,
// always but may not matter (user changes var in the class etc.)
CrankWheel.generatePreview = function (di, iconSize) {

    // Save the legend state so we can disable it for the preview
    var saveLegendState = CrankWheel.showLegend;
    CrankWheel.showLegend = false;
    var ret = CrankWheel.getOperation(di);
    CrankWheel.showLegend = saveLegendState;

    return ret;
}

// Helper Funcs

// Translate a point around a center circle at a specific distance
// Likely a built in function in QCAD but this works, could
// validate if point is an array of 2 co-ordinates etc.
function translatePoint(point, angle, unit) {
    var x = point[0];
    var y = point[1];
    var rad = RMath.deg2rad(angle);	// RMath is from QCAD

    // By doing it this way instead of x = unit*Math.cos(rad);
    // this allows positive direction upwards from zero
    // This is translating a point around the origin

    x += unit * Math.sin(rad);
    y += unit * Math.cos(rad);

    return [x, y];	// the translated point
}

// create array of bolt holes formed in a circle about a point 0,0
// Returns an array of RCircleEntity's or empty if nothing to do
function generateBoltPattern(boltCount, angleOffset, circleDiameter, boltDiameter) {

    var boltPattern = [];

    // Reject some things if needed
    if (boltCount < 0.0 || circleDiameter < 0.0 || boltDiameter < 0.0) {
        return boltPattern;
    }

    for (var cnt = 0; cnt < boltCount; cnt++) {
        var newPt = translatePoint([0, 0], angleOffset, circleDiameter / 2.0);
        boltPattern.push(new RCircleData(new RVector(newPt), boltDiameter / 2.0));
        angleOffset += 360.0 / boltCount;
    }

    return boltPattern;
}

// Does all the drawing work. Remember most things here just add points (vertices)
// to an array for drawing. Drawing is closed so should alway be a closed surface for
// the wheel.
CrankWheel.getOperation = function (di) {
    var addOperation = new RAddObjectsOperation(false);

    const center = new RVector();
    const wheelRadius = CrankWheel.wheelDiameter / 2.0;
    const pitchCircleDiameter = CrankWheel.wheelDiameter - (2.0 * CrankWheel.toothHeight);
    const pitchCircleRadius = pitchCircleDiameter / 2.0;
    const centerHoleRadius = CrankWheel.centerHoleDiameter / 2.0;

    // di is the interface not the doc, so get the doc as we need that
    var document = di.getDocument();

    // Draw the center of the wheel if not 0
    if (centerHoleRadius) {
        var centerHoleData = new RCircleData(center, centerHoleRadius);
        addOperation.addObject(new RCircleEntity(document, centerHoleData));
    }

    // now the first bolt pattern
    generateBoltPattern(
        CrankWheel.boltHoleCount,
        CrankWheel.boltPatternRotate,
        CrankWheel.boltHoleCircleDiameter,
        CrankWheel.boltHoleDiameter).forEach(
            function (hole) {
                addOperation.addObject(new RCircleEntity(document, hole));
            }
        );

    // now the second
    generateBoltPattern(
        CrankWheel.boltHoleCount2,
        CrankWheel.boltPatternRotate2,
        CrankWheel.boltHoleCircleDiameter2,
        CrankWheel.boltHoleDiameter2).forEach(
            function (hole) {
                addOperation.addObject(new RCircleEntity(document, hole));
            }
        );

    // storage for the points to draw tooths and the missing-toothed parts

    var td = [];    // tooth data user selected bulge
    var mtd = [];   // missing tooth data all nice lower arc
    var ltd = [];   // last tooth IF bulge root is selected

    // Draws the tooth start points, same for both on the inner (pitchCircle)
    // and the outer. td - Outer teeth, mtd - outer missing parts
    td.push([pitchCircleRadius, 0, 0]);
    ltd.push([pitchCircleRadius, 0, 0]);
    mtd.push([pitchCircleRadius, 0, 0]);

    // This draws the top of the tooth's arch and the inner missing
    // arch which is later used IF missing teeth are specified
    const toothAngle = 2.0 * Math.PI / CrankWheel.numberOfTeeth;
    const outsideAngle = 0;
    const outsideBulge = Math.tan(((toothAngle / 2) - (outsideAngle * 2)) / 4);
    td.push([wheelRadius, outsideAngle, outsideBulge]);
    ltd.push([wheelRadius, outsideAngle, outsideBulge]);
    mtd.push([pitchCircleRadius, outsideAngle, outsideBulge]);  // save the pattern for the bottom (root) not a top

    // Draw the back side of the tooth point, lower point down
    td.push([td[1][0], (toothAngle / 2) - td[1][1], 0]);
    ltd.push([td[1][0], (toothAngle / 2) - td[1][1], 0]);

    // This is the bottom gulley (root) of each tooth. Will be the
    // same for regular tooth or missing tooth
    const rootBulge = Math.tan(((toothAngle / 2) - td[0][1]) / 4);

    // Bulge notes
    // Setting the rootBulge in td to -1 will do the perfect semi-circle on the
    // bottom of the tooth. However the last tooth then has a semi-circle to the
    // mtd lower radius arc which is odd. So for the last td tooth, it needs to be
    // swapped with a pattern of regular tooth, regular radius bulge so
    // it can align to the missing tooth root. If no missing tooth, nothing needs
    // to be done as all the bulges at -1  will be fine.

    var userBulge = CrankWheel.drawRoundedRoots ? userBulge = -1.0 : rootBulge;
    var noMissingBulge = CrankWheel.missingTeeth > 0 ? rootBulge : userBulge;

    td.push([td[0][0], (toothAngle / 2) - td[0][1], userBulge]);
    ltd.push([td[0][0], (toothAngle / 2) - td[0][1], noMissingBulge]);
    mtd.push([td[0][0], (toothAngle / 2) - td[0][1], rootBulge]);

    // Construct the wheel here with teeth as previously created.
    // will need to swap teeth with other missing teeth when count > number of teeth - missing teeth.
    //
    // Roll through the list of teeth and when at the point where we need missing
    // teeth draw that area. Now construct

    wheel = new RPolyline();
    wheel.setClosed(true);
    for (var i = 0; i < CrankWheel.numberOfTeeth; i++) {

        // logic here might be if a missing tooth cnt > 0 always the last tooth is drawn with
        // a regular arc (bulge), then the mtd will always connect. Might go with td, mtd, ltd (last tooth)
        // when assembling the array, and pick which is needed based on settings and missing tooth.
        // Also last tooth may always be OK to have with regular arcs

        // if numberOfTeeth - missingTeeth - 1 draw as normal
        // else if numberOfTeeth - missingTeeth draw as final tooth with normal arc (not bulge)
        // else draw the mtd to wrap it all up.

        // Draw each complete tooth here, or missing tooth depending on count
        if (i < CrankWheel.numberOfTeeth - CrankWheel.missingTeeth - 1) {
            for (var n = 0; n < td.length; n++) {
                wheel.appendVertex(RVector.createPolar(td[n][0], (i * toothAngle) + td[n][1]), td[n][2]);
            }
        }
        else if (i < CrankWheel.numberOfTeeth - CrankWheel.missingTeeth) {
            // last tooth before missing teeth if any, won't be here otherwise
            for (var j = 0; j < ltd.length; j++) {
                wheel.appendVertex(RVector.createPolar(ltd[j][0], (i * toothAngle) + ltd[j][1]), ltd[j][2]);
            }
        } else {
            // only will be here if Missing any teeth
            // draw missing parts typically 3 for each missing tooth
            for (var j = 0; j < mtd.length; j++) {
                wheel.appendVertex(RVector.createPolar(mtd[j][0], (i * toothAngle) + mtd[j][1]), mtd[j][2]);
            }

        }
    }

    addOperation.addObject(new RPolylineEntity(document, new RPolylineData(wheel)));

    // Make spokes/slots. A nice enhancement would be to do this will
    // fillets on the edges instead of angles to make is smoother
    // looking. Easy to do in QCAD, not sure how to do here just yet.
    // Some math involved from Iain's original work. I'm bad with math
    // so someone may have to help here if generating different shapes
    // or smoother corners.

    // Check for a few odd conditions to ensure will draw OK

    if (CrankWheel.numberOfSpokes > 0) {
        {
            var spokeAngle = 2 * Math.PI / CrankWheel.numberOfSpokes;

            // inner spoke hole line
            var r0 = CrankWheel.spokeInnerDiameter / 2.0;
            var a0 = Math.asin(CrankWheel.spokeRatio / (r0 * 2));

            // outer spoke hole line
            var r1 = CrankWheel.spokeOuterDiameter / 2.0;
            var a1 = Math.asin(CrankWheel.spokeRatio / (r1 * 2));

            var hole = new RPolyline();
            hole.setClosed(true);

            hole.appendVertex(RVector.createPolar(r0, spokeAngle - a0), Math.tan((2 * a0 - spokeAngle) / 4));
            hole.appendVertex(RVector.createPolar(r0, a0));
            hole.appendVertex(RVector.createPolar(r1, a1), Math.tan((spokeAngle - 2 * a1) / 4));
            hole.appendVertex(RVector.createPolar(r1, spokeAngle - a1));

            //if (r0 < r1)
            {
                for (var n = 0; n < CrankWheel.numberOfSpokes; n++) {
                    addOperation.addObject(new RPolylineEntity(document, new RPolylineData(hole)));
                    hole.rotate(spokeAngle, center);

                }
            }
        }
    }

    // Draw the info block, offset to right of wheel

    if (CrankWheel.showLegend) {
        var wheelLegend = CrankWheel.getLegendStr();
        textPos = new RVector([wheelRadius + wheelRadius * 0.1, wheelRadius]);

        var text = new RTextEntity(
            document,
            new RTextData(
                textPos,            // position
                textPos,            // alignment point
                0.15,               // height
                1.0,                // text width (ignored for now)
                RS.VAlignTop,       // alignments
                RS.HAlignLeft,
                RS.LeftToRight,
                RS.Exact,
                1.0,                // line spacing factor
                wheelLegend,        // the text
                "Courier",          // font fixed spacing is nicer here
                false,              // bold
                false,              // italic
                0.0,                // angle
                false               // simple text without formatting
            )
        );
        addOperation.addObject(text);
    }

    // draw anything needed in debug mode

    if (CrankWheel.showDebug) {
        // Wheels outer diameter
        var wheelCircleData = new RCircleData(center, wheelRadius);
        addOperation.addObject(new RCircleEntity(document, wheelCircleData));

        // tooth inner root circle
        var wheelPitchData = new RCircleData(center, pitchCircleRadius);
        addOperation.addObject(new RCircleEntity(document, wheelPitchData));

        // if we are drawing bolt holes draw that circle
        if (CrankWheel.boltHoleCount) {
            var boltPitchData = new RCircleData(center, CrankWheel.boltHoleCircleDiameter / 2.0);
            addOperation.addObject(new RCircleEntity(document, boltPitchData));
        }

        // same for second set of bolt holes
        if (CrankWheel.boltHoleCount2) {
            var boltPitchData2 = new RCircleData(center, CrankWheel.boltHoleCircleDiameter2 / 2.0);
            addOperation.addObject(new RCircleEntity(document, boltPitchData2));
        }

        // now spoke boundaries (inner and outer) if being drawn

        // draw inner circle for the spokes
        if (CrankWheel.numberOfSpokes) {
            var spokeInnerData = new RCircleData(center, r0);
            addOperation.addObject(new RCircleEntity(document, spokeInnerData));
        }

        // same for the outers
        if (CrankWheel.numberOfSpokes) {
            var spokeInnerData2 = new RCircleData(center, r1);
            addOperation.addObject(new RCircleEntity(document, spokeInnerData2));
        }
    }

    // Add it all to the drawing
    return addOperation;
}
