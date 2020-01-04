![3 CrankWheels](https://user-images.githubusercontent.com/5179047/71425948-be9a1280-2657-11ea-8199-361e842c1843.gif)

# CrankWheel
QCAD Plugin for generation of crankshaft timing wheel. The plugin accepts many parameters to configure a wheel for computer control of your engine. The wheel generated is used for engine position indication to the engine management system. Many different configurations,
and sizes are used. This will help generate them and then finally modify in QCAD.

The wheel generator can generate a variety of styles of wheels, but the outcome of all generation can be modified to suit your needs. The basic wheel can be configured with 2 types of teeth, one where the root is an arc and one with a nicely shaped 'cup'. In addition options to configure the number of spokes and the inner and outer diameters of the voids to allow positioning as needed. The final bit is bolt hole patterns. These can be placed rotated at any angle to help with setting up your wheel.

## Installation
Installation - Find your QCAD install directory, look for 'libraries/default' create and copy the files to this folder.  If you need to create a new folder, it is typically called `CrankWheel`. Copy the files in the Github repository (can extract as a zip)
and restart QCAD it should now show up in your library browser.

You can also save the files into any directory and ADD that in your QCAD preferences. Look for that under-

> `Edit->Application Preferences->Library Browser`

and add the directory where you stashed the CrankWheel files to the list.

## Operation
Start QCAD and use the library browser to find the CrankWheel directory. Click into that folder (depending on how you saved the files) on the CrankWheel icon. That should bring up a new panel
with a bunch of parameters. If you are new to QCAD the way it works is as soon as you drag your mouse into the drawing area you will see the rendered wheel. You can just move the cursor back to the parameter panel and change things like Tooth Count, add bolt holes and just move your mouse back into the drawing area to see changes. ONCE you are satisfied, just click the mouse into the drawing area to make it stick.

### Error Conditions
If you enter invalid values you may get to see some odd drawings. Check your data if you you see things that don't look right. Also some configurations will never draw correctly, an example will be a low tooth count wheel when drawn with rounded roots options set.

*Note : To be clear once the wheel is drawn, you can't change parameters, so if you don't like what you just created, delete it and start over.*

### Tips
- You can modify the drawing as needed. You may want to select the parts of the wheel you might be working on first and use the Explode Block command (XP). This will allow you to work in any individual segment or part of the wheel.

- Another good command is the Round (RN) command. This can be used with a small radius on edges like the spokes or missing teeth end points to give a pleasing look.

- If you like old school ROUND looking spokes. Set the spoke count to 0 and use the second set up bolts holes for that purpose.

- You can't rotate the tooth pattern, but everything else can be. Make sure you can align your wheel based on the bolt hole locations. In many cases you can have multiple patterns at different angles or if you have a 3 bolt balancer you can set the hole count to 9 or 12 and have a lot of flexibility for positioning the wheel against your pickup.

- The balancing hole will be generated automatically based on the diameter you set. It is not smart enough to know that it may overlap with a spoke hole. So you may have to play around a bit with spoke rotation, and thickness to get things just right.

- Tooth width will depend on your sensor (Hall or VR) look at the data sheet for it and look for tooth specifications.

- If you change some parameters to cause an error condition, generally the wheel will not be displayed as you drag the mouse into the drawing area. If you see this you may have an invalid setting.

## Wheel Parameters
All default measurements are in inches, and degrees. If you are running QCAD in metric just change the values in the parameter dialog to be what you need. For bolt holes their are 2 sets, but are the same settings for either. Most all dimensions are in reference to a diameter. Generally parameters set to 0 will disable it's functionality.

- Wheel Diameter - Specifies the OUTER diameter of the wheel
- Center Hole Diameter - Center hole of the wheel, set to 0 if no hole desired
- Number Of Teeth - Count of teeth INCLUDING the missing teeth
- Missing Teeth - Number of teeth that should be removed
- Tooth Height - Height of the tooth inwards from the diameter
- Tooth Ratio - Ratio of tooth width to space width. 0.5 would be a 50/50 spaced wheel
- Draw Rounded Roots - Draws the roots of the teeth rounded instead of square
- Bolt Hole Count - Number of holes in the bolt circle
- Bolt Hole Circle Diameter - Diameter of the bolt circle
- Bolt HoleDiameter - Diameter of the bolt holes in the circle
- Bolt PatternRotate - Rotate the bolt hole patter some degrees, default is 0
- Number Of Spokes - Number of spokes. Spoke ratio may have to go down as Number of Spokes increases. These settings are more aesthetic at this point and take some playing to get the desired affect.
- Spoke Ratio - Ratio of spoke to opening, play with this, go lower for larger counts of spokes
- Spoke Inner Diameter - Sets the inner diameter of the spoke holes, should be less then the Outer Diameter
- Spoke Outer Diameter - Sets the outer diameter of the spoke holes
- Spoke Rotation - Rotates the spoke pattern some degrees, default is 0
- Balance Hole Position Diameter - The position of the balance weight hole. This will be computed based on number of teeth. This will be positioned across from the center line of the missing teeth. Setting to 0 removes it. It is not drawn for wheels without missing teeth (Think about it). Moving this to a different position will make it useless (think about it too)
- Show Legend - Shows a text legend on the drawing with all the parameters (can cause drawing to slow on some machines)
- Debug - Draws any debug lines, typically circles to show layout

## Todo
- Add Round operation on spoke holes, easily done manually, but would be nice to do in the script
- Add Round operation on missing tooth wheels for the missing tooth ending section
- Better error handling with warning
- Tool tips and Status Tips.

Some of the above can be easily done in QCAD with a small amount of manual work (see TIPS above).

Make fork, make changes and open a Pull Request and I'll integrate any changes.

You can find QCAD at www.qcad.org this is a GREAT 2D CAD package that is open sourced.
Special thanks to Iain Hibbert for his work on the Gear generator for QCAD where this
work was started from.

## License, Warranty
MIT Code is COPYRIGHT (C) 2019-2020 Sandy Ganz, NO WARRANTY IS IMPLIED, USE AT YOUR OWN RISK

If you make some wheels share the CAD for your particular engine, I can host the designs or the parameters
giving back to the system so others can gain some knowledge from your trials is a nice thing, especially after you got this great free software!
