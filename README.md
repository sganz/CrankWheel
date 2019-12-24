![CrankWheel](https://user-images.githubusercontent.com/5179047/71371057-bad99380-2564-11ea-96f3-5c26d3d6fc4e.gif)

# CrankWheel
QCAD Plugin for generation of crankshaft timing wheel. The plugin accepts many parameters to configure a wheel for computer control of your engine. The wheel generated is used for engine position indication to the engine management system. Many different configurations,
and sizes are used. This will help generate them and then finally modify in QCAD.

## Installation
Installation - Find your QCAD install directory, look for 'libraries/default' copy
the folder that is typically called `CrankWheel` in the Github repository (can extract as a zip)
and restart QCAD it should now show up in your library browser.

You can also save the files into any directory and ADD that in your QCAD preferences. Look for that under-

> `Edit->Application Preferences->Library Browser`

and add the directory where you stashed the CrankWheel files to the list.

## Operation
Start QCAD and use the library browser to find the CrankWheel directory. Click into that folder (depending on how you saved the files) on the CrankWheel icon. That should bring up a new panel
with a bunch of parameters. If you are new to QCAD the way it works is as soon as you drag your mouse into the drawing area you will see the rendered wheel. You can just move the cursor back to the parameter panel and change things like Tooth Count, add bolt holes and just move your mouse back into the drawing area to see changes. ONCE you are satisfied, just click the mouse into the drawing area to make it stick.

*Note : To be clear once the wheel is drawn, you can't change parameters, so if you don't like what you just created, delete it and start over.*

At this point you can modify the drawing as needed. You may want to select the parts of the wheel you might be working on first and use the Explode Block command (XP). This will allow you to work in any individual segment or part of the wheel.

If you change some parameters to cause an error condition, generally the wheel will not be displayed as you drag the mouse into the drawing area. If you see this you may have an invalid setting.

### Configurable Items
All default measurements are in inches, and degrees. If you are running
QCAD in metric just change the values in the parameter dialog to be what you need. For
bolt holes their are 2 sets, but are the same settings for either.

- Wheel Diameter - Specifies the OUTER diameter of the wheel
- Center Hole Diameter - Center hole of the wheel, set to 0 if no hole desired
- Number Of Teeth - Count of teeth INCLUDING the missing teeth
- Missing Teeth - Number of teeth that should be removed
- Tooth Height - Height of the tooth inwards from the diameter.
- Bolt Hole Count - Number of holes in the bolt circle
- Bolt Hole Circle Diameter - Diameter of the bolt circle
- Bolt HoleDiameter - Diameter of the bolt holes in the circle
- Bolt PatternRotate - Rotate the bolt hole patter some degrees, default is 0
- Number Of Spokes - Number of spokes. Spoke ratio may have to go down as Number of Spokes increases. These settings are more aesthetic at this point and take some playing to get the desired affect.
- Spoke Ratio - Ratio of spoke to opening, play with this, go lower for larger counts of spokes
- Spoke Outer Diameter - Sets the outer diameter of the spoke holes
- Spoke Inner Diameter - Sets the inner diameter of the spoke holes, should be less then the Outer Diameter
- Show Legend - Shows a text legend on the drawing with all the parameters
- Debug - Draws any debug lines, typically circles to show layout

- Tooth Width - NOT CURRENTLY SUPPORTED

## Todo
- Possible fillets and arcs for bottom of teeth.
- Better control of tooth width, they are currently proportioned at
50-50 duty cycle which for low tooth count larger wheels might not be what's desired.
- Compute area of a tooth and use that with some fancy math to generate a balance hole at some radius

Some of the above can be easily done in QCAD with a small amount of manual work.

Make fork, make changes and open a Pull Request and I'll integrate any changes.

You can find QCAD at www.qcad.org this is a GREAT 2D CAD package that is open sourced.
Special thanks to Iain Hibbert for his work on the Gear generator for QCAD where this
work was started from.

## License
MIT